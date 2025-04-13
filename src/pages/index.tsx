import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSearchShows } from "@/hooks/useSearchShows";
import { Show } from "@/types/show";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const {
    searchTerm,
    setSearchTerm,
    shows,
    loading,
    hasMore,
    fetchShows,
    resetSearch,
  } = useSearchShows();

  const lastShowElementRef = useInfiniteScroll(loading, hasMore, fetchShows);

  const handleSearchBoxKeypress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === "Tab") {
      fetchShows();
    }
  };

  const handleSearchBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("e.target.value", event.target.value);
    resetSearch();
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-[family-name:var(--font-geist-sans)] mx-36 mt-12`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start ">
        <h1 className="text-9xl  font-bold">Search shows</h1>

        <p className="text-4xl">Press enter to search</p>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Search shows"
          onKeyDown={handleSearchBoxKeypress}
          onChange={handleSearchBoxChange}
        />

        <ol className="list-outside list-decimal mt-6">
          {shows.map((show: Show, index: number) => (
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
