import { Pokemon } from '../types';

export const getRandomIndex = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getPokemonId = (url: Pokemon['url']) => {
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

export const getPokemonNameId = (results: Pokemon[]) => {
  return results.map((result: Pokemon) => {
    return {
      name: getReformattedName(result.name),
      id: getPokemonId(result.url),
      gen: result.url && parseInt(result.url.split('/')[6]) <= 151 ? 1 : 2,
    };
  });
};

export const getPokemonIds = (results: Pokemon[]) => {
  return results.map((result: Pokemon, i) => {
    return i;
  });
};
