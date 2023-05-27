import { useRecoilState, useSetRecoilState } from 'recoil';
import { ChangeEvent } from 'react';
import { chosenGenState, allPokemonState } from '../../recoil';
import { StyledDropdownContainer, StyledDropdown } from './Dropdown.styled';

export const Dropdown = () => {
  const [chosenGen, setChooseGen] = useRecoilState(chosenGenState);
  const setAllPokemon = useSetRecoilState(allPokemonState);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChooseGen(e.target.value);

    if (chosenGen !== e.target.value) {
      setAllPokemon([]);
    }
  };

  return (
    <StyledDropdownContainer>
      <StyledDropdown name="generation" id="generation" onChange={handleChange}>
        <option value="1">Gen 1</option>
        <option value="2">Gen 2</option>
        <option value="3">Gen 3</option>
        <option value="4">Gen 4</option>
        <option value="5">Gen 5</option>
        <option value="6">Gen 6</option>
        <option value="7">Gen 7</option>
        <option value="8">Gen 8</option>
        <option value="9">Gen 9</option>
        <option value="all">All</option>
      </StyledDropdown>
    </StyledDropdownContainer>
  );
};
