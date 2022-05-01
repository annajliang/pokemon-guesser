interface Props {
  setGuess: (val: string) => void;
}

export const Input = ({ setGuess }: Props) => {
  return <input type="text" onChange={(e) => setGuess(e.target.value)} />;
};
