import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { showPokemonState, timerState } from '../../utils/globalState';

export const Timer = () => {
  const [timer, setTimer] = useRecoilState(timerState);
  const showPokemon = useRecoilValue(showPokemonState);

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (timer > 0) {
      countdown = setTimeout(() => setTimer((timer as number) - 1), 1000);
    }

    return () => {
      clearTimeout(countdown);
    };
  }, [timer, setTimer]);

  return (
    <div>
      <h3>Timer</h3>
      <p>{showPokemon ? 'Paused' : timer}</p>
    </div>
  );
};
