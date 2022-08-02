import { useState, FormEvent } from 'react';
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

  const currentPokemon = allPokemon[randomIndex]?.name;

  const evaluateGuess = () => {
    console.log('guess', guess);
    const answer = currentPokemon.toLowerCase();
    console.log('answer', guess);
    const levenshteinDistance = levenshtein(guess, answer);

    if (levenshteinDistance < 2) {
      return setScore((prevScore) => prevScore + 5);
    }

    return console.log('wrong');
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
