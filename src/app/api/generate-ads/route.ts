import { NextRequest, NextResponse } from "next/server";
import { getAds } from "@/backend/get_ads";

export async function POST(req: NextRequest) {
  try {
    const { companyName, description, goal } = await req.json();

    if (!companyName || !description || !goal) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Construct user-provided information
    const userProvidedInformation = `
Company Name: ${companyName}
Company Description: ${description}
Campaign Goal: ${goal}
`;

    // Call the getAds function
    const result = await getAds(userProvidedInformation);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error generating ads:", error);
    return NextResponse.json({ error: error.message || "Failed to generate ads" }, { status: 500 });
  }
}

