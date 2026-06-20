import React from 'react';
import { useJobAllocation } from '../hooks/useJobAllocation';
import { initialWorkers, initialJobs } from '../data/mockData';

export default function JobAllocationApp() {
  // Pulling destructured properties exactly matching your attached codebase file
  const {
    workers,
    jobs,
    allocations,
    isAllocating,
    allocationMode,
    setAllocationMode,
    allocateWithLinearProgramming,
    allocateWithGenAI
  } = useJobAllocation(initialWorkers, initialJobs);

  // Dynamic dispatch router execution helper
  const executeAllocation = () => {
    if (allocationMode === 'LP') {
      allocateWithLinearProgramming();
    } else {
      allocateWithGenAI();
    }
  };

  return (
    <div className="p-5 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Engine-Backed Job Allocation System</h1>
      
      {/* Control Panel Engine Selection */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="flex items-center">
          <label className="mr-4 font-bold text-gray-700">Select Allocation Engine:</label>
          <select
            value={allocationMode}
            onChange={(e) => setAllocationMode(e.target.value)}
            className="p-2 text-sm rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="LP">Linear Programming Solver Matrix (glpk.js)</option>
            <option value="GenAI">Generative AI Studio Agent (Gemini Function Calling)</option>
          </select>
        </div>

        <button
          onClick={executeAllocation}
          disabled={isAllocating}
          className={`px-4 py-2 text-sm rounded font-medium text-white transition-colors duration-150 ${
            isAllocating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isAllocating ? 'Processing Allocation...' : 'Run Allocation Engine'}
        </button>
      </div>

      {/* Main Grid Splitting Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Workers Pool Matrix */}
        <section className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
             Workers Pool Matrix
          </h2>
          <ul className="space-y-4">
            {workers.map(worker => (
              <li key={worker.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-bold text-gray-900">{worker.name} <span className="text-xs font-normal text-gray-500">(Level {worker.experienceLevel})</span></div>
                <div className="text-sm text-gray-600 my-1">
                  Skills: <span className="font-medium">{worker.skills.join(', ')}</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mt-1">
                  Target: {worker.targetIncome ? `RM ${worker.targetIncome}` : `${worker.targetHours} hours`}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Open Job Inventory */}
        <section className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Open Job Inventory
          </h2>
          <ul className="space-y-4">
            {jobs.map(job => (
              <li key={job.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-bold text-gray-900">{job.title} <span className="text-xs font-normal text-gray-500">(Level {job.requiredExperienceLevel})</span></div>
                <div className="text-sm text-gray-700 mt-1">
                  Rate: <span className="font-bold text-emerald-600">RM {job.payRate}/hr</span> — {job.estimatedHours} hrs
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Required Skills: {job.requiredSkills.join(', ')}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      
      <hr className="my-8 border-gray-200" />

      {/* Calculated Results Block */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Calculated Assignment Matrix Results ({allocationMode})
        </h2>
        
        {allocations.length === 0 ? (
          <p className="italic text-gray-400 py-4 bg-gray-50 text-center rounded-lg border border-dashed">
            No allocations calculated yet. Please run the allocation engine.
          </p>
        ) : (
          <div className="flex flex-wrap gap-5">
            {allocations.map(allocation => {
              const worker = workers.find(w => w.id === allocation.workerId);
              return (
                <div key={allocation.id} className="border border-gray-200 rounded-xl p-4 w-full sm:w-[300px] bg-gray-50 shadow-sm">
                  <h3 className="font-bold text-lg text-gray-900 border-b pb-1.5 mb-2"> {worker?.name}</h3>
                  <p className="text-sm text-gray-700">
                    <strong>Yielded Income:</strong>{' '}
                    <span className="text-emerald-600 font-semibold">
                      RM {allocation.yieldedIncome.toFixed(2)}
                    </span>
                  </p>
                  
                  <h5 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mt-4 mb-2">
                    Assigned Jobs:
                  </h5>
                  <ul className="space-y-1 pl-1">
                    {allocation.assignedJobs.length === 0 ? (
                      <li className="text-xs text-gray-400 italic bg-white p-2 rounded border border-dashed border-gray-200">
                        Zero tasks allocated
                      </li>
                    ) : (
                      allocation.assignedJobs.map((job) => (
                        <li key={job.id} className="text-xs text-blue-700 bg-white border border-blue-100 p-2 rounded font-medium shadow-sm">
                          {job.title}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
