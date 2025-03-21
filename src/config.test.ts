import { buildUrl } from "./config.js";

describe("Config Module", () => {
  describe("buildUrl", () => {
    // Save original GIPHY_API_KEY
    const originalApiKey = process.env.GIPHY_API_KEY;

    // Make sure to reset the environment after tests
    afterAll(() => {
      process.env.GIPHY_API_KEY = originalApiKey;
    });

    it("should build a URL with the correct base and query parameters", () => {
      const url = buildUrl("search", { q: "test" });
      expect(url).toContain("https://api.giphy.com/v1/gifs/search");
      expect(url).toContain("api_key=");
      expect(url).toContain("q=test");
    });

    it("should include all parameters in the URL", () => {
      const url = buildUrl("trending", {
        limit: 20,
        offset: 5,
        rating: "g",
      });

      expect(url).toContain("https://api.giphy.com/v1/gifs/trending");
      expect(url).toContain("api_key=");
      expect(url).toContain("limit=20");
      expect(url).toContain("offset=5");
      expect(url).toContain("rating=g");
    });
  });
});
