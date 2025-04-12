import searchShows from "@/services/searchShows";
import { ErrorResponse } from "@/types/errorResponse";
import { SearchShowsApiResponse } from "@/types/searchShowsApiResponse";

import type { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchShowsApiResponse | ErrorResponse>
) {
  try {
    const searchTerm = req?.query?.term as string;
    const page = parseInt(req?.query?.page as string) || DEFAULT_PAGE;
    const pageSize = parseInt(req?.query?.size as string) || DEFAULT_PAGE_SIZE;

    const results = await searchShows(searchTerm, page, pageSize);

    res.status(200).json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
