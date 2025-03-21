import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  searchGifsTool,
  getRandomGifTool,
  getTrendingGifsTool,
} from "./tools.js";
import { searchGifs, getRandomGif, getTrendingGifs } from "./service.js";

// Create the MCP server instance
export const server = new Server(
  {
    name: "giphy-search",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "search_gifs": {
        const searchParams = args as {
          query: string;
          limit?: number;
          offset?: number;
          rating?: "g" | "pg" | "pg-13" | "r";
          lang?: string;
        };
        const gifs = await searchGifs(searchParams);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ gifs }),
            },
          ],
        };
      }

      case "get_random_gif": {
        const randomParams = args as {
          tag?: string;
          rating?: "g" | "pg" | "pg-13" | "r";
        };
        const gif = await getRandomGif(randomParams);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ gif }),
            },
          ],
        };
      }

      case "get_trending_gifs": {
        const trendingParams = args as {
          limit?: number;
          offset?: number;
          rating?: "g" | "pg" | "pg-13" | "r";
        };
        const gifs = await getTrendingGifs(trendingParams);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ gifs }),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    console.error(`Error executing tool ${name}:`, error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
});

// Register available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [searchGifsTool, getRandomGifTool, getTrendingGifsTool],
  };
});
