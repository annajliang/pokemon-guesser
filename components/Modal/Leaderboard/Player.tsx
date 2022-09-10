import { Medal } from './Medal';
import { StyledPlayer, StyledScore } from './Player.styled';

export const Player = () => {
  return (
    <>
      <StyledPlayer>
        <div>
          <p>1</p>
          <Medal rank={1} />
          <p>iamwinner</p>
        </div>
        <StyledScore>100</StyledScore>
      </StyledPlayer>
      <StyledPlayer>
        <div>
          <p>2</p>
          <Medal rank={2} />
          <p>billy bob</p>
        </div>
        <StyledScore>90</StyledScore>
      </StyledPlayer>
      <StyledPlayer>
        <div>
          <p>3</p>
          <Medal rank={3} />
          <p>soreloser</p>
        </div>
        <StyledScore>50</StyledScore>
      </StyledPlayer>
    </>
  );
};
