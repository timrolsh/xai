import {z} from "zod";

// 1. Define your strict schema
export const XPersonalizedAdsSchema = z.object({
  product_context: z.string(),
  instruction: z.string(),
  tweet_text: z.string()
});

export type XPersonalizedAdsData = z.infer<typeof XPersonalizedAdsSchema>;
