const getRandomInclusive = (min: number, max: number): number => {
  if (min > max) {
    throw new Error("[getRandomInclusive] min is big number than max.");
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default getRandomInclusive;
