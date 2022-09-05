export interface Pokemon {
  name: string;
  id: string | undefined;
  url?: string | undefined;
  gen: number;
}

export interface Modal {
  leaderboard: boolean;
  gameOver: boolean;
}
