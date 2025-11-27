export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  // Interior Services
  { id: "appliance-repair", name: "Appliance Repair", icon: "🔧", description: "Fix your home appliances" },
  { id: "carpet-cleaning", name: "Carpet Cleaning", icon: "🧹", description: "Professional carpet cleaning" },
  { id: "contractors", name: "Contractors", icon: "👷", description: "General contractors" },
  { id: "drywall", name: "Drywall", icon: "🏗️", description: "Drywall installation & repair" },
  { id: "electrical", name: "Electrical", icon: "⚡", description: "Licensed electricians" },
  { id: "flooring", name: "Flooring", icon: "🪵", description: "Flooring installation & repair" },
  { id: "hvac", name: "HVAC", icon: "❄️", description: "Heating & cooling services" },
  { id: "house-cleaning", name: "House Cleaning", icon: "🧼", description: "Professional cleaning services" },
  { id: "interior-painting", name: "Interior Painting", icon: "🎨", description: "Interior painting services" },
  { id: "plumbing", name: "Plumbing", icon: "🚰", description: "Professional plumbers" },
  { id: "remodeling", name: "Remodeling", icon: "🏠", description: "Home remodeling services" },

  // Exterior Services
  { id: "concrete-repair", name: "Concrete Repair", icon: "🧱", description: "Concrete repair & installation" },
  { id: "doors", name: "Doors", icon: "🚪", description: "Door installation & repair" },
  { id: "driveways", name: "Driveways", icon: "🛣️", description: "Driveway services" },
  { id: "exterior-painting", name: "Exterior Painting", icon: "🖌️", description: "Exterior painting services" },
  { id: "garage-doors", name: "Garage Doors", icon: "🚗", description: "Garage door services" },
  { id: "gutter-cleaning", name: "Gutter Cleaning", icon: "💧", description: "Gutter cleaning services" },
  { id: "gutter-repair", name: "Gutter Repair", icon: "🔨", description: "Gutter repair & installation" },
  { id: "home-builders", name: "Home Builders", icon: "🏗️", description: "Custom home builders" },
  { id: "masonry", name: "Masonry", icon: "🧱", description: "Masonry services" },
  { id: "roofing", name: "Roofing", icon: "🏘️", description: "Roofing services" },
  { id: "siding", name: "Siding", icon: "🏚️", description: "Siding installation & repair" },
  { id: "windows", name: "Windows", icon: "🪟", description: "Window installation & repair" },

  // Lawn & Garden Services
  { id: "decks", name: "Decks", icon: "🌳", description: "Deck building & repair" },
  { id: "fencing", name: "Fencing", icon: "🚧", description: "Fence installation & repair" },
  { id: "land-surveying", name: "Land Surveying", icon: "📐", description: "Professional land surveying" },
  { id: "landscaping", name: "Landscaping", icon: "🌿", description: "Landscaping services" },
  { id: "lawn-yard-work", name: "Lawn & Yard Work", icon: "🌱", description: "Lawn care services" },
  { id: "leaf-removal", name: "Leaf Removal", icon: "🍂", description: "Leaf removal services" },
  { id: "patios", name: "Patios", icon: "🪴", description: "Patio installation" },
  { id: "pool-installation", name: "Pool Installation", icon: "🏊", description: "Pool installation services" },
  { id: "sprinkler-systems", name: "Sprinkler Systems", icon: "💦", description: "Sprinkler system installation" },
  { id: "sunrooms", name: "Sunrooms", icon: "☀️", description: "Sunroom construction" },
  { id: "tree-service", name: "Tree Service", icon: "🌲", description: "Tree removal & trimming" },

  // Additional Services
  { id: "basement-waterproofing", name: "Basement Waterproofing", icon: "🌊", description: "Basement waterproofing" },
  { id: "handymen", name: "Handymen", icon: "🛠️", description: "General handyman services" },
  { id: "junk-hauling", name: "Junk Hauling", icon: "🚛", description: "Junk removal services" },
  { id: "locksmiths", name: "Locksmiths", icon: "🔑", description: "Locksmith services" },
  { id: "moving-companies", name: "Moving Companies", icon: "📦", description: "Professional movers" },
  { id: "pest-control", name: "Pest Control", icon: "🐛", description: "Pest control services" },
  { id: "pressure-washing", name: "Pressure Washing", icon: "💨", description: "Pressure washing services" },
  { id: "septic-tanks", name: "Septic Tanks", icon: "🚽", description: "Septic tank services" },
];

export const featuredCategories = categories.slice(0, 8);
