import {
  Anchor,
  Cable,
  CircleDot,
  Cog,
  Droplets,
  Factory,
  FlaskConical,
  Globe,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Network,
  PackageCheck,
  Phone,
  Pickaxe,
  RadioTower,
  ShieldCheck,
  Sparkles,
  TowerControl,
  Zap,
} from "lucide-react";

export const metrics = [
  { value: "10+", label: "core supply categories" },
  { value: "9", label: "industries served" },
  { value: "Fast", label: "quotation turnaround" },
];

export const categories = [
  {
    title: "Cable Solutions",
    text: "Dependable low, medium, and high voltage cable products for industrial, utility, and commercial use.",
    details: [
      "Low voltage cables",
      "Medium voltage cables",
      "High voltage cables",
      "Power cables",
      "Control cables",
      "Instrumentation cables",
    ],
    icon: Cable,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cable Management",
    text: "Clean routing, protection, and organization systems that improve safety, service access, and installation quality.",
    details: [
      "Cable trays",
      "Cable ladders",
      "Conduits and fittings",
      "Cable glands",
      "Clamps and supports",
      "Routing accessories",
    ],
    icon: CircleDot,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Electrical Bulk Materials",
    text: "Conduit fittings, couplings, clamps, bushings, sealing fittings, and essential installation accessories.",
    details: [
      "Conduit fittings",
      "Connectors",
      "Couplings",
      "Clamps and straps",
      "Reducers and adapters",
      "Bushings and nipples",
    ],
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Earthing and Lightning Protection",
    text: "Grounding and bonding materials designed to protect equipment, personnel, and operating continuity.",
    details: [
      "Grounding busbars",
      "Neutral bars",
      "Compression connectors",
      "Mechanical clamps",
      "Exothermic materials",
      "Lightning protection accessories",
    ],
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Junction Boxes and Enclosures",
    text: "Indoor and outdoor protection systems engineered for harsh operating conditions and reliable containment.",
    details: [
      "Junction boxes",
      "Terminal enclosures",
      "Weather-resistant enclosures",
      "Industrial enclosures",
      "Indoor and outdoor accessories",
    ],
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Switchgear Products",
    text: "Protection and control products that support stable power distribution and safer electrical operations.",
    details: [
      "Miniature circuit breakers",
      "Moulded case circuit breakers",
      "Air circuit breakers",
      "Contactors",
      "Safety switches",
      "Distribution boards",
    ],
    icon: TowerControl,
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Specialized Cable",
    text: "Application-focused cable solutions for utility, telecom, infrastructure, and technically demanding installations.",
    details: [
      "OPGW cable",
      "Telecom cable",
      "Fiber-related cable solutions",
      "Utility cable supply",
      "Infrastructure cable supply",
    ],
    icon: RadioTower,
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cable Sealing Solutions",
    text: "Cable and pipe sealing systems that help guard critical assets against water, dust, gas, and fire risk.",
    details: [
      "Cable transit systems",
      "Pipe sealing systems",
      "Modular sealing blocks",
      "Frames and accessories",
      "Multi-cable entry sealing",
    ],
    icon: Lock,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Lighting Solutions",
    text: "Durable indoor, outdoor, utility, and area lighting solutions chosen for performance and dependable coverage.",
    details: [
      "Industrial lighting",
      "Commercial lighting",
      "Indoor lighting",
      "Outdoor lighting",
      "Area and roadway lighting",
    ],
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Communication Materials",
    text: "Structured network and communication accessories that support connected modern electrical environments.",
    details: [
      "Network accessories",
      "Communication cables",
      "Routers",
      "Switches",
      "Gateways",
      "Structured communication materials",
    ],
    icon: Network,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
];

export const productSpotlights = [
  "Miniature circuit breakers",
  "Moulded case circuit breakers",
  "Air circuit breakers",
  "Industrial plugs and sockets",
  "Cable transit and sealing systems",
  "Grounding busbars and compression connectors",
  "Industrial and outdoor lighting",
  "Network and communication accessories",
];

export const industries = [
  { title: "Oil and Gas", icon: Droplets },
  { title: "Construction", icon: Factory },
  { title: "Telecommunication", icon: Globe },
  { title: "Marine", icon: Anchor },
  { title: "Energy", icon: Zap },
  { title: "Manufacturing", icon: Cog },
  { title: "Mining", icon: Pickaxe },
  { title: "Petrochemical", icon: FlaskConical },
  { title: "Infrastructure and Utilities", icon: TowerControl },
];

export const principles = [
  {
    title: "Reliable product sourcing",
    text: "We help teams secure dependable electrical materials aligned with project requirements, quality targets, and delivery expectations.",
  },
  {
    title: "Industry-focused support",
    text: "Our approach is grounded in industrial and commercial project realities, not generic catalogue selling.",
  },
  {
    title: "Safety and performance first",
    text: "Every category is presented around safe installation, dependable operation, and long service life.",
  },
  {
    title: "Responsive customer service",
    text: "From early enquiry to quotation and supply coordination, the experience is designed to feel clear, direct, and fast.",
  },
];

export const processSteps = [
  {
    title: "Define the requirement",
    text: "Share the application, category, quantities, and delivery targets so we can shape a supply path around your project.",
  },
  {
    title: "Align the right products",
    text: "We help match practical site needs with dependable product options that support safety, fit, and continuity.",
  },
  {
    title: "Move from quote to supply",
    text: "Clear coordination, timely communication, and structured follow-up keep the procurement process efficient.",
  },
];

export const contactItems = [
  {
    label: "Call",
    value: "+966 59 702 0427",
    href: "tel:+966597020427",
    icon: Phone,
  },
  {
    label: "Email",
    value: "info@stratosenergy.sa",
    href: "mailto:info@stratosenergy.sa",
    icon: Mail,
  },
  {
    label: "Sales",
    value: "sales@stratosenergy.sa",
    href: "mailto:sales@stratosenergy.sa",
    icon: Mail,
  },
  {
    label: "Location",
    value: "Al Khobar, Al Aqrabiyah Dist., 34446, Kingdom of Saudi Arabia",
    href: "https://www.google.com/maps/search/Al+Aqrabiyah,+Al+Khobar+34446,+Saudi+Arabia",
    icon: MapPin,
  },
];

export const ribbonItems = [
  {
    title: "Focused portfolio",
    text: "10 product categories shaped around real project demand",
    icon: PackageCheck,
  },
  {
    title: "Built for demanding environments",
    text: "Power, petrochemical, telecom, marine, and infrastructure use cases",
    icon: ShieldCheck,
  },
  {
    title: "Direct support",
    text: "Fast communication for quotations, sourcing, and category guidance",
    icon: Phone,
  },
];
