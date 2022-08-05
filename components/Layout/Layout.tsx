import Image from 'next/image';
import { StyledWrapper } from './Layout.styled';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Image
        src={`/assets/desktopBg.png`}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
        priority
      />
      <StyledWrapper>{children}</StyledWrapper>
    </>
  );
};
