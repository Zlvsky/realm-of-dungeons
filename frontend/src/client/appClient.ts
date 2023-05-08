import { signUpService, signUpInterface } from "./services/auth/registerService";
import { signInInterface, signInService } from "./services/auth/loginService";
import { creaeteCharacterInterface, createCharacterService } from "./services/characters/createCharacterService";
import { getCharactersService } from "./services/characters/getCharactersService";
import { getUserCharacterService } from "./services/characters/getUserCharacterService";
import { updateEquipmentInterface, updateEquipmentService } from "./services/game/equipment/updateEquipmentService";
import { updateInventoryInterface, updateInventoryService } from "./services/game/equipment/updateInventoryService";

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

export async function updateEquipment(body: updateEquipmentInterface) {
  return await updateEquipmentService(body);
}

export async function updateInventory(body: updateInventoryInterface) {
  return await updateInventoryService(body);
};