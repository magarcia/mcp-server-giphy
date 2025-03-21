import { searchGifs, getRandomGif, getTrendingGifs } from "./service.js";
import * as configModule from "./config.js";
import { GiphyGif, GiphyResponse, GiphyRandomResponse } from "./types.js";
import axios from "axios";

// Mock the buildUrl function from the config module
jest.mock("./config.js", () => ({
  buildUrl: jest.fn(),
}));

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    mockedAxios.get.mockResolvedValue({ data: {} });
  });

  describe("searchGifs", () => {
    it("should call buildUrl with the correct parameters", async () => {
      // Mock the axios response
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          data: [mockGif],
        } as GiphyResponse,
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

      // Verify axios was called
      expect(mockedAxios.get).toHaveBeenCalledWith("https://mocked-url.com");
    });

    it("should handle Axios errors correctly", async () => {
      // Use a simpler approach to mock the axios error
      mockedAxios.get.mockImplementation(() => {
        // Create a custom error with Axios error properties
        const error = new Error("Request failed");
        // Add axios error properties
        (
          error as unknown as {
            isAxiosError: boolean;
            response: { status: number; statusText: string };
          }
        ).isAxiosError = true;
        (
          error as unknown as {
            isAxiosError: boolean;
            response: { status: number; statusText: string };
          }
        ).response = {
          status: 400,
          statusText: "Bad Request",
        };
        return Promise.reject(error);
      });

      await expect(searchGifs({ query: "test" })).rejects.toThrow(
        "Giphy API error: Request failed"
      );
    });

    it("should handle non-Axios errors correctly", async () => {
      // Regular Error object
      const regularError = new Error("Network Error");

      mockedAxios.get.mockRejectedValueOnce(regularError);

      await expect(searchGifs({ query: "test" })).rejects.toThrow(
        "Giphy API error: Network Error"
      );
    });
  });

  describe("getRandomGif", () => {
    it("should call buildUrl with the correct parameters", async () => {
      // Mock the axios response
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          data: mockGif,
        } as GiphyRandomResponse,
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

      // Verify axios was called
      expect(mockedAxios.get).toHaveBeenCalledWith("https://mocked-url.com");
    });
  });

  describe("getTrendingGifs", () => {
    it("should call buildUrl with the correct parameters", async () => {
      // Mock the axios response
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          data: [mockGif],
        } as GiphyResponse,
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

      // Verify axios was called
      expect(mockedAxios.get).toHaveBeenCalledWith("https://mocked-url.com");
    });
  });
});
