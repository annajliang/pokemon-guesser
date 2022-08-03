import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { allPokemonState } from '../globalState';
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
    return 'nidoran';
  }

  if (name === 'farfetchd') {
    return `farfetch'd`;
  }

  if (name === 'mr-mime') {
    return 'mr. mime';
  }

  return name;
};

const getPokemonNameId = (results: PokemonData[]) => {
  return results.map((result: PokemonData) => {
    return {
      name: getReformattedName(result.name),
      id: getPokemonId(result.url),
    };
  });
};

export const useApi = (url: string) => {
  const [allPokemon, setallPokemon] = useRecoilState(allPokemonState);

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
          console.log('pokemonNameId', pokemonNameId);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (allPokemon.length === 0) {
      getPokemon();
    }
  }, [allPokemon, setallPokemon, url]);

  return [allPokemon, setallPokemon];
};
