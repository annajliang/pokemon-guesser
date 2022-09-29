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

export const getPokemonNameId = (results: PokemonProps[], gen: number) => {
  return results.map((result: PokemonProps) => {
    return {
      name: getReformattedName(result.name),
      id: getPokemonId(result.url),
      gen,
    };
  });
};

export const getPokemonIds = (results: PokemonProps[]) => {
  return results.map((result: PokemonProps, i) => {
    return i;
  });
};

export const calcPoints = (gen: number) => {
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
