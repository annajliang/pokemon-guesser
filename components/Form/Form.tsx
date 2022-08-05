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
} from '../../utils/globalState';
import { PokemonData } from '../../utils/types/interfaces';
import { StyledForm, StyledContainer } from './Form.styled';
import correct from '../../public/sounds/correct.mp3';
import wrong from '../../public/sounds/wrong.mp3';

const getFilteredPokemon = (
  allPokemon: PokemonData[],
  currentPokemon: string
) => {
  return allPokemon.filter((pokemon) => {
    return pokemon.name !== currentPokemon;
  });
};

export const Form = () => {
  const [guess, setGuess] = useState('');
  const randomIndex = useRecoilValue(randomIndexState);
  const [allPokemon, setallPokemon] = useRecoilState(allPokemonState);
  const [score, setScore] = useRecoilState(scoreState);
  const [showPokemon, setshowPokemon] = useRecoilState(showPokemonState);
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
    setshowPokemon(true);

    if (levenshteinDistance < 2) {
      correctAudio?.play();
      return setScore((prevScore) => prevScore + 5);
    }

    return wrongAudio?.play();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    evaluateGuess();
    setGuess('');

    setTimeout(() => {
      // remove pokemon that just appeared from allPokemon array to ensure no pokemon appears twice
      const filteredPokemon = getFilteredPokemon(allPokemon, currentPokemon);
      setallPokemon(filteredPokemon);
      setshowPokemon(false);
    }, 1000);
  };

  const handleSkip = () => {
    evaluateGuess();
    setGuess('');

    setTimeout(() => {
      // remove pokemon that just appeared from allPokemon array to ensure no pokemon appears twice
      const filteredPokemon = getFilteredPokemon(allPokemon, currentPokemon);
      setallPokemon(filteredPokemon);
      setshowPokemon(false);
    }, 1000);
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
