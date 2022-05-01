import { atom } from 'recoil';
import { PokemonData } from './types/interfaces';

export const allPokemonState = atom({
  key: 'allPokemonState',
  default: [] as PokemonData[],
});

export const currentPokemonState = atom({
  key: 'currentPokemonState',
  default: '' as string,
});
