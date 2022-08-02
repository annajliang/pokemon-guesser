interface Props {
  setGuess: (val: string) => void;
  guess: string;
}

export const Input = ({ guess, setGuess }: Props) => {
  return (
    <input
      type="text"
      value={guess}
      onChange={(e) => setGuess(e.target.value.toLowerCase())}
    />
  );
};
