import { buildUrl } from "./config.js";
import type { GiphyGif, GiphyRandomResponse, GiphyResponse } from "./types.js";

export async function searchGifs(params: {
  query: string;
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
  lang?: string;
}) {
  const { query, limit = 10, offset = 0, rating = "g", lang = "en" } = params;

  const searchParams = {
    q: query,
    limit,
    offset,
    rating,
    lang,
  };

  const url = buildUrl("search", searchParams);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Giphy API error: ${response.status} ${response.statusText}`
    );
  }

  const responseData: GiphyResponse = await response.json();
  return formatGifs(responseData.data);
}

export async function getRandomGif(params: {
  tag?: string;
  rating?: "g" | "pg" | "pg-13" | "r";
}) {
  const { tag, rating = "g" } = params;

  const searchParams: Record<string, string | number> = {
    rating,
  };

  if (tag) {
    searchParams.tag = tag;
  }

  const url = buildUrl("random", searchParams);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Giphy API error: ${response.status} ${response.statusText}`
    );
  }

  const responseData: GiphyRandomResponse = await response.json();
  return formatGif(responseData.data);
}

export async function getTrendingGifs(params: {
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
}) {
  const { limit = 10, offset = 0, rating = "g" } = params;

  const searchParams = {
    limit,
    offset,
    rating,
  };

  const url = buildUrl("trending", searchParams);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Giphy API error: ${response.status} ${response.statusText}`
    );
  }

  const responseData: GiphyResponse = await response.json();
  return formatGifs(responseData.data);
}

// Helper function to format a single GIF for response
function formatGif(gif: GiphyGif) {
  return {
    id: gif.id,
    title: gif.title,
    url: gif.url,
    images: {
      original: gif.images.original,
      downsized: gif.images.downsized,
      preview: gif.images.preview_gif,
    },
    source: gif.source,
    import_datetime: gif.import_datetime,
    user: gif.user
      ? {
          username: gif.user.username,
          display_name: gif.user.display_name,
          profile_url: gif.user.profile_url,
        }
      : null,
  };
}

// Helper function to format multiple GIFs
function formatGifs(gifs: GiphyGif[]) {
  return gifs.map(formatGif);
}
