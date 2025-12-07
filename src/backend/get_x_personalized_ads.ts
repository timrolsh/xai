import {generateObject} from "ai";
import {fetchGeneratedImageUrl} from "./get_ads";
import {xai} from "@ai-sdk/xai";
import {Client, type ClientConfig} from "@xdevplatform/xdk";
import {XPersonalizedAdsSchema} from "./x_personalized_ads_schema";
import {x_user_info_system_prompt} from "./system_prompts";

// Main function thats going to return the object
export async function getXPersonalizedAds(
  user_provided_product_information: string,
  target_x_user_handle: string
) {
  // Fetch X user information
  const xUserInfo = await fetchXUserInfo(target_x_user_handle);

  // Format the user info as a JSON string for the prompt
  const xUserInfoString = JSON.stringify(xUserInfo, null, 2);

  // Combine system prompt with product info and user info
  const fullPrompt =
    x_user_info_system_prompt +
    "\n\nProduct Information:\n" +
    user_provided_product_information +
    "\n\nX User Profile Information and Activity:\n" +
    xUserInfoString;

  // Generate personalized ad using Grok
  const result = (
    await generateObject({
      model: xai("grok-4-1-fast-non-reasoning"),
      schema: XPersonalizedAdsSchema,
      prompt: fullPrompt,
    })
  ).object;

  // Generate and the ad image and get its url
  const imageUrl = await fetchGeneratedImageUrl(result.instruction);
  // @ts-ignore
  result.image_url = imageUrl;
  return result;
}

async function fetchXUserInfo(target_x_user_handle: string) {
  // Remove @ if present
  const username = target_x_user_handle.replace(/^@/, "");

  // Initialize X API client
  const config: ClientConfig = {
    bearerToken: process.env.X_API_API_KEY || ""
  };
  const client = new Client(config);

  try {
    // Get user profile information
    const userResponse = await client.users.getByUsername(username, {
      "user.fields": [
        "created_at",
        "description",
        "entities",
        "id",
        "location",
        "name",
        "pinned_tweet_id",
        "profile_image_url",
        "protected",
        "public_metrics",
        "url",
        "username",
        "verified",
        "withheld"
      ]
    });

    const user = userResponse.data;
    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    const userId = user.id;

    // Get user's recent tweets
    let recentTweets: any[] = [];
    try {
      // Try getByUserId method (common in X SDK)
      const tweetsResponse = await (client as any).tweets?.getByUserId?.(userId, {
        max_results: 20,
        "tweet.fields": [
          "created_at",
          "text",
          "public_metrics",
          "lang",
          "entities",
          "context_annotations",
          "possibly_sensitive"
        ]
      });

      if (tweetsResponse?.data) {
        recentTweets = Array.isArray(tweetsResponse.data)
          ? tweetsResponse.data
          : [tweetsResponse.data];
      }
    } catch (error) {
      console.log("Could not fetch tweets:", error);
    }

    // Get user's liked tweets
    let likedTweets: any[] = [];
    try {
      // Try getUserLikedTweets method
      const likesResponse = await (client as any).tweets?.getUserLikedTweets?.(userId, {
        max_results: 20,
        "tweet.fields": [
          "created_at",
          "text",
          "public_metrics",
          "lang",
          "entities",
          "author_id"
        ]
      });

      if (likesResponse?.data) {
        likedTweets = Array.isArray(likesResponse.data)
          ? likesResponse.data
          : [likesResponse.data];
      }
    } catch (error) {
      console.log("Could not fetch liked tweets:", error);
    }

    // Get user's followers count and following count from publicMetrics (camelCase)
    const publicMetrics = (user as any).publicMetrics || (user as any).public_metrics || {};

    // Compile all user information
    // Use both camelCase and snake_case to handle different SDK versions
    const userInfo = {
      profile: {
        id: user.id,
        username: user.username,
        name: user.name,
        description: user.description,
        location: user.location,
        url: user.url,
        verified: user.verified,
        protected: user.protected,
        created_at: (user as any).createdAt || (user as any).created_at,
        profile_image_url: (user as any).profileImageUrl || (user as any).profile_image_url,
        pinned_tweet_id: (user as any).pinnedTweetId || (user as any).pinned_tweet_id,
        public_metrics: {
          followers_count: publicMetrics.followersCount || publicMetrics.followers_count,
          following_count: publicMetrics.followingCount || publicMetrics.following_count,
          tweet_count: publicMetrics.tweetCount || publicMetrics.tweet_count,
          listed_count: publicMetrics.listedCount || publicMetrics.listed_count,
          like_count: publicMetrics.likeCount || publicMetrics.like_count
        },
        entities: (user as any).entities
      },
      recent_activity: {
        recent_tweets: recentTweets.map(tweet => ({
          id: tweet.id,
          text: tweet.text,
          created_at: tweet.createdAt || tweet.created_at,
          public_metrics: tweet.publicMetrics || tweet.public_metrics,
          lang: tweet.lang,
          entities: tweet.entities,
          context_annotations: tweet.contextAnnotations || tweet.context_annotations
        })),
        liked_tweets: likedTweets.map(tweet => ({
          id: tweet.id,
          text: tweet.text,
          created_at: tweet.createdAt || tweet.created_at,
          public_metrics: tweet.publicMetrics || tweet.public_metrics,
          lang: tweet.lang,
          entities: tweet.entities,
          author_id: tweet.authorId || tweet.author_id
        }))
      }
    };

    return userInfo;
  } catch (error) {
    console.error("Error fetching X user info:", error);
    throw error;
  }
}
