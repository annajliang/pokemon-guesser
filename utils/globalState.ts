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
