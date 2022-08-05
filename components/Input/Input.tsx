import { StyledInput } from './Input.styled';

interface Props {
  setGuess: (val: string) => void;
  guess: string;
}

export const Input = ({ guess, setGuess }: Props) => {
  return (
    <StyledInput
      type="text"
      placeholder="Type your guess"
      value={guess}
      onChange={(e) => setGuess(e.target.value.toLowerCase())}
    />
  );
};
