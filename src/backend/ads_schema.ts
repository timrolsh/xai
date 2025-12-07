import {z} from "zod";

// 1. Define your strict schema
export const AdsSchema = z.object({
  product_slug_snake_case: z.string(),
  product_context: z.string(),
  demographics: z
    .array(
      z.object({
        header: z.string(),
        age_range: z.string(),
        gender: z.string(),
        geolocation: z.string(),
        instruction: z.string(),
        tweet_text: z.string()
      })
    )
    .min(3)
    .max(4)
});

export type AdsData = z.infer<typeof AdsSchema>;
export type Demographic = AdsData['demographics'][number];

