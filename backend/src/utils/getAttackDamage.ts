export const calcDamage = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const getAttackDamage = (
  heroDamage: number,
  chanceToHit: number,
  powerIndex: number
) => {
  const randomNumber = Math.random() * 100;
  if (100 - chanceToHit > randomNumber) return 0;
  const damage = calcDamage(heroDamage / powerIndex, heroDamage);
  return Math.round(damage);
};
