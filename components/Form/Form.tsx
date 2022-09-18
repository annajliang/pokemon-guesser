import { useState, FormEvent, useEffect } from 'react';
import levenshtein from 'js-levenshtein';
import { Input } from './Input/Input';
import { Guess } from '../Button/GuessButton/GuessButton';
import { Skip } from '../Skip/Skip';
import { SoundIcon } from '../Sound/Sound';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  allPokemonState,
  currentIndexState,
  scoreState,
  showPokemonState,
  unseenIdsState,
  isGuessCorrectState,
  showNextPokemonState,
  nextIndexState,
} from '../../recoil';
import { StyledForm, StyledContainer, StyledSettings } from './Form.styled';
import correct from '../../public/sounds/correct.mp3';
import wrong from '../../public/sounds/wrong.mp3';
import { getRandomItem, getcurrentIndex } from '../../services';

const getFilteredUnseenIds = (
  unseenIds: (number | undefined)[],
  currentIndex: number
) => {
  return unseenIds.filter((id) => {
    return id !== currentIndex;
  });
};

export const Form = () => {
  const [guess, setGuess] = useState('');
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [unseenIds, setUnseenIds] = useRecoilState(unseenIdsState);
  const [isGuessCorrect, setIsGuessCorrect] =
    useRecoilState(isGuessCorrectState);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const allPokemon = useRecoilValue(allPokemonState);
  const [showPokemon, setShowPokemon] = useRecoilState(showPokemonState);
  const setScore = useSetRecoilState(scoreState);
  const [wrongAudio, setWrongAudio] = useState<HTMLAudioElement>();
  const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement>();
  const currentPokemon = allPokemon[currentIndex]?.name;
  const [showNextPokemon, setShowNextPokemon] =
    useRecoilState(showNextPokemonState);
  const [nextIndex, setNextIndex] = useRecoilState(nextIndexState);

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
    isSoundOn && wrongAudio?.play();
    setScore((prevScore) => prevScore - 5);
  };

  const handleNextPokemon = () => {
    // setCurrentIndex(nextIndex);
    evaluateGuess();
    setShowPokemon(true);
    const filteredUnseenIds = getFilteredUnseenIds(unseenIds, currentIndex);
    const unseenId = getRandomItem(filteredUnseenIds);
    // setNextIndex(unseenId);

    setTimeout(() => {
      setNextIndex(unseenId);
      setCurrentIndex(nextIndex);
      setShowPokemon(false);
      setIsGuessCorrect(null);
      setGuess('');
    }, 1000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNextPokemon();
  };

  return (
    <StyledContainer>
      <StyledSettings>
        <Skip handleSkip={handleNextPokemon} showPokemon={showPokemon} />
        &nbsp;|&nbsp;
        <SoundIcon isSoundOn={isSoundOn} setIsSoundOn={setIsSoundOn} />
      </StyledSettings>
      <StyledForm
        action="submit"
        onSubmit={handleSubmit}
        isGuessCorrect={isGuessCorrect}
      >
        <Input setGuess={setGuess} guess={guess} />
        <Guess isDisabled={showPokemon} label="Guess" size="large" />
      </StyledForm>
    </StyledContainer>
  );
};
