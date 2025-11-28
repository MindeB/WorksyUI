export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  group: 'home' | 'exterior' | 'garden' | 'design' | 'events' | 'other';
}

export const categories: Category[] = [
  // Home Services
  { id: "appliance-repair", name: "Appliance Repair", icon: "🔧", description: "Fix your home appliances", group: "home" },
  { id: "carpet-cleaning", name: "Carpet Cleaning", icon: "🧹", description: "Professional carpet cleaning", group: "home" },
  { id: "contractors", name: "Contractors", icon: "👷", description: "General contractors", group: "home" },
  { id: "drywall", name: "Drywall", icon: "🏗️", description: "Drywall installation & repair", group: "home" },
  { id: "electrical", name: "Electrical", icon: "⚡", description: "Licensed electricians", group: "home" },
  { id: "flooring", name: "Flooring", icon: "🪵", description: "Flooring installation & repair", group: "home" },
  { id: "hvac", name: "HVAC", icon: "❄️", description: "Heating & cooling services", group: "home" },
  { id: "house-cleaning", name: "House Cleaning", icon: "🧼", description: "Professional cleaning services", group: "home" },
  { id: "interior-painting", name: "Interior Painting", icon: "🎨", description: "Interior painting services", group: "home" },
  { id: "plumbing", name: "Plumbing", icon: "🚰", description: "Professional plumbers", group: "home" },
  { id: "remodeling", name: "Remodeling", icon: "🏠", description: "Home remodeling services", group: "home" },

  // Exterior & Construction
  { id: "concrete-repair", name: "Concrete Repair", icon: "🧱", description: "Concrete repair & installation", group: "exterior" },
  { id: "doors", name: "Doors", icon: "🚪", description: "Door installation & repair", group: "exterior" },
  { id: "driveways", name: "Driveways", icon: "🛣️", description: "Driveway services", group: "exterior" },
  { id: "exterior-painting", name: "Exterior Painting", icon: "🖌️", description: "Exterior painting services", group: "exterior" },
  { id: "garage-doors", name: "Garage Doors", icon: "🚗", description: "Garage door services", group: "exterior" },
  { id: "gutter-cleaning", name: "Gutter Cleaning", icon: "💧", description: "Gutter cleaning services", group: "exterior" },
  { id: "gutter-repair", name: "Gutter Repair", icon: "🔨", description: "Gutter repair & installation", group: "exterior" },
  { id: "home-builders", name: "Home Builders", icon: "🏗️", description: "Custom home builders", group: "exterior" },
  { id: "masonry", name: "Masonry", icon: "🧱", description: "Masonry services", group: "exterior" },
  { id: "roofing", name: "Roofing", icon: "🏘️", description: "Roofing services", group: "exterior" },
  { id: "siding", name: "Siding", icon: "🏚️", description: "Siding installation & repair", group: "exterior" },
  { id: "windows", name: "Windows", icon: "🪟", description: "Window installation & repair", group: "exterior" },

  // Garden & Outdoor
  { id: "decks", name: "Decks", icon: "🌳", description: "Deck building & repair", group: "garden" },
  { id: "fencing", name: "Fencing", icon: "🚧", description: "Fence installation & repair", group: "garden" },
  { id: "land-surveying", name: "Land Surveying", icon: "📐", description: "Professional land surveying", group: "garden" },
  { id: "landscaping", name: "Landscaping", icon: "🌿", description: "Landscaping services", group: "garden" },
  { id: "lawn-yard-work", name: "Lawn & Yard Work", icon: "🌱", description: "Lawn care services", group: "garden" },
  { id: "leaf-removal", name: "Leaf Removal", icon: "🍂", description: "Leaf removal services", group: "garden" },
  { id: "patios", name: "Patios", icon: "🪴", description: "Patio installation", group: "garden" },
  { id: "pool-installation", name: "Pool Installation", icon: "🏊", description: "Pool installation services", group: "garden" },
  { id: "sprinkler-systems", name: "Sprinkler Systems", icon: "💦", description: "Sprinkler system installation", group: "garden" },
  { id: "sunrooms", name: "Sunrooms", icon: "☀️", description: "Sunroom construction", group: "garden" },
  { id: "tree-service", name: "Tree Service", icon: "🌲", description: "Tree removal & trimming", group: "garden" },

  // Design & Furniture
  { id: "interior-design", name: "Interior Design", icon: "🎨", description: "Professional interior design services", group: "design" },
  { id: "furniture-makers", name: "Furniture Makers", icon: "🪑", description: "Custom furniture manufacturing", group: "design" },
  { id: "custom-cabinetry", name: "Custom Cabinetry", icon: "🗄️", description: "Bespoke cabinet design and installation", group: "design" },
  { id: "upholstery", name: "Upholstery", icon: "🛋️", description: "Furniture upholstery services", group: "design" },
  { id: "window-treatments", name: "Window Treatments", icon: "🪟", description: "Curtains, blinds, and window design", group: "design" },

  // Events & Media
  { id: "event-planning", name: "Event Planning", icon: "🎉", description: "Professional event planning", group: "events" },
  { id: "photography", name: "Photography", icon: "📸", description: "Event and portrait photography", group: "events" },
  { id: "videography", name: "Videography", icon: "🎥", description: "Professional video services", group: "events" },
  { id: "catering", name: "Catering", icon: "🍽️", description: "Event catering services", group: "events" },
  { id: "musicians", name: "Musicians", icon: "🎵", description: "Live music for events", group: "events" },

  // Other Services
  { id: "basement-waterproofing", name: "Basement Waterproofing", icon: "🌊", description: "Basement waterproofing", group: "other" },
  { id: "handymen", name: "Handymen", icon: "🛠️", description: "General handyman services", group: "other" },
  { id: "junk-hauling", name: "Junk Hauling", icon: "🚛", description: "Junk removal services", group: "other" },
  { id: "locksmiths", name: "Locksmiths", icon: "🔑", description: "Locksmith services", group: "other" },
  { id: "moving-companies", name: "Moving Companies", icon: "📦", description: "Professional movers", group: "other" },
  { id: "pest-control", name: "Pest Control", icon: "🐛", description: "Pest control services", group: "other" },
  { id: "pressure-washing", name: "Pressure Washing", icon: "💨", description: "Pressure washing services", group: "other" },
  { id: "septic-tanks", name: "Septic Tanks", icon: "🚽", description: "Septic tank services", group: "other" },
];

export const categoryGroups = {
  home: categories.filter(c => c.group === 'home'),
  exterior: categories.filter(c => c.group === 'exterior'),
  garden: categories.filter(c => c.group === 'garden'),
  design: categories.filter(c => c.group === 'design'),
  events: categories.filter(c => c.group === 'events'),
  other: categories.filter(c => c.group === 'other'),
};

export const featuredCategories = categories.slice(0, 8);
