export interface TvMazeResult {
  score: number;
  show: TvMazeShow;
}

export interface TvMazeShow {
  id: number;
  name: string;
  genres: string[];
}
