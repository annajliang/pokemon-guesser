export interface PokemonProps {
  name: string;
  id: string | undefined;
  url?: string | undefined;
  gen: number;
}

export interface ModalProps {
  leaderboard: boolean;
  gameOver: boolean;
  disclaimer: boolean;
}

export interface LeaderboardProps {
  _id: string;
  name: string;
  score: number;
}

export enum SubmissionStatus {
  READY = 'ready',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  FAILURE = 'failure',
}
