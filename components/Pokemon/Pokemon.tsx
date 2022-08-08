import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allPokemonState,
  randomIndexState,
  showPokemonState,
  unseenIdsState,
  chosenGenState,
  isGuessCorrectState,
} from '../../utils/globalState';
import { StyledPokemonImage, StyledName } from './Pokemon.styled';
import { getRandomIndex } from '../../utils/helpers';

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const chosenGen = useRecoilValue(chosenGenState);
  const unseenIds = useRecoilValue(unseenIdsState);
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);
  const showPokemon = useRecoilValue(showPokemonState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);

  useEffect(() => {
    setRandomIndex(getRandomIndex(unseenIds));
  }, [unseenIds, setRandomIndex]);

  // console.log('randomIndex', randomIndex);
  console.log('chosenGen', chosenGen);

  return (
    <div>
      {allPokemon[randomIndex] && (
        <>
          {showPokemon && (
            <StyledName isGuessCorrect={isGuessCorrect}>
              {allPokemon[randomIndex].name}
            </StyledName>
          )}
          <picture>
            <source
              srcSet={require(`../../public/pokemon/gen${allPokemon[randomIndex].gen}/${allPokemon[randomIndex].id}.png?webp`)}
              type="image/webp"
            />
            <StyledPokemonImage showPokemon={showPokemon}>
              <Image
                src={`/pokemon/gen${allPokemon[randomIndex].gen}/${allPokemon[randomIndex].id}.png`}
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
