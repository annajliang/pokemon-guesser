export const getRandomIndex = (arr: any[]) => {
  console.log('index', Math.floor(Math.random() * arr.length));
  return arr[Math.floor(Math.random() * arr.length)];
};
