import { Show } from "./show";

export interface SearchShowsApiResponse {
  totalShows: number;
  page: number;
  hasMorePages: boolean;
  shows: Show[];
}
