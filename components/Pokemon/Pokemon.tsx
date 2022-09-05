import Image from 'next/image';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  allPokemonState,
  randomIndexState,
  showPokemonState,
  isGuessCorrectState,
} from '../../recoil';
import { StyledPokemonImage, StyledName } from './Pokemon.styled';
import { getRandomIndex } from '../../services';

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);
  const showPokemon = useRecoilValue(showPokemonState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);

  if (randomIndex === 0) {
    setRandomIndex(getRandomIndex(allPokemon));
  }

  return (
    <div>
      {allPokemon[randomIndex] && (
        <>
          {showPokemon ? (
            <StyledName isGuessCorrect={isGuessCorrect}>
              {allPokemon[randomIndex].name}
            </StyledName>
          ) : (
            <Image
              src={'/assets/pokemonTitleDesktop.svg'}
              width={550}
              height={70}
              priority={true}
              draggable="false"
              alt="Who's that Pokemon?"
            />
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
                draggable="false"
              />
            </StyledPokemonImage>
          </picture>
        </>
      )}
    </div>
  );
};
