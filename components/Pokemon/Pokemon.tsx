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
} from '../../recoil';
import {
  StyledPokemonImage,
  StyledName,
  StyledPicture,
  StyledH1,
  StyledNextPokemon,
  StyledSpinner,
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
    <>
      {allPokemon[currentIndex] ? (
        <StyledPicture>
          <source
            srcSet={require(`../../public/pokemon/gen${allPokemon[currentIndex].gen}/${allPokemon[currentIndex].id}.png?webp`)}
            type="image/webp"
          />
          <StyledPokemonImage showPokemon={showPokemon}>
            <Image
              src={`/pokemon/gen${allPokemon[currentIndex].gen}/${allPokemon[currentIndex].id}.png`}
              alt={`${allPokemon[currentIndex].name}`}
              width={`${
                size.width !== undefined && size.width <= 970 ? 300 : 400
              }`}
              height={`${
                size.width !== undefined && size.width <= 970 ? 300 : 400
              }`}
              priority={true}
              draggable="false"
            />
          </StyledPokemonImage>
        </StyledPicture>
      ) : (
        <StyledSpinner>
          <Image
            src="/assets/spinner.gif"
            alt=""
            height={200}
            width={200}
            priority
          />
        </StyledSpinner>
      )}
    </>
  );
};

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const showPokemon = useRecoilValue(showPokemonState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);
  const size = useWindowSize();
  const [nextIndex, setNextIndex] = useRecoilState(nextIndexState);

  if (currentIndex === 0) {
    setCurrentIndex(getcurrentIndex(allPokemon));
    setNextIndex(getcurrentIndex(allPokemon));
  }

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
