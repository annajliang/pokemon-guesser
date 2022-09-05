import Image from 'next/image';
import {
  StyledRanking,
  StyledPlayer,
  StyledMedal,
  StyledScore,
} from './Leaderboard.styled';

export const Leaderboard = () => {
  return (
    <>
      <h2>Leaderboard</h2>
      <StyledRanking>
        <StyledPlayer>
          {/* TODO: Use hardcoded data for now, remove later and use data from DB */}
          <div>
            <p>1</p>
            <StyledMedal>
              <Image
                src="/assets/goldMedal.svg"
                alt=""
                width={25}
                height={25}
                priority
              />
            </StyledMedal>
            <p>iamwinner</p>
          </div>
          <StyledScore>100</StyledScore>
        </StyledPlayer>
        <StyledPlayer>
          <div>
            <p>2</p>
            <StyledMedal>
              <Image
                src="/assets/silverMedal.svg"
                alt=""
                width={25}
                height={25}
                priority
              />
            </StyledMedal>
            <p>billy bob</p>
          </div>
          <StyledScore>90</StyledScore>
        </StyledPlayer>
        <StyledPlayer>
          <div>
            <p>3</p>
            <StyledMedal>
              <Image
                src="/assets/bronzeMedal.svg"
                alt=""
                width={25}
                height={25}
                priority
              />
            </StyledMedal>
            <p>soreloser</p>
          </div>
          <StyledScore>50</StyledScore>
        </StyledPlayer>
      </StyledRanking>
    </>
  );
};
