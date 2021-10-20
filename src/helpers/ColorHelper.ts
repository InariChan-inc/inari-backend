const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const getHSL = () => `hsl(${getRandom(25, 45)}, ${getRandom(50, 100)}%, ${getRandom(30, 60)}%)`;
