import Image from 'next/image';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useWindowSize } from '../../hooks/useWindowSize';
import {
  allPokemonState,
  randomIndexState,
  showPokemonState,
  isGuessCorrectState,
} from '../../recoil';
import {
  StyledPokemonImage,
  StyledName,
  StyledPicture,
  StyledH1,
} from './Pokemon.styled';
import { getRandomIndex } from '../../services';

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);
  const showPokemon = useRecoilValue(showPokemonState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);
  const size = useWindowSize();

  if (randomIndex === 0) {
    setRandomIndex(getRandomIndex(allPokemon));
  }

  return (
    <>
      {allPokemon[randomIndex] && (
        <>
          {showPokemon ? (
            <StyledName isGuessCorrect={isGuessCorrect}>
              {allPokemon[randomIndex].name}
            </StyledName>
          ) : (
            <StyledH1>Who&apos;s That Pokémon?</StyledH1>
          )}
          <StyledPicture>
            <source
              srcSet={require(`../../public/pokemon/gen${allPokemon[randomIndex].gen}/${allPokemon[randomIndex].id}.png?webp`)}
              type="image/webp"
            />
            <StyledPokemonImage showPokemon={showPokemon}>
              <Image
                src={`/pokemon/gen${allPokemon[randomIndex].gen}/${allPokemon[randomIndex].id}.png`}
                alt={`${allPokemon[randomIndex].name}`}
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
        </>
      )}
    </>
  );
};
