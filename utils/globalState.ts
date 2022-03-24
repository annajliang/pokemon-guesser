import { atom } from "recoil";
import { PokemonData } from "./types/interfaces";

export const allPokemonState = atom({
  key: "allPokemon",
  default: [] as PokemonData[],
});