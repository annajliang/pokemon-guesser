import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  id: string | undefined;
  url?: string | undefined;
}

const getPokemonId = (url: Pokemon["url"]) => {
  const id = url?.split("/")[6];

  if (!id) {
    return;
  }

  if (parseInt(id) <= 9) {
    return "00" + id;
  }

  if (parseInt(id) >= 10 && parseInt(id) < 100) {
    return "0" + id;
  }

  return id;
};

const getPokemonNameId = (results: Pokemon[]) => {
  return results.map((result: Pokemon) => {
    return { name: result.name, id: getPokemonId(result.url) };
  });
};

export const useApi = () => {
  const [allPokemon, setallPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        const { results } = data;

        if (data) {
          const pokemonNameId = getPokemonNameId(results);
          setallPokemon([...pokemonNameId]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (allPokemon.length === 0) {
      getPokemon();
    }
  }, [allPokemon]);

  return [allPokemon, setallPokemon];
};
