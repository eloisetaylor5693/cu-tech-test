import { useState, useCallback } from "react";
import { Show } from "@/types/show";
import WaitSoYouCanSeeTheLoadingLogic from "@/utils/arbitraryWait";

export function useSearchShows() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean | null>(null);

  const fetchShows = useCallback(async () => {
    if (loading || !searchTerm || !hasMore) {
      return;
    }

    setLoading(true);

    await WaitSoYouCanSeeTheLoadingLogic();

    try {
      const response = await fetch(
        `/api/search/shows?term=${searchTerm}&page=${page}&size=3`
      );
      const data = await response.json();

      if (!data.shows.length) {
        return;
      }

      setShows((prevShows: Show[]) => [
        ...new Set([...prevShows, ...data.shows]),
      ]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.hasMorePages);
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, loading, hasMore]);

  const resetSearch = () => {
    setHasMore(true);
    setPage(1);
    setShows([]);
  };

  return {
    searchTerm,
    setSearchTerm,
    shows,
    loading,
    hasMore,
    fetchShows,
    resetSearch,
  };
}
