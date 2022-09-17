import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { StyledSound, StyledSoundIcon } from './Sound.styled';
import { startGameAudioState } from '../../recoil';
import Image from 'next/image';

interface SoundIconProps {
  isSoundOn: boolean;
  setIsSoundOn: (param: boolean) => void;
}

export const SoundIcon = ({ isSoundOn, setIsSoundOn }: SoundIconProps) => {
  const startGameAudio = useRecoilValue(startGameAudioState);

  return (
    <StyledSound
      onClick={() => {
        startGameAudio?.pause();
        setIsSoundOn(!isSoundOn);
      }}
    >
      <StyledSoundIcon>
        <Image
          src={`/assets/${isSoundOn ? 'soundOn' : 'soundOff'}.svg`}
          alt=""
          width={25}
          height={25}
          priority
        />
      </StyledSoundIcon>
      {isSoundOn ? 'On' : 'Off'}
    </StyledSound>
  );
};
