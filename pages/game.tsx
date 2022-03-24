import type { NextPage } from "next";
import { useApi } from "../utils/hooks/useApi";
import { Pokemon } from "../components/Pokemon/Pokemon";
import { Form } from "../components/Form/Form";
import styles from "../styles/Home.module.css";

const Game: NextPage = () => {
  useApi("https://pokeapi.co/api/v2/pokemon?limit=151");

  return (
    <div className={styles.container}>
      <h1>Who&apos;s That Pokemon?</h1>
      <Pokemon />
      <Form />
    </div>
  );
};

export default Game;
