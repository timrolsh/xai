import { NextRequest, NextResponse } from "next/server";
import { getXPersonalizedAds } from "@/backend/get_x_personalized_ads";

export async function POST(req: NextRequest) {
  try {
    const { xHandle, companyName, description, goal } = await req.json();

    if (!xHandle || !companyName || !description || !goal) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Construct user-provided product information
    const userProvidedInformation = `
Company Name: ${companyName}
Company Description: ${description}
Campaign Goal: ${goal}
`;

    // Call the getXPersonalizedAds function
    const result = await getXPersonalizedAds(userProvidedInformation, xHandle);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error generating personalized ad:", error);
    return NextResponse.json({ error: error.message || "Failed to generate personalized ad" }, { status: 500 });
  }
}

