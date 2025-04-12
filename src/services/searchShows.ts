import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { TvMazeResult } from "../types/tvmazeApiResponse";
import { SearchShowsApiResponse } from "@/types/searchShowsApiResponse";

const instance = Axios.create();
const axios = setupCache(instance);

const searchShows = async (
  searchTerm: string,
  page: number,
  pageSize: number
): Promise<SearchShowsApiResponse> => {
  const response = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchTerm}`
  );

  console.log("cached?", response.cached);

  const from = (page - 1) * pageSize;
  const to = page * pageSize;
  const pagedResults = response.data.slice(from, to);

  return {
    totalShows: response.data.length,
    page,
    hasMorePages: to < response.data.length,
    shows: pagedResults.map((result: TvMazeResult) => ({
      name: result.show.name,
      genres: result.show.genres,
    })),
  };
};

export default searchShows;
