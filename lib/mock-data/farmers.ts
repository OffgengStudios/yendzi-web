import type { Farmer } from "../types";

export const farmers: Farmer[] = [
  {
    id: "f1",
    name: "Akua Mensah",
    slug: "akua-mensah",
    location: "Aburi, Eastern Region",
    region: "Eastern",
    photo: "https://images.pexels.com/photos/36611201/pexels-photo-36611201.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "Auntie Akua has farmed the red soils of Aburi for over 20 years, growing certified organic vegetables for Accra's finest kitchens. She's reduced spoilage by 40% since joining Yendzi.",
    certifications: ["Organic", "GAP Certified"],
    memberSince: "2024-01",
    productsCount: 12,
  },
  {
    id: "f2",
    name: "Kofi Asante",
    slug: "kofi-asante",
    location: "Suhum, Eastern Region",
    region: "Eastern",
    photo: "https://images.pexels.com/photos/7299671/pexels-photo-7299671.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "Third-generation farmer Kofi grows the sweetest pineapples in Ghana on 15 acres of rich Eastern Region soil. His family farm ships within 6 hours of harvest.",
    certifications: ["Fair Trade", "Organic"],
    memberSince: "2024-03",
    productsCount: 8,
  },
  {
    id: "f3",
    name: "Ama Boateng",
    slug: "ama-boateng",
    location: "Krobo, Eastern Region",
    region: "Eastern",
    photo: "https://images.pexels.com/photos/15050245/pexels-photo-15050245.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "Ama specialises in free-range poultry and fresh eggs, raised without antibiotics on open pasture. Her hens roam freely across 3 acres of lush Krobo farmland.",
    certifications: ["Free Range", "Antibiotic Free"],
    memberSince: "2024-02",
    productsCount: 5,
  },
  {
    id: "f4",
    name: "Kwame Adjei",
    slug: "kwame-adjei",
    location: "Kpong, Volta Region",
    region: "Volta",
    photo: "https://images.pexels.com/photos/15553656/pexels-photo-15553656.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "Kwame's riverside farm in Kpong produces the freshest tilapia and catfish raised in clean, flowing water. From river to your door in under 12 hours.",
    certifications: ["Aquaculture Certified"],
    memberSince: "2024-04",
    productsCount: 4,
  },
  {
    id: "f5",
    name: "Efua Darko",
    slug: "efua-darko",
    location: "Nsawam, Eastern Region",
    region: "Eastern",
    photo: "https://images.pexels.com/photos/27935664/pexels-photo-27935664.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "Efua runs Ghana's most innovative eco-product farm, producing cold-pressed coconut oil and raw shea butter using solar-powered equipment and zero-waste packaging.",
    certifications: ["Organic", "Eco Certified", "Carbon Neutral"],
    memberSince: "2024-01",
    productsCount: 6,
  },
  {
    id: "f6",
    name: "Yaw Frimpong",
    slug: "yaw-frimpong",
    location: "Akropong, Eastern Region",
    region: "Eastern",
    photo: "https://images.pexels.com/photos/30893262/pexels-photo-30893262.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "Yaw grows heritage varieties of cassava, yam, and cocoyam that have been cultivated in his family for generations. Real Ghanaian staples, grown the right way.",
    certifications: ["Traditional Farming", "Pesticide Free"],
    memberSince: "2024-05",
    productsCount: 7,
  },
];

export const getFarmerBySlug = (slug: string) =>
  farmers.find((f) => f.slug === slug);

export const getFarmerById = (id: string) =>
  farmers.find((f) => f.id === id);
