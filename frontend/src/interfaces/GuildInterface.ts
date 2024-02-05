export interface IGuild {
  name: string;
  leader: string;
  members: {
    title: "MEMBER" | "OFFICER" | "LEADER";
    characterId: string;
  }[];
  reputation: number;
  description: string;
  requests: string[];
  invites: string[];
  treasury: {
    gold: number;
  };
  statistics: {
    level: number;
    xpLevel: number;
    goldLevel: number;
  };
  chatLogs: {
    sender: string;
    message: string;
    timeStamp: Date;
  }[];
}


export interface GuildProp {
  guild: IGuild;
}