import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { allPokemonState, unseenIdsState } from '../globalState';
import { PokemonData } from '../types/interfaces';

const getPokemonId = (url: PokemonData['url']) => {
  const id = url?.split('/')[6];

  if (!id) {
    return;
  }

  if (parseInt(id) <= 9) {
    return '00' + id;
  }

  if (parseInt(id) >= 10 && parseInt(id) < 100) {
    return '0' + id;
  }

  return id;
};

const getReformattedName = (name: string) => {
  if (name === 'nidoran-f' || name === 'nidoran-m') {
    return 'Nidoran';
  }

  if (name === 'farfetchd') {
    return `Farfetch'd`;
  }

  if (name === 'mr-mime') {
    return 'Mr. Mime';
  }

  // capitalize first letter
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const getPokemonNameId = (results: PokemonData[]) => {
  return results.map((result: PokemonData) => {
    return {
      name: getReformattedName(result.name),
      id: getPokemonId(result.url),
    };
  });
};

const getPokemonIds = (results: PokemonData[]) => {
  return results.map((result: PokemonData, i) => {
    return i;
  });
};

export const useApi = (url: string) => {
  const [allPokemon, setallPokemon] = useRecoilState(allPokemonState);
  const [unseenIds, setUnseenIds] = useRecoilState(unseenIdsState);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        const { results } = data;

        if (data) {
          const pokemonNameId = getPokemonNameId(results);
          setallPokemon([...pokemonNameId]);
          const pokemonIds = getPokemonIds(results);
          setUnseenIds([...pokemonIds]);
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
