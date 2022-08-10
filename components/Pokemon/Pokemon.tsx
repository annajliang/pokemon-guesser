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
  pokemonUrlState,
} from '../../utils/globalState';
import { StyledPokemonImage, StyledName } from './Pokemon.styled';
import { getRandomIndex } from '../../utils/helpers';

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const chosenGen = useRecoilValue(chosenGenState);
  const unseenIds = useRecoilValue(unseenIdsState);
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);
  const [pokemonUrl, setPokemonUrl] = useRecoilState(pokemonUrlState);
  const [showPokemon, setShowPokemon] = useRecoilState(showPokemonState);
  const [isProcessing, setIsProcessing] = useRecoilState(isProcessingState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);

  let url;

  useEffect(() => {
    setRandomIndex(getRandomIndex(unseenIds));
  }, [unseenIds, setRandomIndex]);

  useEffect(() => {
    if (isProcessing) {
      setShowPokemon(true);
      setPokemonUrl(
        `/pokemon/gen${allPokemon[randomIndex]?.gen}/${allPokemon[randomIndex]?.id}.png`
      );
    } else {
      setShowPokemon(false);
      setPokemonUrl(
        `/pokemon/gen${allPokemon[randomIndex]?.gen}/${allPokemon[randomIndex]?.id}.png`
      );
    }
  }, [setShowPokemon, isProcessing, allPokemon, randomIndex, setPokemonUrl]);

  console.log('isProcessing', isProcessing);

  return (
    <div>
      {pokemonUrl && (
        <>
          {showPokemon && (
            <StyledName isGuessCorrect={isGuessCorrect}>
              {allPokemon[randomIndex].name}
            </StyledName>
          )}

          <StyledPokemonImage
            showPokemon={showPokemon}
            isGuessCorrect={isGuessCorrect}
          >
            <Image
              src={
                pokemonUrl || `/pokemon/gen1/${allPokemon[randomIndex].id}.png`
              }
              alt={`${allPokemon[randomIndex]?.name}`}
              width={400}
              height={400}
              priority={true}
              draggable="false"
            />
          </StyledPokemonImage>
        </>
      )}
    </div>
  );
};
