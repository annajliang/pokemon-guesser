import { StyledLabel } from './Label.styled';

interface LabelProps {
  forValue: string;
  label: string;
}

export const Label = ({ forValue, label }: LabelProps) => {
  return <StyledLabel htmlFor={forValue}>{label}</StyledLabel>;
};
