interface SkipProps {
  handleSkip: React.MouseEventHandler<HTMLButtonElement>;
}

export const Skip = ({ handleSkip }: SkipProps) => {
  return <button onClick={handleSkip}>Skip</button>;
};
