import Link from 'next/link';
import { StyledBlockLink } from './BlockLink.styled';

interface ButtonLinkProps {
  label: string;
  onClick?: () => void;
  href: string;
}

export const BlockLink = ({ label, onClick, href }: ButtonLinkProps) => {
  return (
    <Link href={`${href}`} passHref>
      <StyledBlockLink onClick={onClick}>{label}</StyledBlockLink>
    </Link>
  );
};
