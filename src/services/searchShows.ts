import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { TvMazeResult } from "../types/tvmazeApiResponse";
import { Show } from "@/types/show";

const instance = Axios.create();
const axios = setupCache(instance);

const searchShows = async (
  searchTerm: string,
  page: number,
  pageSize: number
): Promise<Show[]> => {
  const response = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchTerm}`
  );

  console.log("cached?", response.cached);

  const from = (page - 1) * pageSize;
  const to = page * pageSize;
  const pagedResults = response.data.slice(from, to);

  return pagedResults.map((result: TvMazeResult) => ({
    name: result.show.name,
    genres: result.show.genres,
  }));
};

export default searchShows;
