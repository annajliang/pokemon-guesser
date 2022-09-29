import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { allPokemonState, unseenIdsState } from '../recoil';
import { getPokemonNameId, getPokemonIds } from '../services';
import { PokemonProps } from '../types';

export const useApi = (url: string) => {
  const [allPokemon, setAllPokemon] = useRecoilState(allPokemonState);
  const setUnseenIds = useSetRecoilState(unseenIdsState);

  useEffect(() => {
    const setupPokemonData = (data: PokemonProps[], id: number) => {
      const pokemonNameId = getPokemonNameId(data, id);
      setAllPokemon(pokemonNameId);
      const pokemonIds = getPokemonIds(data);
      setUnseenIds(pokemonIds);
    };

    const getPokemon = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        console.log('data', data);

        if (!data) return;

        if (url.includes('generation')) {
          const { pokemon_species } = data;
          setupPokemonData(pokemon_species, data.id);
        } else {
          const { results } = data;
          setupPokemonData(results, data.id);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (allPokemon.length === 0) {
      getPokemon();
    }
  }, [allPokemon, setAllPokemon, url, setUnseenIds]);

  return [allPokemon, setAllPokemon];
};
