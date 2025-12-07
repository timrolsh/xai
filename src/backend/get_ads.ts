import {generateObject} from "ai";
import {xai} from "@ai-sdk/xai";
import {AdsSchema} from "./ads_schema";
import {system_prompt} from "../system_prompts";

export async function getAds(user_provided_product_information: string) {
  let system_prompt_result = (
    await generateObject({
      model: xai("grok-4-1-fast-non-reasoning"),
      schema: AdsSchema,
      prompt: system_prompt + user_provided_product_information
    })
  ).object;
  const slug = system_prompt_result.product_slug_snake_case;
  let images = [];
  for (let i = 0; i < system_prompt_result.demographics.length; i++) {
    const demographic = system_prompt_result.demographics[i];
    const image_generation_prompt = `Context of the product: ${system_prompt_result.product_context}, instruction: ${demographic.instruction}`;
    images.push(fetchGeneratedImageUrl(image_generation_prompt));
  }
  images = await Promise.all(images);
  for (let i = 0; i < images.length; i++) {
    // @ts-ignore
    system_prompt_result["demographics"][i]["image_url"] = images[i];
  }
  await Bun.write(`ads/${slug}.json`, JSON.stringify(system_prompt_result, null, 2));
  return system_prompt_result;
}

export async function fetchGeneratedImageUrl(image_generation_prompt: string) {
  const response = (
    await (
      await fetch("https://api.x.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.XAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: image_generation_prompt,
          model: "grok-imagine-v0p9",
          response_format: "url",
          n: 1
        })
      })
    ).json()
  ).data[0].url;
  console.log(response);
  return response;
}
