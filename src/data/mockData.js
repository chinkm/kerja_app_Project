export const initialWorkers = [
  { id: 'w1', name: 'Ali Baba', skills: ['Plumbing', 'Painting'], experienceLevel: 4, targetIncome: 500 }, // Raised to Lvl 4
  { id: 'w2', name: 'Boiboi', skills: ['Painting', 'Air Cond'], experienceLevel: 4, targetHours: 20 },      // Realistic hours (20)
  { id: 'w3', name: 'Charlie', skills: ['Air Cond', 'Electrical'], experienceLevel: 5, targetIncome: 500 }, // Lowered target to match job pool value
  { id: 'w4', name: 'Sudirman', skills: ['Air Cond', 'Electrical'], experienceLevel: 2, targetHours: 15 },    // Realistic hours (15)
  { id: 'w5', name: 'Fatimah', skills: ['Housekeeping', 'Tuition'], experienceLevel: 3, targetIncome: 300 }  // Raised to Lvl 3
];

export const initialJobs = [
  { id: 'j1', title: 'Math Tutor', requiredSkills: ['Tuition'], requiredExperienceLevel: 3, payRate: 25, estimatedHours: 15 }, // Fatimah can now take this
  { id: 'j2', title: 'Refrigerator Repair', requiredSkills: ['Electrical'], requiredExperienceLevel: 2, payRate: 20, estimatedHours: 10 },
  { id: 'j3', title: 'Home Decoration', requiredSkills: ['Painting'], requiredExperienceLevel: 4, payRate: 30, estimatedHours: 12 },
  { id: 'j4', title: 'Pipeline Installation', requiredSkills: ['Plumbing'], requiredExperienceLevel: 4, payRate: 50, estimatedHours: 20 }, // Ali Baba can now take this
  { id: 'j5', title: 'Painting Job', requiredSkills: ['Painting'], requiredExperienceLevel: 2, payRate: 25, estimatedHours: 8 },
  { id: 'j6', title: 'Electrical Appliance Repair', requiredSkills: ['Electrical'], requiredExperienceLevel: 1, payRate: 15, estimatedHours: 10 },
  { id: 'j7', title: 'Pipe Cleaning', requiredSkills: ['Plumbing'], requiredExperienceLevel: 1, payRate: 18, estimatedHours: 5 },
  { id: 'j8', title: 'Air Conditioner Repair', requiredSkills: ['Air Cond'], requiredExperienceLevel: 1, payRate: 18, estimatedHours: 5 }
];

