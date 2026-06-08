import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import glpk from 'glpk.js';

//Initialize the official Google GenAI SDK
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY });


export function useJobAllocation(initialWorkers, initialJobs) {
  const [workers, setWorkers] = useState(initialWorkers);
  const [jobs, setJobs] = useState(initialJobs);
  const [allocations, setAllocations] = useState([]);
  const [isAllocating, setIsAllocating] = useState(false);
  const [allocationMode, setAllocationMode] = useState('LP'); // 'LP' or 'GenAI'

  //======================================================================
  // APPROACH 1: Linear Programming using glpk.js
  //======================================================================
  const allocateWithLinearProgramming = async () => {
    setIsAllocating(true);
    try {
      // Dynamic import to prevent bundler reference errors
      const glpkModule = await import('glpk.js');
      const glpkInstance = typeof glpkModule.default === 'function'
        ? await glpkModule.default()
        : await glpkModule();

      //Setup structural LP variables
      // x_{w}_{j} = 1 if worker w gets job, 0 otherwise
      const vars = {};
      const constraints = [];
      const objective = {};
      const binaryVariablesList = [];  // Track binary variable names separately

      //1. Filter jobs by skill/experience compatibility & populate variables
      workers.forEach(worker => {
        jobs.forEach(job => {
          const hasSkills = job.requiredSkills.every(skill => worker.skills.includes(skill));
          const hasExperience = worker.experienceLevel >= job.requiredExperienceLevel;

          if (hasSkills && hasExperience) {
            const varName = `x_W${worker.id}_J${job.id}`;
            // Register name in our problem list
            vars[varName] = 1;
            binaryVariablesList.push(varName); // Mark this variable as a binary target

            //Objective: maximize satisfaction of hitting financial/hour targets
            const jobValue = job.payRate * job.estimatedHours; // Example value function
            objective[varName] = jobValue;
          }
        });
      });

      //2. Constraints: Every job can be assigned to AT Most one worker
      jobs.forEach(job => {
        const jobVars = Object.keys(vars).filter(v => v.endsWith(`_JOB-${job.id}`));
        if (jobVars.length > 0) {
          constraints.push({
            name: `job_limit_${job.id}`,
            vars: jobVars.map(v => ({ name: v, coef: 1.0 })),
            bnds: { type: glpkInstance.GLP_UP, ub: 1.0, lb: 0.0 }
          });
        }
      });

      //3. Constraints: Workers should not exceed their target hours/income
      workers.forEach(worker => {
        const workerVars = binaryVariablesList.filter(v => v.startsWith(`x_W${worker.id}_`));
        if (workerVars.length > 0) {
          if (worker.targetIncome) {
            constraints.push({
              name: `income_limit_${worker.id}`,
              vars: workerVars.map(v => {
                const jobId = v.split('_J')[1]; // Cleanly extract raw matching ID
                const job = jobs.find(j => j.id === jobId);
                return { name: v, coef: job ? (job.payRate * job.estimatedHours) : 0 };
              }),
              bnds: { type: glpkInstance.GLP_UP, ub: worker.targetIncome * 1.5, lb: 0.0 }
            });
          } else if (worker.targetHours) {
            constraints.push({
              name: `hours_target_${worker.id}`,
              vars: workerVars.map(v => {
                const jobId = v.split('_J')[1];
                const job = jobs.find(j => j.id === jobId);
                return { name: v, coef: job ? job.estimatedHours : 0 };
              }),
              bnds: { type: glpkInstance.GLP_UP, ub: worker.targetHours * 1.5, lb: 0.0 }
            });
          }
        }
      });

      // Compile and solve the Linear Programming system
      const lpProblem = {
        name: 'JobAllocation',
        objective: {
          direction: glpkInstance.GLP_MAX,
          vars: Object.keys(objective).map(v => ({ name: v, coef: objective[v] }))
        },
        subjectTo: constraints,
        binaries: binaryVariablesList
      };

      const solution = glpkInstance.solve(lpProblem);

      if (!solution || (!solution.result && !solution.vars)) {
        console.warn("GLPK Solver could not find an optimized solution with current targets.");
        alert("Allocation failed to find a valid match. Try loosening contractor target restrictions!");
        setIsAllocating(false);
        return;
      }

      // Capture outputs regardless of engine version variations safely
      const finalVars = solution.result?.vars || solution.vars || {};

      // Map LP solution matrix back to our React state structural format
      const finalAllocations = workers.map(worker => {
        const assignedJobs = [];
        let totalIncome = 0;
        let totalHours = 0;

        jobs.forEach(job => {
          const varName = `x_W${worker.id}_J${job.id}`;
          
          if (finalVars && finalVars[varName] === 1) {
            assignedJobs.push(job);
            totalIncome += job.payRate * job.estimatedHours;
            totalHours += job.estimatedHours;
          }
        });


        return {
          id: `alloc_${worker.id}`,
          workerId: worker.id,
          assignedJobs,
          yieldedIncome: totalIncome, // Synchronized with layout expectation fields
          totalHours
        };
      });

      
      setAllocations(finalAllocations);
    } catch (error) {
      console.error('Error during LP allocation:', error);
    } finally {
      setIsAllocating(false);
    }
  };

  //======================================================================
  // APPROACH 2: Generative AI using Google GenAI SDK
  //======================================================================

  const allocateWithGenAI = async () => {
    setIsAllocating(true);
    try {
      //Define the target execution schema structure required by Gemini for structured output
      const allocationDeclaration = {
        name: 'saveJobAllocations',
        description: 'Saves the optimized worker allocation mapping choices to state data blocks.',
        parameters: {
          type: 'object',
          properties: {
            assignments: {
              type: 'array',
              description: 'Array containing specific worker assignment mappings',
              items: {
                type: 'object',
                properties: {
                  workerId: { type: 'string', description: 'Unique identifier for the worker' },
                  assignedJobsIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of job IDs assigned to this worker'
                  }
                },
                required: ['workerId', 'assignedJobsIds']
              }
            }
          },
          required: ['assignments']
        }
      };

      //Craft a prompt that includes the worker/job data and asks Gemini to optimize the allocation based on constraints
      const prompt = `
       You are an expert operations manager. Allocate our open job inventory pool to matching contractors.
        
        CRITICAL RULES:
        1. Ensure the contractor satisfies 'requiredSkills' and 'requiredExperienceLevel' before mapping.
        2. Attempt to fill the contractor's targets ('targetIncome' or 'targetHours') as closely as possible without significantly overshooting.
        3. A single job can only be completed by a maximum of 1 worker. Do not double-assign jobs.
        
        Workers Data: ${JSON.stringify(workers)}
        Available Jobs Data: ${JSON.stringify(jobs)}
        
        Call the 'saveJobAllocations' tool to return the optimized mapping distribution.
      `;

      //Request configuration utilizing Gemini 2.5 flash for functional parsing 
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ functionDeclaration: [allocationDeclaration] }],
          toolConfig: { functionCallingConfig: { mode: 'ANY' } }, //Coerces a structured call to our declared function for easier parsing
        }
      });

      // Extract structural tools payload parameters safety
      const functionCall = response.functionCalls?.[0];

      if (functionCall && functionCall.name === 'saveJobAllocations') {
        const { assignments } = functionCall.args;

        // Translate the structured AI data response into our app's runtime layout format
        const finalAllocations = workers.map(worker => {
          const assignmentMatch = assignments.find(a => a.workerId === worker.id);
          const assignedJobs = assignmentMatch ? jobs.filter(job => assignmentMatch.assignedJobsIds.includes(job.id)) : [];
          const totalIncome = assignedJobs.reduce((sum, job) => sum + job.payRate * job.estimatedHours, 0);
          const totalHours = assignedJobs.reduce((sum, job) => sum + job.estimatedHours, 0);

          return { workerId: worker.id, assignedJobs, totalIncome, totalHours };
        });
        setAllocations(finalAllocations);
      }
    } catch (error) {
      console.error('Error during GenAI allocation:', error);
    } finally {
      setIsAllocating(false);
    }
  };

  // Switch router executing the selected strategy pattern
  const executeAllocation = () => {
    if (allocationMode === 'LP') {
      allocateWithLinearProgramming();
    } else {
      allocateWithGenAI();
    }
  };

  return {
    workers,
    jobs,
    allocations,
    isAllocating,
    allocationMode,
    setAllocationMode,
    executeAllocation,
    allocateWithLinearProgramming,
    allocateWithGenAI
  };
}









