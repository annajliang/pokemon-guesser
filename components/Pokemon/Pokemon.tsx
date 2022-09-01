import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import {
  allPokemonState,
  randomIndexState,
  showPokemonState,
  isGuessCorrectState,
} from '../../utils/globalState';
import { StyledPokemonImage, StyledName } from './Pokemon.styled';

export const Pokemon = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const randomIndex = useRecoilValue(randomIndexState);
  const showPokemon = useRecoilValue(showPokemonState);

  const isGuessCorrect = useRecoilValue(isGuessCorrectState);

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
