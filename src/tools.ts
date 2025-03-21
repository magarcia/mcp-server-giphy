import { Tool } from "@modelcontextprotocol/sdk/types.js";

// Define the tool schemas
export const searchGifsTool: Tool = {
  name: "search_gifs",
  description: "Search for GIFs on Giphy with a query string",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search query term or phrase" },
      limit: {
        type: "number",
        description:
          "Maximum number of objects to return (default: 10, max: 50)",
      },
      offset: { type: "number", description: "Results offset (default: 0)" },
      rating: {
        type: "string",
        enum: ["g", "pg", "pg-13", "r"],
        description: "Content rating (g, pg, pg-13, r)",
      },
      lang: { type: "string", description: "Language code (default: en)" },
    },
    required: ["query"],
  },
};

export const getRandomGifTool: Tool = {
  name: "get_random_gif",
  description: "Get a random GIF from Giphy, optionally filtered by tag",
  inputSchema: {
    type: "object",
    properties: {
      tag: {
        type: "string",
        description: "Tag to limit random results (optional)",
      },
      rating: {
        type: "string",
        enum: ["g", "pg", "pg-13", "r"],
        description: "Content rating (g, pg, pg-13, r)",
      },
    },
  },
};

export const getTrendingGifsTool: Tool = {
  name: "get_trending_gifs",
  description: "Get currently trending GIFs on Giphy",
  inputSchema: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        description:
          "Maximum number of objects to return (default: 10, max: 50)",
      },
      offset: { type: "number", description: "Results offset (default: 0)" },
      rating: {
        type: "string",
        enum: ["g", "pg", "pg-13", "r"],
        description: "Content rating (g, pg, pg-13, r)",
      },
    },
  },
};
