export const calcDamage = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const damageWithArmorReduction = (damage: number, armor?: number) => {
  if(!armor || armor === 0) return Math.round(damage);
  const minReduction = armor / 2;
  const maxReduction = armor - 1;
  const damageReduction = (Math.random() * maxReduction) + minReduction;

  if (damageReduction > damage / 2) return Math.round(damage / 2);

  const totalDamage = Math.round(damage - damageReduction);
  if (totalDamage < 0) return 0;
  return totalDamage;
}

export const damageWithCrit = (damage: number, critChance: number, maxDmg: number, powerIndex: number, armor?: number) => {
  const randomNumber = Math.random() * 100;
  if (100 - critChance > randomNumber) return {
    dmg: damage,
    crit: false,
    missed: false,
    evaded: false,
  };
  const critBaseDmg = damageWithArmorReduction(maxDmg * powerIndex, armor)
  return {
    dmg: Math.ceil(critBaseDmg * 1.5),
    crit: true,
    missed: false,
    evaded: false,
  };
}

export const getAttackDamage = (
  minDmg: number,
  maxDmg: number,
  chanceToHit: number,
  powerIndex: number,
  armor?: number,
  critChance?: number,
) => {
  let minDamage = minDmg;
  if (minDamage === maxDmg) minDamage = Math.round(minDmg * 0.7);

  const randomNumber = Math.random() * 100;
  
  // ATTACK MISSED
  if (100 - chanceToHit > randomNumber) return {
    dmg: 0,
    missed: true,
    evaded: false,
    crit: false,
  }

  const damageOutput = calcDamage(minDamage, maxDmg);

  // ATTACK NOT MISSED BUT DAMAGE WAS LOW
  if (damageOutput > 0 && damageOutput < 1) return {
    dmg: 1,
    crit: false,
    missed: false,
    evaded: false,
  };

  const damage = damageOutput * powerIndex;
  const damageAfterReduction = damageWithArmorReduction(damage, armor);

  // ATTACK NOT MISSED BUT HIT WAS EVADED
  if (damageAfterReduction === 0) {
    return {
      dmg: 0,
      crit: false,
      evaded: true,
      missed: false,
    };
  }

  // RETURN HIT WITH OPPORTUNITY WITH CRIT
  if (critChance) return damageWithCrit(damageAfterReduction, critChance, maxDmg, powerIndex, armor);

  // IF NO CRIT RETURN DAMAGE
  return {
    dmg: damageAfterReduction,
    crit: false,
    missed: false,
    evaded: false,
  };
};
