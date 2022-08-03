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
