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

// REGISTER AND LOGIN
export async function register(body: signUpInterface) {
    return await signUpService(body);
}

export async function login(body: signInInterface) {
  return await signInService(body);
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