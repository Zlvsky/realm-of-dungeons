import { getAttackDamage } from "../utils/getAttackDamage";
import hero from "./mockedHero";

const getAttackDamageToEnemy = (attackPower: string) => {
  let attackDamage = undefined;
  const minDmg = hero.updatedValues.minDmg; // 5.7
  const maxDmg = hero.updatedValues.maxDmg; // 11.3

  switch (attackPower) {
    case "low":
      attackDamage = getAttackDamage(minDmg, maxDmg, 100, 0.5);
      break;
    case "medium":
      attackDamage = getAttackDamage(minDmg, maxDmg, 100, 0.75);
      break;
    case "strong":
      attackDamage = getAttackDamage(minDmg, maxDmg, 100, 1);
      break;
  }
  if (!attackDamage && attackDamage !== 0) return false;

  return attackDamage;
}

const testCharacterDamage = () => {
    describe("hero attack damage", () => {
      it("testing hero attack damage", async () => {
        let lowSum = 0;
        let mediumSum = 0;
        let strongSum = 0;

        for (let i = 0; i < 10; i++) {
          const lowHeroDmg: any = getAttackDamageToEnemy("low");
          const mediumHeroDmg: any = getAttackDamageToEnemy("medium");
          const strongHeroDmg: any = getAttackDamageToEnemy("strong");
          const characterAttacks = {
            low: lowHeroDmg,
            medium: mediumHeroDmg,
            strong: strongHeroDmg,
          };
          lowSum += lowHeroDmg;
          mediumSum += mediumHeroDmg;
          strongSum += strongHeroDmg;

          console.log("-----characterAttacks-----");
          console.table(characterAttacks);
          console.log("-----characterAttacks-----");
        }

        const characterAvarageDmg = {
          averageLow: lowSum / 10,
          averageMedium: mediumSum / 10,
          averageStrong: strongSum / 10,
        };

        console.table(characterAvarageDmg);

        return true;
      });
    });
}

// testCharacterDamage();


const testMobDamage = (damage: number) => {
  describe(`mob attack damage with: ${damage}dmg`, () => {
    it("testing mob damage", async () => {
      let dmgSum = 0;
      let highestDmg = 0;
      let lowestDmg = 99999;

      // const heroArmor = hero.updatedValues.armor;
      const heroArmor = 20;
      

      console.log("heroArmor: ", heroArmor);

      for (let i = 0; i < 100; i++) {
        const mobDmg = getAttackDamage(damage, damage, 100, 1, heroArmor);

        dmgSum += mobDmg;

        if (mobDmg > highestDmg) highestDmg = mobDmg;
        if (mobDmg < lowestDmg) lowestDmg = mobDmg;
      }

      const mobAvarageDmg = dmgSum / 100;

      console.log("-----mob avarage damage-----", mobAvarageDmg);
      console.log("-----mob highest damage-----", highestDmg);
      console.log("-----mob lowest damage-----", lowestDmg);

    })
  })
}

testMobDamage(8);