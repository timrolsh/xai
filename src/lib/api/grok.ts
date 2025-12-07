// Mock data based on the plan
const MOCK_GROKOPEDIA_DATA = {
  summary: "A revolutionary AI advertising platform that generates hyper-personalized ads using xAI's Grok.",
  industry: "Advertising Technology",
  foundingDate: "2024",
  keyProducts: ["Ad Generator", "Audience Segmentation", "Personalization Engine"]
};

const MOCK_ADS_RESPONSE = {
  product_slug_snake_case: "coca_cola_christmas_can",
  product_context: "The product is a limited edition Coca-Cola Christmas can featuring festive artwork and a QR code for an AR experience.",
  demographics: [
    {
      header: "Holiday Enthusiasts",
      age_range: "18-45",
      gender: "All",
      geolocation: "Global",
      instruction: "A festive scene with a Coca-Cola can on a snowy table...",
      tweet_text: "Get into the holiday spirit with the new Coca-Cola Christmas can! #HolidayMagic"
    },
    {
      header: "Gen Z Collectors",
      age_range: "16-24",
      gender: "All",
      geolocation: "Urban areas",
      instruction: "A vibrant, neon-lit photo of the can...",
      tweet_text: "Limited edition vibes. 🎄✨ #CokeChristmas"
    }
  ]
};

export async function fetchGrokopedia(companyName: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!companyName) {
    throw new Error("Company name is required");
  }

  // Return mock data
  return {
    ...MOCK_GROKOPEDIA_DATA,
    name: companyName
  };
}

export async function generateAds(companyContext: any) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  return MOCK_ADS_RESPONSE;
}

