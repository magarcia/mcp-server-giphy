import { GiphyGif, GiphyResponse, GiphyRandomResponse } from "./types.js";

describe("Giphy API Type Definitions", () => {
  describe("GiphyGif type", () => {
    it("should have the correct structure", () => {
      const gif: GiphyGif = {
        id: "abc123",
        title: "Test GIF",
        url: "https://giphy.com/gifs/test",
        images: {
          original: {
            url: "https://media.giphy.com/media/abc123/giphy.gif",
            width: "500",
            height: "400",
          },
          downsized: {
            url: "https://media.giphy.com/media/abc123/giphy-downsized.gif",
            width: "250",
            height: "200",
          },
          preview_gif: {
            url: "https://media.giphy.com/media/abc123/giphy-preview.gif",
            width: "100",
            height: "80",
          },
        },
        source: "Test Source",
        import_datetime: "2023-01-01",
      };

      expect(gif.id).toBe("abc123");
      expect(gif.title).toBe("Test GIF");
      expect(gif.images.original.url).toBe(
        "https://media.giphy.com/media/abc123/giphy.gif"
      );
      expect(gif.images.downsized.width).toBe("250");
      expect(gif.source).toBe("Test Source");
    });
  });

  describe("GiphyResponse type", () => {
    it("should have the correct structure", () => {
      const response: GiphyResponse = {
        data: [
          {
            id: "abc123",
            title: "Test GIF",
            url: "https://giphy.com/gifs/test",
            images: {
              original: {
                url: "https://media.giphy.com/media/abc123/giphy.gif",
                width: "500",
                height: "400",
              },
              downsized: {
                url: "https://media.giphy.com/media/abc123/giphy-downsized.gif",
                width: "250",
                height: "200",
              },
              preview_gif: {
                url: "https://media.giphy.com/media/abc123/giphy-preview.gif",
                width: "100",
                height: "80",
              },
            },
            source: "Test Source",
            import_datetime: "2023-01-01",
          },
        ],
        pagination: {
          total_count: 100,
          count: 1,
          offset: 0,
        },
        meta: {
          status: 200,
          msg: "OK",
          response_id: "response123",
        },
      };

      expect(response.data.length).toBe(1);
      expect(response.pagination.total_count).toBe(100);
      expect(response.meta.status).toBe(200);
    });
  });

  describe("GiphyRandomResponse type", () => {
    it("should have the correct structure", () => {
      const response: GiphyRandomResponse = {
        data: {
          id: "random123",
          title: "Random GIF",
          url: "https://giphy.com/gifs/random",
          images: {
            original: {
              url: "https://media.giphy.com/media/random123/giphy.gif",
              width: "500",
              height: "400",
            },
            downsized: {
              url: "https://media.giphy.com/media/random123/giphy-downsized.gif",
              width: "250",
              height: "200",
            },
            preview_gif: {
              url: "https://media.giphy.com/media/random123/giphy-preview.gif",
              width: "100",
              height: "80",
            },
          },
          source: "Random Source",
          import_datetime: "2023-01-01",
        },
        meta: {
          status: 200,
          msg: "OK",
          response_id: "random_response123",
        },
      };

      expect(response.data.id).toBe("random123");
      expect(response.data.title).toBe("Random GIF");
      expect(response.meta.status).toBe(200);
    });
  });
});
