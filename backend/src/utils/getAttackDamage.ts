export const calcDamage = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const damageWithArmorReduction = (damage: number, armor?: number) => {
  if(!armor || armor === 0) return Math.round(damage);
  const minReduction = armor / 2;
  const maxReduction = armor - 1;
  const damageReduction = (Math.random() * maxReduction) + minReduction;
  const totalDamage = damage - damageReduction;
  return Math.round(totalDamage);
}

export const getAttackDamage = (
  minDmg: number,
  maxDmg: number,
  chanceToHit: number,
  powerIndex: number,
  armor?: number,
) => {
  const randomNumber = Math.random() * 100;
  if (100 - chanceToHit > randomNumber) return 0;
  const damageOutput = Math.floor(Math.random() * maxDmg) + minDmg;
  const damage = damageOutput * powerIndex;
  return damageWithArmorReduction(damage, armor);
};
