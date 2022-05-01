import { useState, FormEvent } from 'react';
import levenshtein from 'js-levenshtein';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useRecoilValue } from 'recoil';
import { currentPokemonState } from '../../utils/globalState';

export const Form = () => {
  const [guess, setGuess] = useState('');
  const currentPokemon = useRecoilValue(currentPokemonState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const answer = currentPokemon;

    const levenshteinDistance = levenshtein(guess, answer);

    if (levenshteinDistance < 2) {
      return console.log('correct');
    }

    return console.log('wrong');
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <Input setGuess={setGuess} />
      <Button />
    </form>
  );
};
