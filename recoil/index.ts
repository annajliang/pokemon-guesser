import { atom } from 'recoil';
import { PokemonProps, Modal, Leaderboard } from '../types';

export const allPokemonState = atom({
  key: 'allPokemonState',
  default: [] as PokemonProps[],
});

export const currentIndexState = atom({
  key: 'currentIndexState',
  default: 0 as number,
});

export const nextIndexState = atom({
  key: 'nextIndexState',
  default: 0 as number,
});

export const scoreState = atom({
  key: 'scoreState',
  default: 0 as number,
});

export const timerState = atom({
  key: 'timerState',
  default: 60 as number | string,
});

export const showPokemonState = atom({
  key: 'showPokemonState',
  default: false as boolean,
});

export const unseenIdsState = atom({
  key: 'unseenIdsState',
  default: [] as (number | undefined)[],
});

export const chosenGenState = atom({
  key: 'chosenGenState',
  default: 1 as number | string,
});

export const isGuessCorrectState = atom({
  key: 'isGuessCorrectState',
  default: null as null | boolean,
});

export const startGameAudioState = atom({
  key: 'startGameAudioState',
  default: null as null | HTMLAudioElement,
});

export const showModalsState = atom({
  key: 'showModalsState',
  default: {
    leaderboard: false,
    gameOver: false,
  } as Modal,
});

export const leaderboardState = atom({
  key: 'leaderboardState',
  default: [] as Leaderboard[],
});
