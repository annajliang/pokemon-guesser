import type { NextPage } from "next";
import { useEffect } from "react";
import { Pokemon } from "../components/Pokemon/Pokemon";
import { Form } from "../components/Form/Form";
import styles from "../styles/Home.module.css";
import { allPokemonState } from "../utils/globalState";
import { useRecoilState } from "recoil";
import { PokemonData } from "../utils/types/interfaces";

const getPokemonId = (url: PokemonData["url"]) => {
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

const getPokemonNameId = (results: PokemonData[]) => {
  return results.map((result: PokemonData) => {
    return { name: result.name, id: getPokemonId(result.url) };
  });
};

const Game: NextPage<{ pokemon: PokemonData[] }> = ({ pokemon }) => {
  const [allPokemon, setallPokemon] = useRecoilState(allPokemonState);

  useEffect(() => {
    const pokemonNameId = getPokemonNameId(pokemon);
    setallPokemon([...pokemonNameId]);

    console.log(pokemon);
  }, [setallPokemon, pokemon]);

  return (
    <div className={styles.container}>
      <h1>Who&apos;s That Pokemon?</h1>
      <Pokemon />
      <Form />
    </div>
  );
};

export default Game;

export const getStaticProps = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();

  return {
    props: {
      pokemon: data.results,
    },
  };
};
