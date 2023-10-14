import { signUpService, signUpInterface } from "./services/auth/registerService";
import { signInInterface, signInService } from "./services/auth/loginService";
import { creaeteCharacterInterface, createCharacterService } from "./services/characters/createCharacterService";
import { getCharactersService } from "./services/characters/getCharactersService";
import { getUserCharacterService } from "./services/characters/getUserCharacterService";
import {
  updateInventoryToEquipmentInterface,
  updateInventoryToEquipmentService,
} from "./services/game/equipment/updateInventoryToEquipmentService";
import {
  updateInventoryToInventoryInterface,
  updateInventoryToInventoryService,
} from "./services/game/equipment/updateInventoryToInventoryService";
import { updateEquipmentToInventoryInterface, updateEquipmentToInventoryService } from "./services/game/equipment/updateEquipmentToInventoryService";
import { updateActiveQuestInterface, updateActiveQuestService } from "./services/game/quests/updateActiveQuestService";
import { clearActiveQuestService } from "./services/game/quests/clearActiveQuestService";
import { startQuestBattleService } from "./services/game/quests/startQuestBattleService";
import { IQuestActionAttack, questActionAttackService } from "./services/game/quests/actions/questActionAttackService";
import { enemyTurnService } from "./services/game/quests/enemy/enemyTurnService";
import { questBattleEndService } from "./services/game/quests/questBattleEndService";
import { templeHealService } from "./services/game/temple/templeHealService";
import { templeRenewService } from "./services/game/temple/templeRenewService";
import { IUpdateStatistics, updateStatisticsService } from "./services/game/hero/updateStatisticsService";
import { getUserDetailsService } from "./services/user/getUserDetailsService";
import { IMerchantBuy, merchantBuyService } from "./services/game/merchants/merchantBuyService";
import { IMerchantSell, merchantSellService } from "./services/game/merchants/merchantSellService";
import { questActionPotionService } from "./services/game/quests/actions/questActionPotionService";
import { changeRealmService } from "./services/game/realms/changeRealmService";
import { unlockRealmService } from "./services/game/realms/unlockRealmService";

// REGISTER AND LOGIN
export async function register(body: signUpInterface) {
    return await signUpService(body);
}

export async function login(body: signInInterface) {
  return await signInService(body);
}

// USER
export async function getUserDetails() {
  return await getUserDetailsService();
}

// CHARACTERS
export async function createCharacter(body: creaeteCharacterInterface) {
  return await createCharacterService(body);
}

export async function getCharacters() {
  return await getCharactersService();
}

export async function getUserCharacter(id: string) {
  return await getUserCharacterService(id)
}

// HERO
export async function updateInventoryToEquipment(
  body: updateInventoryToEquipmentInterface
) {
  return await updateInventoryToEquipmentService(body);
}

export async function updateInventoryToInventory(
  body: updateInventoryToInventoryInterface
) {
  return await updateInventoryToInventoryService(body);
};

export async function updateEquipmentToInventory(
  body: updateEquipmentToInventoryInterface
) {
  return await updateEquipmentToInventoryService(body);
}

export async function updateStatistics(body: IUpdateStatistics) {
  return await updateStatisticsService(body);
}

// QUESTS
export async function updateActiveQuest(body: updateActiveQuestInterface) {
  return await updateActiveQuestService(body);
};

export async function clearActiveQuest() {
  return await clearActiveQuestService();
}

export async function startQuestBattle() {
  return await startQuestBattleService();
}

export async function questActionAttack(body: IQuestActionAttack) {
  return await questActionAttackService(body);
}

export async function questActionPotion() {
  return await questActionPotionService();
}

export async function questEnemyTurn() {
  return await enemyTurnService();
}

export async function questBattleEnd() {
  return await questBattleEndService();
}

// TEMPLE
export async function templeHeal() {
  return await templeHealService();
}

export async function templeRenew() {
  return await templeRenewService();
}

// PORTALS
export async function changeRealmRequest(realm: string) {
  return await changeRealmService(realm);
}

export async function unlockRealmRequest() {
  return await unlockRealmService();
}

// MERCHANTS
export async function merchantBuy(body: IMerchantBuy) {
  return await merchantBuyService(body);
};

export async function merchantSell(body: IMerchantSell) {
  return await merchantSellService(body);
};