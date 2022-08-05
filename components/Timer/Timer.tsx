import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { showPokemonState, timerState } from '../../utils/globalState';
import { StyledTimer, StyledClockIcon } from './Timer.styled';
import Image from 'next/image';

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
    <StyledTimer>
      <StyledClockIcon>
        <Image src="/assets/clock.svg" alt="" width={50} height={50} priority />
      </StyledClockIcon>
      <h3>Timer</h3>
      <p>{showPokemon ? 'Paused' : timer}</p>
    </StyledTimer>
  );
};
