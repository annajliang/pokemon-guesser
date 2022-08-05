import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allPokemonState,
  randomIndexState,
  showPokemonState,
} from '../../utils/globalState';
import { StyledPokemonImage } from './Pokemon.styled';

const getRandomIndex = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const showPokemon = useRecoilValue(showPokemonState);
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);

  useEffect(() => {
    setRandomIndex(getRandomIndex(allPokemon));
  }, [allPokemon, setRandomIndex]);

  return (
    <div>
      {allPokemon[randomIndex] && (
        <>
          {showPokemon && <h1>{allPokemon[randomIndex].name}</h1>}
          <picture>
            <source
              srcSet={require(`../../public/pokemon/gen1/${allPokemon[randomIndex].id}.png?webp`)}
              type="image/webp"
            />
            <StyledPokemonImage showPokemon={showPokemon}>
              <Image
                src={`/pokemon/gen1/${allPokemon[randomIndex].id}.png`}
                alt={`${allPokemon[randomIndex].name}`}
                width={400}
                height={400}
                priority={true}
              />
            </StyledPokemonImage>
          </picture>
        </>
      )}
    </div>
  );
};
