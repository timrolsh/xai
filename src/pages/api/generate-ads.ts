import type {NextApiRequest, NextApiResponse} from "next";
import {getAds} from "@/backend/get_ads";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({error: "Method not allowed"});
  }

  try {
    const {companyName, description, goal} = req.body;

    if (!companyName || !description || !goal) {
      return res.status(400).json({error: "Missing required fields"});
    }

    // Construct user-provided information
    const userProvidedInformation = `
Company Name: ${companyName}
Company Description: ${description}
Campaign Goal: ${goal}
`;

    // Call the getAds function
    const result = await getAds(userProvidedInformation);

    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error generating ads:", error);
    res.status(500).json({error: error.message || "Failed to generate ads"});
  }
}
