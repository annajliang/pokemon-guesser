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

export const Form = () => {
  const [guess, setGuess] = useState('');
  const [randomIndex, setRandomIndex] = useRecoilState(randomIndexState);
  const [unseenIds, setUnseenIds] = useRecoilState(unseenIdsState);
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
      correctAudio?.play();
      return setScore((prevScore) => prevScore + 5);
    }

    return wrongAudio?.play();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    evaluateGuess();
    setShowPokemon(true);

    setTimeout(() => {
      const filteredUnseenIds = getFilteredUnseenIds(unseenIds, randomIndex);
      setUnseenIds(filteredUnseenIds);
      setRandomIndex(getRandomIndex(filteredUnseenIds));
      setShowPokemon(false);
    }, 1200);

    setGuess('');
  };

  const handleSkip = () => {
    evaluateGuess();
    setShowPokemon(true);
    setTimeout(() => {
      const filteredUnseenIds = getFilteredUnseenIds(unseenIds, randomIndex);
      setUnseenIds(filteredUnseenIds);
      setRandomIndex(getRandomIndex(filteredUnseenIds));
      setShowPokemon(false);
    }, 1200);

    setGuess('');
  };

  return (
    <StyledContainer>
      <Skip handleSkip={handleSkip} />
      <StyledForm action="submit" onSubmit={handleSubmit}>
        <Input setGuess={setGuess} guess={guess} />
        <Button />
      </StyledForm>
    </StyledContainer>
  );
};
