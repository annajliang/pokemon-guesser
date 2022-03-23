import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

interface Pokemon {
  name: string;
  id: string;
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

const Home: NextPage = () => {
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

        console.log(response.ok);

        const data = await response.json();

        if (data) {
          const pokemons = data.results.map((pokemon: Pokemon) => {
            return { name: pokemon.name, id: getPokemonId(pokemon.url) };
          });

          setallPokemon([...pokemons]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (allPokemon.length === 0) {
      getPokemon();
    }

    console.log("allPokemon", allPokemon);
  }, [allPokemon]);

  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
    </div>
  );
};

export default Home;
