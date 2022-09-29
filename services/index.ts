import { PokemonProps } from '../types';

export const getcurrentIndex = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const getRandomItem = (arr: any[]) => {
  return arr[getcurrentIndex(arr)];
};

const getPokemonId = (url: PokemonProps['url']) => {
  const id = url?.split('/')[6];

  if (!id) {
    return;
  }

  if (parseInt(id) <= 9) {
    return '00' + id;
  }

  if (parseInt(id) >= 10 && parseInt(id) < 100) {
    return '0' + id;
  }

  return id;
};

const getReformattedName = (name: string) => {
  if (name === 'nidoran-f' || name === 'nidoran-m') {
    return 'Nidoran';
  }

  if (name === 'farfetchd') {
    return `Farfetch'd`;
  }

  if (name === 'mr-mime') {
    return 'Mr. Mime';
  }

  // capitalize first letter
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const calcGen = (i: number) => {
  const id = i + 1;
  if (id >= 1 && id <= 151) {
    return 1;
  }

  if (id >= 152 && id <= 251) {
    return 2;
  }

  if (id >= 252 && id <= 386) {
    return 3;
  }

  if (id >= 387 && id <= 493) {
    return 4;
  }

  if (id >= 494 && id <= 649) {
    return 5;
  }

  if (id >= 650 && id <= 721) {
    return 6;
  }

  if (id >= 722 && id <= 809) {
    return 7;
  }

  if (id >= 810 && id <= 905) {
    return 8;
  }
};

const getGen = (i: number) => {
  return calcGen(i);
};

export const getPokemonNameId = (
  results: PokemonProps[],
  gen: number | undefined
) => {
  return results.map((result: PokemonProps, i) => {
    return {
      name: getReformattedName(result.name),
      id: getPokemonId(result.url),
      gen: gen === undefined ? getGen(i) : gen,
    };
  });
};

export const getPokemonIds = (results: PokemonProps[]) => {
  return results.map((result: PokemonProps, i) => {
    return i;
  });
};

export const calcPoints = (gen: number | undefined) => {
  switch (gen) {
    case 1:
      return 2;
    case 2:
      return 4;
    case 3:
      return 6;
    case 4:
      return 8;
    case 5:
      return 10;
    case 6:
      return 12;
    case 7:
      return 14;
    case 8:
      return 16;
    default:
      return 0;
  }
};
