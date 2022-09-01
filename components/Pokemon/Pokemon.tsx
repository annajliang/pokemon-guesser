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
  isProcessingState,
} from '../../utils/globalState';
import { StyledPokemonImage, StyledName } from './Pokemon.styled';
import { getRandomIndex } from '../../utils/helpers';

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const chosenGen = useRecoilValue(chosenGenState);
  const unseenIds = useRecoilValue(unseenIdsState);
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);
  const [showPokemon, setShowPokemon] = useRecoilState(showPokemonState);
  const [isProcessing, setIsProcessing] = useRecoilState(isProcessingState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);

  useEffect(() => {
    if (isProcessing) {
      setShowPokemon(true);
    } else {
      setShowPokemon(false);
    }
  }, [setShowPokemon, isProcessing]);

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
            <StyledPokemonImage
              showPokemon={showPokemon}
              isGuessCorrect={isGuessCorrect}
            >
              <Image
                src={`/pokemon/gen${allPokemon[randomIndex].gen}/${allPokemon[randomIndex].id}.png`}
                alt={`${allPokemon[randomIndex].name}`}
                width={400}
                height={400}
                priority={true}
                draggable="false"
              />
            </StyledPokemonImage>
          </picture>
        </>
      )}
    </div>
  );
};
