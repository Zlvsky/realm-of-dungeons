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
import { IQuestActionAttack, battleActionAttackService } from "./services/battle/battleActionAttackService";
import { questEnemyTurnService } from "./services/game/quests/enemy/questEnemyTurnService";
import { questBattleEndService } from "./services/game/quests/questBattleEndService";
import { templeHealService } from "./services/game/temple/templeHealService";
import { templeRenewService } from "./services/game/temple/templeRenewService";
import { IUpdateStatistics, updateStatisticsService } from "./services/game/hero/updateStatisticsService";
import { getUserDetailsService } from "./services/user/getUserDetailsService";
import { IMerchantBuy, merchantBuyService } from "./services/game/merchants/merchantBuyService";
import { IMerchantSell, merchantSellService } from "./services/game/merchants/merchantSellService";
import { changeRealmService } from "./services/game/realms/changeRealmService";
import { unlockRealmService } from "./services/game/realms/unlockRealmService";
import { trainerTrainService } from "./services/game/trainers/trainerTrainService";
import { trainerFeeService } from "./services/game/trainers/trainerFeeService";
import { startDungeonBattleService } from "./services/game/dungeons/startDungeonBattleService";
import { getDungeonEnemiesService } from "./services/game/dungeons/getDungeonEnemies";
import { battleActionPotionService } from "./services/battle/battleActionPotionService";
import { dungeonEnemyTurnService } from "./services/game/dungeons/enemy/dungeonEnemyTurnService";
import { dungeonBattleEndService } from "./services/game/dungeons/dungeonBattleEndService";
import { rankingService } from "./services/game/ranking/rankingService";
import { characterPreviewService } from "./services/game/ranking/characterPreviewService";
import { createGuildService } from "./services/game/guild/createGuildService";
import { guildInvitesService } from "./services/game/guild/guildInvitesService";
import { guildsListService } from "./services/game/guild/guildsListService";
import { guildRequestService } from "./services/game/guild/guildRequestService";
import { guildJoinService } from "./services/game/guild/guildJoinService";
import { guildInviteDeclineService } from "./services/game/guild/guildInviteDeclineService";

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

// BATTLE
export async function battleActionPotionRequest(battleType: "QUEST" | "DUNGEON") {
  return await battleActionPotionService(battleType);
}

export async function battleActionAttack(body: IQuestActionAttack) {
  return await battleActionAttackService(body);
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

export async function questEnemyTurn() {
  return await questEnemyTurnService();
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

// TRAINERS
export async function trainerTrainRequest(stat: string) {
  return await trainerTrainService(stat);
};

export async function trainerFeeRequest(stat: string) {
  return await trainerFeeService(stat);
};

// DUNGEONS

export async function startDungeonBattleRequest() {
  return await startDungeonBattleService();
}

export async function getDungeonEnemiesRequest() {
  return await getDungeonEnemiesService();
}

export async function dungeonEnemyTurn() {
  return await dungeonEnemyTurnService();
}

export async function dungeonBattleEnd() {
  return await dungeonBattleEndService();
}

// RANKING

export async function rankingRequest(currentPage: number) {
  return await rankingService(currentPage)
}

export async function characterPreviewRequest(characterId: string) {
  return await characterPreviewService(characterId);
}

// GUILD

export async function createGuildRequest(guildName: string) {
  return await createGuildService(guildName);
}

export async function guildInvitesRequest() {
  return await guildInvitesService();
}

export async function guildsListRequest(currentPage: number) {
  return await guildsListService(currentPage);
}

export async function guildRequestRequest(guildId: string) {
  return await guildRequestService(guildId);
}

export async function guildJoinRequest(guildId: string) {
  return await guildJoinService(guildId);
}

export async function guildInviteDeclineRequest(guildId: string) {
  return await guildInviteDeclineService(guildId);
}
