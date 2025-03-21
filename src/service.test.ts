import { searchGifs, getRandomGif, getTrendingGifs } from "./service.js";
import * as configModule from "./config.js";
import { GiphyGif, GiphyResponse, GiphyRandomResponse } from "./types.js";

// Mock the buildUrl function from the config module
jest.mock("./config.js", () => ({
  buildUrl: jest.fn(),
}));

// Mock the global fetch function
global.fetch = jest.fn();

describe("Service Module", () => {
  // Sample GIF data for testing
  const mockGif: GiphyGif = {
    id: "test123",
    title: "Test GIF",
    url: "https://giphy.com/gifs/test123",
    images: {
      original: {
        url: "https://media.giphy.com/media/test123/giphy.gif",
        width: "480",
        height: "360",
      },
      downsized: {
        url: "https://media.giphy.com/media/test123/giphy-downsized.gif",
        width: "240",
        height: "180",
      },
      preview_gif: {
        url: "https://media.giphy.com/media/test123/giphy-preview.gif",
        width: "120",
        height: "90",
      },
    },
    source: "Test Source",
    import_datetime: "2023-01-01",
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
    (configModule.buildUrl as jest.Mock).mockReturnValue(
      "https://mocked-url.com"
    );
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn(),
    });
  });

  describe("searchGifs", () => {
    it("should call buildUrl with the correct parameters", async () => {
      // Mock the fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          data: [mockGif],
        } as GiphyResponse),
      });

      // Call the function
      await searchGifs({
        query: "test query",
        limit: 10,
        offset: 0,
        rating: "g",
        lang: "en",
      });

      // Verify buildUrl was called with the correct parameters
      expect(configModule.buildUrl).toHaveBeenCalledWith("search", {
        q: "test query",
        limit: 10,
        offset: 0,
        rating: "g",
        lang: "en",
      });

      // Verify fetch was called
      expect(global.fetch).toHaveBeenCalledWith("https://mocked-url.com");
    });

    it("should throw an error when the API response is not ok", async () => {
      // Mock a failed fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
      });

      // Call the function and expect it to throw
      await expect(searchGifs({ query: "test" })).rejects.toThrow(
        "Giphy API error: 400 Bad Request"
      );
    });
  });

  describe("getRandomGif", () => {
    it("should call buildUrl with the correct parameters", async () => {
      // Mock the fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          data: mockGif,
        } as GiphyRandomResponse),
      });

      // Call the function
      await getRandomGif({
        tag: "test tag",
        rating: "g",
      });

      // Verify buildUrl was called with the correct parameters
      expect(configModule.buildUrl).toHaveBeenCalledWith("random", {
        rating: "g",
        tag: "test tag",
      });

      // Verify fetch was called
      expect(global.fetch).toHaveBeenCalledWith("https://mocked-url.com");
    });
  });

  describe("getTrendingGifs", () => {
    it("should call buildUrl with the correct parameters", async () => {
      // Mock the fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          data: [mockGif],
        } as GiphyResponse),
      });

      // Call the function
      await getTrendingGifs({
        limit: 20,
        offset: 5,
        rating: "g",
      });

      // Verify buildUrl was called with the correct parameters
      expect(configModule.buildUrl).toHaveBeenCalledWith("trending", {
        limit: 20,
        offset: 5,
        rating: "g",
      });

      // Verify fetch was called
      expect(global.fetch).toHaveBeenCalledWith("https://mocked-url.com");
    });
  });
});
