export const calcDamage = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const damageWithArmorReduction = (damage: number, armor?: number) => {
  if(!armor || armor === 0) return Math.round(damage);
  const damageMultiplier = damage / ( damage / armor);
  const totalDamage = damage * damageMultiplier;
  return Math.round(totalDamage);
}

export const getAttackDamage = (
  heroDamage: number,
  chanceToHit: number,
  powerIndex: number,
  armor?: number,
) => {
  const randomNumber = Math.random() * 100;
  if (100 - chanceToHit > randomNumber) return 0;
  const damage = calcDamage(heroDamage / powerIndex, heroDamage);
  return damageWithArmorReduction(damage, armor);
};
