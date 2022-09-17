import { useState, FormEvent, useEffect } from 'react';
import levenshtein from 'js-levenshtein';
import { Input } from './Input/Input';
import { Guess } from '../Button/GuessButton/GuessButton';
import { Skip } from '../Skip/Skip';
import { SoundIcon } from '../Sound/Sound';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  allPokemonState,
  randomIndexState,
  scoreState,
  showPokemonState,
  unseenIdsState,
  isGuessCorrectState,
} from '../../recoil';
import { StyledForm, StyledContainer, StyledSettings } from './Form.styled';
import correct from '../../public/sounds/correct.mp3';
import wrong from '../../public/sounds/wrong.mp3';
import { getRandomItem } from '../../services';

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
  const [isGuessCorrect, setIsGuessCorrect] =
    useRecoilState(isGuessCorrectState);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const allPokemon = useRecoilValue(allPokemonState);
  const [showPokemon, setShowPokemon] = useRecoilState(showPokemonState);
  const setScore = useSetRecoilState(scoreState);
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
    isSoundOn && wrongAudio?.play();
    setScore((prevScore) => prevScore - 5);
  };

  const handleNextPokemon = () => {
    evaluateGuess();
    setShowPokemon(true);
    const filteredUnseenIds = getFilteredUnseenIds(unseenIds, randomIndex);
    const unseenId = getRandomItem(filteredUnseenIds);

    setTimeout(() => {
      setShowPokemon(false);
      setUnseenIds(filteredUnseenIds);
      setRandomIndex(unseenId);
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
