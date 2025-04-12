import { Show } from "@/types/show";
import { Geist, Geist_Mono } from "next/font/google";
import { useCallback, useRef, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Add arbitrary wait so you can see the loading message.
 * The request returns so quickly that you can't see the loading message in the UI.
 * This is because I can't retrieve more than 10 results from the TV Maze API, and so I made the paging value 3 instead of 10.
 */
const WaitSoYouCanSeeTheLoadingLogic = async () => {
  console.log("waiting so you can see the loading logic");
  await new Promise((resolve) => setTimeout(resolve, 900));
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

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

  const lastShowElementRef = useCallback(
    (node: any) => {
      if (loading) return;

      if (observer.current) {
        observer.current?.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchShows();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, fetchShows]
  );

  const handleSearchBoxChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === "Tab") {
      setHasMore(true);
      setPage(1);
      setShows([]);
      fetchShows();
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-[family-name:var(--font-geist-sans)] mx-36 mt-12`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start ">
        <h1 className="text-9xl  font-bold">Search shows</h1>

        <p className="text-4xl">Press enter or tab to search</p>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Search shows"
          onKeyDown={handleSearchBoxChange}
          onChange={(e) => {
            console.log("e.target.value", e.target.value);
            setSearchTerm(e.target.value);
          }}
        />

        <ol className="list-outside list-decimal mt-6">
          {shows.map((show, index) => (
            <li
              ref={index === shows.length - 1 ? lastShowElementRef : null}
              key={show.name}
              className="mb-9"
            >
              <h2 className="text-7xl font-bold">{show.name}:</h2>
              <p className="text-4xl">{show.genres.join(", ")}</p>
            </li>
          ))}
        </ol>
        {loading && (
          <div className="text-2xl bg-gray-200 text-red-700 p-6 m-5">
            Loading more shows...
          </div>
        )}
      </main>
    </div>
  );
}
