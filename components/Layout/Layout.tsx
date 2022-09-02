import Image from 'next/image';
import React from 'react';
import { StyledWrapper } from './Layout.styled';
import { Navigation } from '../Navigation/Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
      <Navigation />
      <StyledWrapper>{children}</StyledWrapper>
    </>
  );
};
