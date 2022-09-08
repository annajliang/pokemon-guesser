import Image from 'next/image';
import { leaderboardState } from '../../../recoil';
import { useRecoilValue } from 'recoil';
import {
  StyledRanking,
  StyledPlayer,
  StyledMedal,
  StyledScore,
  StyledText,
} from './Leaderboard.styled';

export const Leaderboard = () => {
  const leaderboard = useRecoilValue(leaderboardState);

  return (
    <>
      <h2 id="modalHeading">Leaderboard</h2>
      {leaderboard.length ? (
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
      ) : (
        <StyledText>
          None yet. Be the first to get on the leaderboard!
        </StyledText>
      )}
    </>
  );
};
