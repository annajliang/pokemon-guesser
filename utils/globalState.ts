import { atom } from 'recoil';
import { PokemonData } from './types/interfaces';

export const allPokemonState = atom({
  key: 'allPokemonState',
  default: [] as PokemonData[],
});

export const randomIndexState = atom({
  key: 'randomIndexState',
  default: 0 as number,
});

export const scoreState = atom({
  key: 'scoreState',
  default: 0 as number,
});

export const timerState = atom({
  key: 'timerState',
  default: 60 as number,
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

export const startGameAudioStaate = atom({
  key: 'startGameAudioStaate',
  default: null as null | HTMLAudioElement,
});

export const isProcessingState = atom({
  key: 'isProcessingState',
  default: false as boolean,
});
