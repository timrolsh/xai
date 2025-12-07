# XAI - Hyper-Personalized Ad Generation Platform

An AI-powered platform that generates hyper-personalized advertising campaigns for X (formerly Twitter) using xAI's Grok. Transform a company name and product description into laser-focused audience segments, X-ready ad creatives, and 1:1 personalized campaigns tailored to individual users.

## What It Does

XAI helps companies create targeted advertising campaigns by:

1. **Demographic Segmentation**: Analyzes your product and generates 3-4 diverse, relevant audience demographics with detailed targeting parameters (age range, gender, geolocation)

2. **Ad Creative Generation**: Creates X-ready ad creatives for each demographic segment, including:
   - Custom tweet text with hashtags
   - AI-generated images using Grok Imagine
   - Product context summaries

3. **1:1 Personalization**: Generates personalized ads for specific X users by:
   - Fetching their X profile information and activity
   - Analyzing their interests and engagement patterns
   - Creating tailored ad copy and visuals

4. **Campaign Management**: Provides a streamlined workflow to:
   - Input company information and campaign goals
   - Select target demographics
   - Preview and launch personalized campaigns

## How It Works (Technical Overview)

### Architecture

The application follows a **Client-Side Rendering (CSR)** architecture with server-side API routes:

- **Frontend**: Next.js 16 with React 19, TypeScript, and Tailwind CSS
- **State Management**: Zustand for client-side state with localStorage persistence
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion for smooth transitions

### Core Components

#### 1. **Backend Services** (`src/backend/`)

- **`get_ads.ts`**: Generates demographic-based ad campaigns
  - Uses Grok-4-1-fast-non-reasoning model for demographic analysis
  - Generates images via Grok Imagine API
  - Returns structured ad data with Zod schema validation

- **`get_x_personalized_ads.ts`**: Creates personalized ads for specific X users
  - Fetches X user profile and activity via X API SDK
  - Analyzes user's tweets, likes, and engagement patterns
  - Generates personalized ad copy and visuals

- **`system_prompts.ts`**: Contains AI prompts for:
  - Demographic segmentation
  - Personalized ad generation

#### 2. **Frontend Pages** (`src/app/studio/`)

Multi-step wizard flow:

1. **Company Name** (`/studio/company/name`): Input company information
2. **Company Description** (`/studio/company/description`): Product details
3. **Campaign Goal** (`/studio/company/goal`): Campaign objectives
4. **Segments** (`/studio/segments`): Select target demographics
5. **Ads Preview** (`/studio/ads`): Review generated ad creatives
6. **Personalization** (`/studio/personalization`): Generate 1:1 personalized ads

## Usage

1. **Start the application** (development or production)
2. **Navigate to the landing page** and click "Get Started"
3. **Enter company information**:
   - Company name
   - Product description
   - Campaign goal
4. **Select target demographics** from generated segments
5. **Review generated ad creatives** with images and copy
6. **Generate personalized ads** by entering an X handle
7. **Launch campaigns** when ready

## Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **AI SDK**: Vercel AI SDK
- **LLM**: xAI Grok
- **Image Generation**: Grok Imagine
- **X API**: @xdevplatform/xdk
- **Validation**: Zod
- **Runtime**: Bun / Node.js
