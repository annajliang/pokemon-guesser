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
} from '../../utils/globalState';
import { PokemonData } from '../../utils/types/interfaces';
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
  const [wrongAudio, setWrongAudio] = useState<HTMLAudioElement>();
  const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement>();
  const currentPokemon = allPokemon[randomIndex]?.name;

  //https://github.com/vercel/next.js/discussions/17963
  useEffect(() => {
    setCorrectAudio(new Audio(correct));
    setWrongAudio(new Audio(wrong));
  }, []);

  const evaluateGuess = () => {
    console.log('guess', guess);
    const answer = currentPokemon.toLowerCase();
    console.log('answer', guess);
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

    // remove pokemon that just appeared from allPokemon array to ensure no pokemon appears twice
    const filteredPokemon = getFilteredPokemon(allPokemon, currentPokemon);
    setallPokemon(filteredPokemon);
  };

  const handleSkip = () => {
    evaluateGuess();

    // remove pokemon that just appeared from allPokemon array to ensure no pokemon appears twice
    const filteredPokemon = getFilteredPokemon(allPokemon, currentPokemon);
    setallPokemon(filteredPokemon);
  };

  return (
    <>
      <Skip handleSkip={handleSkip} />
      <form action="submit" onSubmit={handleSubmit}>
        <Input setGuess={setGuess} />
        <Button />
      </form>
    </>
  );
};
