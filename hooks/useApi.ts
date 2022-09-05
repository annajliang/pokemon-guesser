import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { allPokemonState, unseenIdsState } from '../recoil';
import { getPokemonNameId, getPokemonIds } from '../services';
import { Pokemon } from '../types';

export const useApi = (url: string) => {
  const [allPokemon, setallPokemon] = useRecoilState(allPokemonState);
  const setUnseenIds = useSetRecoilState(unseenIdsState);

  useEffect(() => {
    const setupPokemonData = (data: Pokemon[]) => {
      const pokemonNameId = getPokemonNameId(data);
      setallPokemon([...pokemonNameId]);
      const pokemonIds = getPokemonIds(data);
      setUnseenIds([...pokemonIds]);
    };

    const getPokemon = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        if (!data) return;

        if (url.includes('generation')) {
          const { pokemon_species } = data;
          setupPokemonData(pokemon_species);
        } else {
          const { results } = data;
          setupPokemonData(results);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (allPokemon.length === 0) {
      getPokemon();
    }
  }, [allPokemon, setallPokemon, url, setUnseenIds]);

  return [allPokemon, setallPokemon];
};
