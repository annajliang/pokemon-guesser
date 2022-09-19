import Image from 'next/image';
import { useRecoilValue, useRecoilState } from 'recoil';
import { PokemonProps } from '../../types';
import { useWindowSize } from '../../hooks/useWindowSize';
import {
  allPokemonState,
  currentIndexState,
  showPokemonState,
  isGuessCorrectState,
  nextIndexState,
  unseenIdsState,
} from '../../recoil';
import {
  StyledPokemonImage,
  StyledName,
  StyledPicture,
  StyledH1,
  StyledNextPokemon,
} from './Pokemon.styled';
import { getcurrentIndex } from '../../services';

interface RandomPokemonProps {
  allPokemon: PokemonProps[];
  currentIndex: number;
  showPokemon: boolean;
  size: {
    width: number | undefined;
    height: number | undefined;
  };
}

const RandomPokemon = ({
  allPokemon,
  currentIndex,
  showPokemon,
  size,
}: RandomPokemonProps) => {
  return (
    <StyledPicture>
      <source
        srcSet={require(`../../public/pokemon/gen${allPokemon[currentIndex].gen}/${allPokemon[currentIndex].id}.png?webp`)}
        type="image/webp"
      />
      <StyledPokemonImage showPokemon={showPokemon}>
        <Image
          src={`/pokemon/gen${allPokemon[currentIndex].gen}/${allPokemon[currentIndex].id}.png`}
          alt={`${allPokemon[currentIndex].name}`}
          width={`${size.width !== undefined && size.width <= 970 ? 300 : 400}`}
          height={`${
            size.width !== undefined && size.width <= 970 ? 300 : 400
          }`}
          priority={true}
          draggable="false"
        />
      </StyledPokemonImage>
    </StyledPicture>
  );
};

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const showPokemon = useRecoilValue(showPokemonState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);
  const size = useWindowSize();
  const [nextIndex, setNextIndex] = useRecoilState(nextIndexState);
  const [unseenIds, setUnseenIds] = useRecoilState(unseenIdsState);

  if (currentIndex === 0) {
    const firstIndex = getcurrentIndex(allPokemon);
    const secondIndex = getcurrentIndex(allPokemon);
    setCurrentIndex(firstIndex);
    setNextIndex(secondIndex);

    const filteredUnseenIds = unseenIds.filter((id) => {
      return id !== firstIndex && id !== secondIndex;
    });

    setUnseenIds(filteredUnseenIds);
    console.log('filteredUnseenIds', filteredUnseenIds);
  }

  console.log('currentIndex', currentIndex);
  console.log('nextIndex', nextIndex);
  console.log('----------------');

  return (
    <>
      {allPokemon[currentIndex] && (
        <>
          {showPokemon ? (
            <StyledName isGuessCorrect={isGuessCorrect}>
              {allPokemon[currentIndex].name}
            </StyledName>
          ) : (
            <StyledH1>Who&apos;s That Pokémon?</StyledH1>
          )}
          <RandomPokemon
            allPokemon={allPokemon}
            currentIndex={currentIndex}
            showPokemon={showPokemon}
            size={size}
          />
          <StyledNextPokemon>
            <RandomPokemon
              allPokemon={allPokemon}
              currentIndex={nextIndex}
              showPokemon={showPokemon}
              size={size}
            />
          </StyledNextPokemon>
        </>
      )}
    </>
  );
};
