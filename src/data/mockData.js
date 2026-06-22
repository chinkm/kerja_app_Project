const MOCK_CONTRACTORS = [
  {
    id: 1,
    name: "Ali Baba",
    specialty: "pipeline",
    rating: 4.9,
    reviews: 142,
    phone: "+(601) 130-1234",
    eta: "25 mins",
    certification: "Licensed Master Plumber"
  },
  {
    id: 2,
    name: "VoltMaster Electrical Services",
    specialty: "electrical",
    rating: 4.8,
    reviews: 98,
    phone: "+(601) 130-5432",
    eta: "35 mins",
    certification: "Certified Industrial Electrician"
  },
  {
    id: 3,
    name: "Nasir Pipelines & Services",
    specialty: "pipeline",
    rating: 4.7,
    reviews: 210,
    phone: "+(601) 140-6789",
    eta: "15 mins",
    certification: "Licensed Master Plumber"
  },
  {
    id: 4,
    name: "Titan Structural & Masonry",
    specialty: "structural",
    rating: 4.6,
    reviews: 64,
    phone: "+(601) 130-2345",
    eta: "45 mins",
    certification: "Licensed General Contractor"
  },
  {
    id: 5,
    name: "GreenThumb Landscape & Gardening",
    specialty: "gardening",
    rating: 4.9,
    reviews: 185,
    phone: "+(601) 012-1098",
    eta: "40 mins",
    certification: "Certified Master Gardener"
  },
  {
    id: 6,
    name: "ProPrecision Painters",
    specialty: "painter",
    rating: 4.7,
    reviews: 112,
    phone: "+(601) 012-4321",
    eta: "50 mins",
    certification: "CIDB Certified"
  },
  {
    id: 7,
    name: "EcoShield Pest Management",
    specialty: "pest_control",
    rating: 4.8,
    reviews: 230,
    phone: "+(601) 012-1234",
    eta: "20 mins",
    certification: "Licensed Structural Pest Control"
  },
  {
    id: 8,
    name: "Samad Bin Ali",
    specialty: "roofing",
    rating: 4.5,
    reviews: 79,
    phone: "+(601) 013-8901",
    eta: "60 mins",
    certification: "TVET Licence"
  },
  {
    id: 9,
    name: "Evergreen Lawn Care Specialists",
    specialty: "gardening",
    rating: 4.6,
    reviews: 94,
    phone: "+(601) 013-9012",
    eta: "30 mins",
    certification: "Horticultural Science Certified"
  },
  {
    id: 10,
    name: "Elite Brushstroke & Coating",
    specialty: "painter",
    rating: 4.9,
    reviews: 156,
    phone: "+(601) 012-0123",
    eta: "45 mins",
    certification: "Lead-Safe Certified Firm"
  },
  {
    id: 11,
    name: "Ishak Bin Ahmad",
    specialty: "pipeline",
    rating: 4.8,
    reviews: 120,
    phone: "+(601) 013-3456",
    eta: "18 mins",
    certification: "Commercial Plumbing License"
  },
  {
    id: 12,
    name: "Sudirman Bin Salamuddin",
    specialty: "electrical",
    rating: 4.7,
    reviews: 141,
    phone: "(601) 012-4567",
    eta: "28 mins",
    certification: "TVET License"
  },
  {
    id: 13,
    name: "Alimuddin Bin Sultan",
    specialty: "structural",
    rating: 4.4,
    reviews: 53,
    phone: "(601) 012-3456",
    eta: "55 mins",
    certification: "TVET License"
  },
  {
    id: 14,
    name: "Overhead Rescue Roofers",
    specialty: "roofing",
    rating: 4.8,
    reviews: 115,
    phone: "+(601) 012-4560",
    eta: "35 mins",
    certification: "Pukonsa License"
  },
  {
    id: 15,
    name: "LockSure Locksmith Services",
    specialty: "locksmith",
    rating: 4.8,
    reviews: 134,
    phone: "+(601) 014-5678",
    eta: "25 mins",
    certification: "Certified Locksmith Technician"
  },
  {
    id: 16,
    name: "TechFix Computer Repair",
    specialty: "computer_repair",
    rating: 4.7,
    reviews: 89,
    phone: "+(601) 015-6789",
    eta: "40 mins",
    certification: "CompTIA A+ Certified"
  },
  {
    id: 17,
    name: "Crystal Aluminium & Glass Works",
    specialty: "aluminium_glass",
    rating: 4.9,
    reviews: 156,
    phone: "+(601) 016-7890",
    eta: "50 mins",
    certification: "CIDB Certified Fabricator"
  },
  {
    id: 18,
    name: "BrightMind Tuition Specialists",
    specialty: "tuition",
    rating: 4.8,
    reviews: 203,
    phone: "+(601) 017-8901",
    eta: "15 mins",
    certification: "MOE Approved Tutor"
  },
  {
    id: 19,
    name: "CoolBreeze Aircon Services",
    specialty: "air_conditioning",
    rating: 4.7,
    reviews: 178,
    phone: "+(601) 018-9012",
    eta: "30 mins",
    certification: "HVAC Licensed Technician"
  },
  {
    id: 20,
    name: "SafeHome Security Systems",
    specialty: "security",
    rating: 4.6,
    reviews: 92,
    phone: "+(601) 019-0123",
    eta: "35 mins",
    certification: "Certified Security Installer"
  },
  {
    id: 21,
    name: "Golden Flame Welding & Metalworks",
    specialty: "welding",
    rating: 4.8,
    reviews: 115,
    phone: "+(601) 020-1234",
    eta: "45 mins",
    certification: "AWS Certified Welder"
  },
  {
    id: 22,
    name: "SwiftFix Appliance Repair",
    specialty: "appliance_repair",
    rating: 4.7,
    reviews: 102,
    phone: "+(601) 021-2345",
    eta: "28 mins",
    certification: "Certified Appliance Technician"
  },
  {
    id: 23,
    name: "Urban Decor Interior Design",
    specialty: "interior_design",
    rating: 4.9,
    reviews: 147,
    phone: "+(601) 022-3456",
    eta: "55 mins",
    certification: "CIDB Certified Designer"
  },
  {
    id: 24,
    name: "SparkleClean Housekeeping",
    specialty: "cleaning",
    rating: 4.6,
    reviews: 210,
    phone: "+(601) 023-4567",
    eta: "20 mins",
    certification: "Certified Professional Cleaner"
  },
  {
    id: 25,
    name: "Rapid Response Handyman",
    specialty: "handyman",
    rating: 4.8,
    reviews: 132,
    phone: "+(601) 024-5678",
    eta: "18 mins",
    certification: "General Maintenance License"
  },
  {
    id: 26,
    name: "AquaPure Water Filter Services",
    specialty: "water_filter",
    rating: 4.7,
    reviews: 98,
    phone: "+(601) 025-6789",
    eta: "40 mins",
    certification: "Certified Water Technician"
  },
  {
    id: 27,
    name: "SolarBright Energy Solutions",
    specialty: "solar",
    rating: 4.9,
    reviews: 165,
    phone: "+(601) 026-7890",
    eta: "60 mins",
    certification: "SEDA Certified Installer"
  },
  {
    id: 28,
    name: "PetCare Grooming & Boarding",
    specialty: "pet_care",
    rating: 4.8,
    reviews: 142,
    phone: "+(601) 027-8901",
    eta: "25 mins",
    certification: "Certified Pet Groomer"
  },
  {
    id: 29,
    name: "Chef’s Choice Catering",
    specialty: "catering",
    rating: 4.7,
    reviews: 120,
    phone: "+(601) 028-9012",
    eta: "50 mins",
    certification: "Licensed Food Handler"
  },
  {
    id: 30,
    name: "DriveSafe Auto Mechanics",
    specialty: "auto_repair",
    rating: 4.6,
    reviews: 110,
    phone: "+(601) 029-0123",
    eta: "35 mins",
    certification: "ASE Certified Mechanic"
  },
  {
    id: 31,
    name: "SmartHome Automation Experts",
    specialty: "automation",
    rating: 4.8,
    reviews: 95,
    phone: "+(601) 030-1234",
    eta: "45 mins",
    certification: "Certified IoT Installer"
  },
  {
    id: 32,
    name: "PureTone Audio & Visual",
    specialty: "av_installation",
    rating: 4.7,
    reviews: 87,
    phone: "+(601) 031-2345",
    eta: "50 mins",
    certification: "Certified AV Specialist"
  },
  {
    id: 33,
    name: "GreenCycle Waste Management",
    specialty: "waste_management",
    rating: 4.6,
    reviews: 76,
    phone: "+(601) 032-3456",
    eta: "40 mins",
    certification: "Environmental Services License"
  },
  {
    id: 34,
    name: "BrightFuture Childcare & Learning",
    specialty: "childcare",
    rating: 4.9,
    reviews: 188,
    phone: "+(601) 033-4567",
    eta: "15 mins",
    certification: "MOE Approved Childcare Provider"
  },
  {
    id: 35,
    name: "Elite Fitness Trainers",
    specialty: "fitness",
    rating: 4.8,
    reviews: 140,
    phone: "+(601) 034-5678",
    eta: "20 mins",
    certification: "Certified Personal Trainer"
  },
  {
    id: 36,
    name: "Harmony Music Tutors",
    specialty: "music_tuition",
    rating: 4.7,
    reviews: 112,
    phone: "+(601) 035-6789",
    eta: "25 mins",
    certification: "ABRSM Certified Instructor"
  },
  {
    id: 37,
    name: "QuickPrint & Copy Center",
    specialty: "printing",
    rating: 4.6,
    reviews: 99,
    phone: "+(601) 036-7890",
    eta: "30 mins",
    certification: "Certified Print Technician"
  },
  {
    id: 38,
    name: "FreshFlow Plumbing & Heating",
    specialty: "pipeline",
    rating: 4.8,
    reviews: 145,
    phone: "+(601) 037-8901",
    eta: "22 mins",
    certification: "Licensed Master Plumber"
  },
  {
    id: 39,
    name: "BrightSpark Electrical Solutions",
    specialty: "electrical",
    rating: 4.7,
    reviews: 130,
    phone: "+(601) 038-9012",
    eta: "28 mins",
    certification: "Certified Industrial Electrician"
  },
  {
    id: 40,
    name: "Skyline Roofing Experts",
    specialty: "roofing",
    rating: 4.6,
    reviews: 84,
    phone: "+(601) 039-0123",
    eta: "55 mins",
    certification: "TVET License"
  },
  {
    id: 41,
    name: "EcoFresh Pest Solutions",
    specialty: "pest_control",
    rating: 4.8,
    reviews: 175,
    phone: "+(601) 040-1234",
    eta: "25 mins",
    certification: "Licensed Pest Control Operator"
  },
  {
    id: 42,
    name: "MasterCraft Carpentry",
    specialty: "carpentry",
    rating: 4.7,
    reviews: 122,
    phone: "+(601) 041-2345",
    eta: "45 mins",
    certification: "CIDB Certified Carpenter"
  },
  
];

export default MOCK_CONTRACTORS;