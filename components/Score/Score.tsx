import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import {
  scoreState,
  isGuessCorrectState,
  showPokemonState,
  currentIndexState,
  allPokemonState,
} from '../../recoil';
import {
  StyledScore,
  StyledScoreIcon,
  StyledAddedPoints,
} from './Score.styled';
import { calcPoints } from '../../services';

export const Score = () => {
  const score = useRecoilValue(scoreState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);
  const showPokemon = useRecoilValue(showPokemonState);
  const currentIndex = useRecoilValue(currentIndexState);
  const allPokemon = useRecoilValue(allPokemonState);
  const gen = allPokemon[currentIndex]?.gen;

  const points = calcPoints(gen);

  return (
    <StyledScore>
      <StyledScoreIcon>
        <Image
          src="/assets/bluePokeball.svg"
          alt=""
          width={50}
          height={50}
          priority
        />
      </StyledScoreIcon>
      <h3>Score</h3>
      <p>{score}</p>
      {isGuessCorrect && (
        <StyledAddedPoints points={points}>+{points}</StyledAddedPoints>
      )}
      {!isGuessCorrect && showPokemon && (
        <StyledAddedPoints points={points}>-{points}</StyledAddedPoints>
      )}
    </StyledScore>
  );
};
