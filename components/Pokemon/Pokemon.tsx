import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allPokemonState, randomIndexState } from '../../utils/globalState';

const getRandomIndex = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);

  useEffect(() => {
    setRandomIndex(getRandomIndex(allPokemon));
  }, [allPokemon, setRandomIndex]);

  console.log('pokemon', allPokemon[randomIndex]?.name);
  return (
    <div>
      {allPokemon[randomIndex] && (
        <>
          <h1>{allPokemon[randomIndex].name}</h1>
          <picture>
            <source
              srcSet={require(`../../public/pokemon/gen1/${allPokemon[randomIndex].id}.png?webp`)}
              type="image/webp"
            />
            <Image
              src={`/pokemon/gen1/${allPokemon[randomIndex].id}.png`}
              alt={`${allPokemon[randomIndex].name}`}
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
