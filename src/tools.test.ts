import {
  searchGifsTool,
  getRandomGifTool,
  getTrendingGifsTool,
} from "./tools.js";

describe("Tools Module", () => {
  describe("searchGifsTool", () => {
    it("should have the correct name and description", () => {
      expect(searchGifsTool.name).toBe("search_gifs");
      expect(searchGifsTool.description).toBe(
        "Search for GIFs on Giphy with a query string"
      );
    });

    it("should have the correct input schema", () => {
      expect(searchGifsTool.inputSchema.type).toBe("object");
      expect(searchGifsTool.inputSchema.properties).toHaveProperty("query");
      expect(searchGifsTool.inputSchema.properties).toHaveProperty("limit");
      expect(searchGifsTool.inputSchema.properties).toHaveProperty("offset");
      expect(searchGifsTool.inputSchema.properties).toHaveProperty("rating");
      expect(searchGifsTool.inputSchema.properties).toHaveProperty("lang");
      expect(searchGifsTool.inputSchema.required).toContain("query");
    });

    it("should have optional parameters with correct descriptions", () => {
      const properties = searchGifsTool.inputSchema.properties;
      if (properties) {
        expect(properties).toHaveProperty("limit");
        expect(properties).toHaveProperty("offset");
        expect(properties).toHaveProperty("rating");
        expect(properties).toHaveProperty("lang");

        // Check rating enum values if it exists
        if (properties.rating && typeof properties.rating === "object") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          expect((properties.rating as any).enum).toEqual([
            "g",
            "pg",
            "pg-13",
            "r",
          ]);
        }
      }
    });
  });

  describe("getRandomGifTool", () => {
    it("should have the correct name and description", () => {
      expect(getRandomGifTool.name).toBe("get_random_gif");
      expect(getRandomGifTool.description).toBe(
        "Get a random GIF from Giphy, optionally filtered by tag"
      );
    });

    it("should have the correct input schema", () => {
      expect(getRandomGifTool.inputSchema.type).toBe("object");
      expect(getRandomGifTool.inputSchema.properties).toHaveProperty("tag");
      expect(getRandomGifTool.inputSchema.properties).toHaveProperty("rating");
    });
  });

  describe("getTrendingGifsTool", () => {
    it("should have the correct name and description", () => {
      expect(getTrendingGifsTool.name).toBe("get_trending_gifs");
      expect(getTrendingGifsTool.description).toBe(
        "Get currently trending GIFs on Giphy"
      );
    });

    it("should have the correct input schema", () => {
      expect(getTrendingGifsTool.inputSchema.type).toBe("object");
      expect(getTrendingGifsTool.inputSchema.properties).toHaveProperty(
        "limit"
      );
      expect(getTrendingGifsTool.inputSchema.properties).toHaveProperty(
        "offset"
      );
      expect(getTrendingGifsTool.inputSchema.properties).toHaveProperty(
        "rating"
      );
    });
  });
});
