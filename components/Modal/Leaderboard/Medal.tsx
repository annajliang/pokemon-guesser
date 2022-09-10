import styled from 'styled-components';
import Image from 'next/image';

export const StyledMedal = styled.span`
  position: absolute;
  left: 26px;
`;

export const Medal = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <StyledMedal>
        <Image
          src="/assets/goldMedal.svg"
          alt=""
          width={25}
          height={25}
          priority
        />
      </StyledMedal>
    );
  }

  if (rank === 2) {
    return (
      <StyledMedal>
        <Image
          src="/assets/silverMedal.svg"
          alt=""
          width={25}
          height={25}
          priority
        />
      </StyledMedal>
    );
  }

  if (rank === 3) {
    return (
      <StyledMedal>
        <Image
          src="/assets/bronzeMedal.svg"
          alt=""
          width={25}
          height={25}
          priority
        />
      </StyledMedal>
    );
  }

  return <></>;
};
