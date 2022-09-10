import { useRecoilState, useSetRecoilState } from 'recoil';
import { ChangeEvent } from 'react';
import { chosenGenState, allPokemonState } from '../../recoil';
import { StyledDropdownContainer, StyledDropdown } from './Dropdown.styled';

export const Dropdown = () => {
  const [chosenGen, setChooseGen] = useRecoilState(chosenGenState);
  const setallPokemon = useSetRecoilState(allPokemonState);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChooseGen(e.target.value);

    if (chosenGen !== e.target.value) {
      setallPokemon([]);
    }
  };

  return (
    <StyledDropdownContainer>
      <StyledDropdown name="generation" id="generation" onChange={handleChange}>
        <option value="1">Gen 1</option>
        <option value="2">Gen 2</option>
        <option value="all">All</option>
      </StyledDropdown>
    </StyledDropdownContainer>
  );
};
