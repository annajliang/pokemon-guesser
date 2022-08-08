import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allPokemonState,
  randomIndexState,
  showPokemonState,
  unseenIdsState,
} from '../../utils/globalState';
import { StyledPokemonImage } from './Pokemon.styled';
import { getRandomIndex } from '../../utils/helpers';

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const unseenIds = useRecoilValue(unseenIdsState);
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);
  const showPokemon = useRecoilValue(showPokemonState);

  useEffect(() => {
    setRandomIndex(getRandomIndex(unseenIds));
  }, [unseenIds, setRandomIndex]);

  // console.log('randomIndex', randomIndex);
  console.log('unseenIds', unseenIds);
  console.log('allPokemon', allPokemon[randomIndex]);

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
