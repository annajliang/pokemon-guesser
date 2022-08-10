import { useState, FormEvent, useEffect } from 'react';
import levenshtein from 'js-levenshtein';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Skip } from '../Skip/Skip';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allPokemonState,
  randomIndexState,
  scoreState,
  showPokemonState,
  unseenIdsState,
  isGuessCorrectState,
  prevRandomIndexState,
} from '../../utils/globalState';
import { StyledForm, StyledContainer } from './Form.styled';
import correct from '../../public/sounds/correct.mp3';
import wrong from '../../public/sounds/wrong.mp3';
import { getRandomIndex } from '../../utils/helpers';

const getFilteredUnseenIds = (
  unseenIds: (number | undefined)[],
  randomIndex: number
) => {
  return unseenIds.filter((id) => {
    return id !== randomIndex;
  });
};

interface FormProps {
  isSoundOn: boolean;
}

export const Form = ({ isSoundOn }: FormProps) => {
  const [guess, setGuess] = useState('');
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);
  const [unseenIds, setUnseenIds] = useRecoilState(unseenIdsState);
  const [prevRandomIndex, setPrevRandomIndex] =
    useRecoilState(prevRandomIndexState);
  const [isGuessCorrect, setIsGuessCorrect] =
    useRecoilState(isGuessCorrectState);
  const allPokemon = useRecoilValue(allPokemonState);
  const [showPokemon, setShowPokemon] = useRecoilState(showPokemonState);
  const [score, setScore] = useRecoilState(scoreState);
  const [wrongAudio, setWrongAudio] = useState<HTMLAudioElement>();
  const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement>();
  const currentPokemon = allPokemon[randomIndex]?.name;

  //https://github.com/vercel/next.js/discussions/17963
  useEffect(() => {
    setCorrectAudio(new Audio(correct));
    setWrongAudio(new Audio(wrong));
  }, []);

  const evaluateGuess = () => {
    const answer = currentPokemon.toLowerCase();
    const levenshteinDistance = levenshtein(guess, answer);

    if (levenshteinDistance < 2) {
      isSoundOn && correctAudio?.play();
      setIsGuessCorrect(true);
      return setScore((prevScore) => prevScore + 5);
    }

    setIsGuessCorrect(false);
    return isSoundOn && wrongAudio?.play();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    evaluateGuess();
    setShowPokemon(true);
    const filteredUnseenIds = getFilteredUnseenIds(unseenIds, randomIndex);
    console.log('randomIndex', randomIndex);
    setPrevRandomIndex(randomIndex);
    const index = getRandomIndex(filteredUnseenIds);

    setTimeout(() => {
      setShowPokemon(false);
      setUnseenIds(filteredUnseenIds);
      setRandomIndex(index);
      setIsGuessCorrect(null);
    }, 1000);

    setGuess('');
  };

  const handleSkip = () => {
    evaluateGuess();
    setShowPokemon(true);
    setIsGuessCorrect(false);
    const filteredUnseenIds = getFilteredUnseenIds(unseenIds, randomIndex);
    const index = getRandomIndex(filteredUnseenIds);

    setTimeout(() => {
      setShowPokemon(false);
      setUnseenIds(filteredUnseenIds);
      setRandomIndex(index);
      setIsGuessCorrect(null);
    }, 1000);

    setGuess('');
  };

  return (
    <StyledContainer>
      <Skip handleSkip={handleSkip} showPokemon={showPokemon} />
      <StyledForm
        action="submit"
        onSubmit={handleSubmit}
        isGuessCorrect={isGuessCorrect}
      >
        <Input setGuess={setGuess} guess={guess} />
        <Button showPokemon={showPokemon} />
      </StyledForm>
    </StyledContainer>
  );
};
