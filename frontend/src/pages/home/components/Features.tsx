import React from 'react';
import Header from '../../../components/common/text/Header';

const FeatureCol = ({header, description}: any) => {
    return (
      <div className="flex flex-col gap-2 items-start text-left font-sans">
        <h4 className="text-xl  font-semibold bg-gradient-to-b from-accent to-primaryLight text-transparent bg-clip-text">
          {header}
        </h4>
        <p className="text-secondary font-semibold font-sans text-lg">
          {description}
        </p>
      </div>
    );
}

const ActualFeatures = () => (
    <div className="max-w-6xl mx-auto flex flex-col items-center mt-20 mb-10">
        <Header>Features</Header>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-6 gap-10">
          <FeatureCol
            header="Multiple realms"
            description="Unlock new realms to access new quests, monsters and bossess!"
          />
          <FeatureCol
            header="Dungeon bossess"
            description="Defeat bossess from dungeons to get unique loot."
          />
          <FeatureCol
            header="Skill training"
            description="Train your skills to become more proficient with weapons."
          />
          <FeatureCol
            header="Merchants"
            description="Sell your loot and buy new items from various merchants."
          />
          <FeatureCol
            header="Turn-based combat"
            description="Fight with enemies in turn-based combat system"
          />
        </div>
      </div>
)
const FeaturesPlans = () => (
  <div className="max-w-6xl mx-auto flex flex-col items-center mt-20 mb-20">
    <Header>Plans for future</Header>
    <div className="grid grid-cols-2 md:grid-cols-3 mt-6 gap-10">
      <FeatureCol
        header="PvP Arena"
        description="Real time player vs. player arena and honor system."
      />
      <FeatureCol
        header="Guilds and Friends"
        description="Create guilds with your friends and conquer with others."
      />
      <FeatureCol
        header="Raids"
        description="Attempt to raids fighting powerful monsters with other players."
      />
      <FeatureCol
        header="Spells"
        description="Learn spells that will help you in combat."
      />
      <FeatureCol
        header="Daily activities"
        description="Random daily activities to complete and earn rewards"
      />
      <FeatureCol
        header="Character customization"
        description="Customize your character, collect rare avatars"
      />
      <FeatureCol
        header="Legendary loot"
        description="Gear up with legendary items dropped from bossess"
      />
      <FeatureCol
        header="Crafting"
        description="Train your profession and craft items from materials"
      />
      <FeatureCol header="Marketplace" description="Trade with other players" />
    </div>
  </div>
);

function Features() {
    return (
      <>
        <ActualFeatures />
        <FeaturesPlans />
      </>
    );
}

export default Features;