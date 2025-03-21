import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
export const GIPHY_API_BASE_URL = "https://api.giphy.com/v1/gifs";

if (!GIPHY_API_KEY) {
  console.error("Error: GIPHY_API_KEY is not set in the environment.");
  process.exit(1);
}

// Helper function to create URL with query parameters
export function buildUrl(
  endpoint: string,
  params: Record<string, string | number>
): string {
  const baseUrl = `${GIPHY_API_BASE_URL}/${endpoint}`;
  const url = new URL(baseUrl);
  url.searchParams.append("api_key", GIPHY_API_KEY as string);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  return url.toString();
}
