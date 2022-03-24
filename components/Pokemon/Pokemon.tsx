import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { allPokemonState } from "../../utils/globalState";
import { PokemonData } from "../../utils/types/interfaces";

const getRandomIndex = (arr: PokemonData[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const Pokemon = () => {
  const [allPokemon] = useRecoilState(allPokemonState);
  const [randomPokemon, setRandomPokemon] = useState<PokemonData>();

  useEffect(() => {
    const randomIndex = getRandomIndex(allPokemon);
    setRandomPokemon(allPokemon[randomIndex]);
  }, [allPokemon]);

  return (
    <div>
      {randomPokemon && (
        <>
          <h1>{randomPokemon.name}</h1>
          <picture>
            <source
              srcSet={require(`../../public/pokemon/gen1/${randomPokemon.id}.png?webp`)}
              type="image/webp"
            />
            <Image
              src={`/pokemon/gen1/${randomPokemon.id}.png`}
              alt={`${randomPokemon.name}`}
              width={500}
              height={500}
              priority={true}
            />
          </picture>
        </>
      )}
    </div>
  );
};
