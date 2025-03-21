// Define Giphy API response types
export interface GiphyImageObject {
  url: string;
  width: string;
  height: string;
  size?: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
}

export interface GiphyImages {
  original: GiphyImageObject;
  downsized: GiphyImageObject;
  preview_gif: GiphyImageObject;
  [key: string]: GiphyImageObject;
}

export interface GiphyUser {
  username: string;
  display_name: string;
  profile_url: string;
}

export interface GiphyGif {
  id: string;
  title: string;
  url: string;
  images: GiphyImages;
  source: string;
  import_datetime: string;
  user?: GiphyUser | null;
}

export interface GiphyResponse {
  data: GiphyGif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

export interface GiphyRandomResponse {
  data: GiphyGif;
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}
