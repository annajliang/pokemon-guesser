import { useState, FormEvent } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useRecoilValue } from 'recoil';
import { currentPokemonState } from '../../utils/globalState';

export const Form = () => {
  const [userGuess, setUserGuess] = useState('');
  const currentPokemon = useRecoilValue(currentPokemonState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userGuess === currentPokemon) {
      return console.log('correct');
    }

    return console.log('wrong');
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <Input setUserGuess={setUserGuess} />
      <Button />
    </form>
  );
};
