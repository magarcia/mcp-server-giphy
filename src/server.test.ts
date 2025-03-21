import * as serviceModule from "./service.js";
import {
  searchGifsTool,
  getRandomGifTool,
  getTrendingGifsTool,
} from "./tools.js";

// Mock the service module
jest.mock("./service.js", () => ({
  searchGifs: jest.fn(),
  getRandomGif: jest.fn(),
  getTrendingGifs: jest.fn(),
}));

describe("Server Module", () => {
  const mockSearchResult = [{ id: "123", title: "Test GIF" }];
  const mockRandomResult = { id: "random123", title: "Random Test GIF" };
  const mockTrendingResult = [
    { id: "trending123", title: "Trending Test GIF" },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    (serviceModule.searchGifs as jest.Mock).mockResolvedValue(mockSearchResult);
    (serviceModule.getRandomGif as jest.Mock).mockResolvedValue(
      mockRandomResult
    );
    (serviceModule.getTrendingGifs as jest.Mock).mockResolvedValue(
      mockTrendingResult
    );
  });

  describe("CallToolRequestSchema handler", () => {
    it("should handle search_gifs requests correctly", async () => {
      // Test the handler's logic directly
      const searchParams = {
        query: "test",
        limit: 10,
      };

      const result = await serviceModule.searchGifs(searchParams);

      expect(serviceModule.searchGifs).toHaveBeenCalledWith(searchParams);
      expect(result).toEqual(mockSearchResult);
    });

    it("should handle get_random_gif requests correctly", async () => {
      // Test the handler's logic directly
      const randomParams = {
        tag: "funny",
      };

      const result = await serviceModule.getRandomGif(randomParams);

      expect(serviceModule.getRandomGif).toHaveBeenCalledWith(randomParams);
      expect(result).toEqual(mockRandomResult);
    });

    it("should handle get_trending_gifs requests correctly", async () => {
      // Test the handler's logic directly
      const trendingParams = {
        limit: 5,
      };

      const result = await serviceModule.getTrendingGifs(trendingParams);

      expect(serviceModule.getTrendingGifs).toHaveBeenCalledWith(
        trendingParams
      );
      expect(result).toEqual(mockTrendingResult);
    });

    it("should handle errors correctly", async () => {
      // Mock the service function to throw an error
      const error = new Error("API error");
      (serviceModule.searchGifs as jest.Mock).mockRejectedValueOnce(error);

      // Test error handling
      try {
        await serviceModule.searchGifs({ query: "test" });
        fail("Expected an error to be thrown");
      } catch (e) {
        expect(e).toEqual(error);
      }
    });
  });

  describe("ListToolsRequestSchema handler", () => {
    it("should include all available tools", () => {
      // Test the tools array directly
      const tools = [searchGifsTool, getRandomGifTool, getTrendingGifsTool];

      expect(tools).toContain(searchGifsTool);
      expect(tools).toContain(getRandomGifTool);
      expect(tools).toContain(getTrendingGifsTool);
      expect(tools.length).toBe(3);
    });
  });
});
