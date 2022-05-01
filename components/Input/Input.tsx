interface Props {
  setUserGuess: (val: string) => void;
}

export const Input = ({ setUserGuess }: Props) => {
  return <input type="text" onChange={(e) => setUserGuess(e.target.value)} />;
};
