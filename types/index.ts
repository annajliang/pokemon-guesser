export interface PokemonProps {
  name: string;
  id: string | undefined;
  url?: string | undefined;
  gen: number;
}

export interface Modal {
  leaderboard: boolean;
  gameOver: boolean;
}

export interface Leaderboard {
  _id: string;
  name: string;
  score: number;
}
