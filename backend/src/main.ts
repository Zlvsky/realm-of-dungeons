require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";
import https from "https";
import bodyParser from "body-parser";

import { loginUser } from "./controllers/account/login";
import { createUser } from "./controllers/account/register";
import { createCharacter, getCharacterById, getUserCharacters } from "./controllers/account/characters";
import { updateInventoryToEquipment } from "./controllers/game/hero/heroInventoryToEquipment";
import { addItem } from "./controllers/game/items/addItem";
import { updateInventory } from "./controllers/game/hero/heroInventory";
import { updateEquipmentToInventory } from "./controllers/game/hero/heroEquipmentToInventrory";
import { clearActiveQuest, startQuestBattle, updateActiveQuest } from "./controllers/game/quests/quests";
import { questEnemyTurn } from "./controllers/game/quest-battle/questEnemyTurn";
import { questBattleEnd } from "./controllers/game/quest-battle/questBattleEnd";
import { templeHealing } from "./controllers/game/temple/templeHealing";
import { templeHealRenew } from "./controllers/game/temple/templeHealRenew";
import { updateStatistics } from "./controllers/game/hero/statistics/updateStatistics";
import { getUserDetails } from "./controllers/account/getUser";
import initInsert from "./mongoInserts.ts/initInsert";
import scheduledRefreshMerchantItems from "./scheduled-tasks/merchants/refreshMerchantsItems";
import { merchantBuyItem } from "./controllers/game/merchants/merchantBuyItem";
import { merchantSellItem } from "./controllers/game/merchants/merchantSellItem";
import { changeRealm } from "./controllers/game/realms/changeRealm";
import { unlockRealm } from "./controllers/game/realms/unlockRealm";
import { trainStatistic } from "./controllers/game/trainers/trainStatistic";
import { getTrainingFee } from "./controllers/game/trainers/getTrainingFee";
import { getRealmDungeonEnemies, startDungeonBattle } from "./controllers/game/dungeon/dungeon";
import { characterUsePotion } from "./controllers/game/battle/characterUsePotion";
import { characterAttack } from "./controllers/game/battle/characterAttack";
import { dungeonEnemyTurn } from "./controllers/game/dungeon-battle/dungeonEnemyTurn";
import { dungeonBattleEnd } from "./controllers/game/dungeon-battle/dungeonBattleEnd";
import { getRanking } from "./controllers/game/ranking/ranking";
import { getCharacterPreview } from "./controllers/game/ranking/characterPreview";

const uri = process.env.MONGO_CONNECTION_URL;
// const sslCert = process.env.CERT_PATH;
const sslCert = undefined;
// const sslKey = process.env.KEY_PATH;
const sslKey = undefined;

if(!uri) throw new Error(".env file is not created")

mongoose.set("strictQuery", false);
mongoose.connect(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
mongoose.connection.on("connected", function () {
  console.log("connected to mongo");
  scheduledRefreshMerchantItems();
  // initInsert(); // insert necessery data to database
});

const app = express();

// CORS SETUP
app.use(cors());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// LOGIN AND REGISTER
app.post("/api/register", createUser);
app.post("/api/login", loginUser);

// USER INFO
app.get("/api/user/details", getUserDetails);

// USER ACTIONCS
app.post("/api/user/createCharacter", createCharacter);
app.get("/api/user/getCharacter/:id", getCharacterById);
app.get("/api/user/getUserCharacters", getUserCharacters);

// HERO ACTIONS
// -- EQUIPMENT AND INVENTORY
app.post("/api/hero/equipment/update", updateInventoryToEquipment);
app.post("/api/hero/inventory/update", updateInventory);
app.post("/api/hero/equipmenttoinventory/update", updateEquipmentToInventory);

// -- STATISTICS
// app.post("/api/hero/update/statistics", updateStatistics);

// ITEMS ACTIONS
// app.post("/api/create/item", addItem);

// PORTALS
app.post("/api/realm/change", changeRealm);
app.post("/api/realm/unlock", unlockRealm);

// QUESTS ACTIONS
app.post("/api/quest/updateActiveQuest", updateActiveQuest);
app.post("/api/quest/clearActiveQuest", clearActiveQuest);
app.post("/api/quest/startQuestBattle", startQuestBattle);

// QUEST BATTLE
app.post("/api/quest/enemyTurn", questEnemyTurn);
app.post("/api/quest/battleEnd", questBattleEnd);

// DUNGEONS
app.post("/api/dungeon/startBattle", startDungeonBattle);
app.get("/api/dungeon/enemies/:characterId", getRealmDungeonEnemies);

// DUNGEON BATTLE
app.post("/api/dungeon/enemyTurn", dungeonEnemyTurn);
app.post("/api/dungeon/battleEnd", dungeonBattleEnd);

// BATTLE
app.post("/api/battle/action/potion", characterUsePotion);
app.post("/api/battle/action/attack", characterAttack);

// TEMPLE
app.post("/api/temple/heal", templeHealing);
app.post("/api/temple/renew", templeHealRenew);

// MERCHANTS
app.post("/api/merchant/buy", merchantBuyItem);
app.post("/api/merchant/sell", merchantSellItem);

// TRAINERS
app.post("/api/trainer/train", trainStatistic);
app.post("/api/trainer/fee", getTrainingFee);

// RANKING
app.get("/api/ranking/:currentPage", getRanking);
app.get("/api/character/preview/:characterId", getCharacterPreview);

// ADMIN PANEL - todo
// app.use(express.static(path.join(__dirname, "admin-panel", "dist")));
app.get("/", (_, res) => {
  res.send("Server running:)");
});

const port = process.env.PORT || 8080;

// if ssl configured start server on https
if (sslCert && sslKey) {
  const options = {
    key: fs.readFileSync(sslKey),
    cert: fs.readFileSync(sslCert),
  };
  https.createServer(options, app).listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
// else start server default on http 
} else {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}




export default app;