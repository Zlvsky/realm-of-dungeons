import { useState, useEffect } from 'react';
import NpcPopup from '../../../components/ui/NpcPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getHero, setHero } from '../../../../redux/reducers/gameSlice';
import { IItem } from '../../../../interfaces/MainInterface';
import merchantsData from '../data/merchantsData';
import fetchHero from '../../../../utils/fetchers/fetchHero';
import { merchantBuy, merchantSell } from '../../../../client/appClient';
import displayError from '../../../../utils/notifications/errors';
import { Container, Text } from '@pixi/react';
import HeroInventorySlots from '../../../components/merchant/HeroInventorySlots';
import HeroItems from '../../../components/merchant/HeroItems';
import MerchantItems from '../../../components/merchant/MerchantItems';
import { TextStyle } from 'pixi.js';
import MerchantItemPreview from './MerchantItemPreview';

interface IMerchantShop {
  currentMerchant: any;
  setCurrentMerchant: Function;
}

interface ICurrentItem {
  itemData: {
    slotIndex: number;
    item: any;
  };
  action: "BUY" | "SELL";
}

const getTitle: any = (currentMerchant: any) => {
    switch (currentMerchant) {
      case "Armourer":
        return "Armory Store"
      case "Alchemist":
        return "Alchemy Store"
      case "Witch":
        return "Magic Shop"
    }
}

const getAvatar: any = (currentMerchant: any) => {
  switch (currentMerchant) {
    case "Armourer":
      return "armourer.jpg";
    case "Alchemist":
      return "alchemist.jpg";
    case "Witch":
      return "witch.jpg";
  }
};

function MerchantShop({ currentMerchant, setCurrentMerchant }: IMerchantShop) {
  const [currentItem, setCurrentItem] = useState<ICurrentItem | null>();
  const merchantData = merchantsData.find((el) => el.name === currentMerchant)
  
  const hero: any = useSelector(getHero)!;
  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const isMerchantInterested = (item: IItem, merchant: any) => {
    const itemType = item.type;
    const itemSubType = item.subType;
    const itemArmorType = item?.armorType;
    const typesToCheck = [itemType, itemSubType, itemArmorType];
    return merchant.interestedIn.some((item: any) =>
      typesToCheck.includes(item)
    );
  };

  const getItemValue = () => {
    const itemValue = currentItem?.itemData.item.value;
    if (currentItem?.action === "BUY") return itemValue;
    const isInterested = isMerchantInterested(
      currentItem?.itemData.item,
      merchantData
    );
    if (isInterested) return Math.round(itemValue * 0.6);
    return Math.round(itemValue * 0.3);
  };
  
  const handleSellItem = async () => {
    const dataToSend = {
      merchantName: currentMerchant,
      inventorySlot: currentItem?.itemData.slotIndex!,
    };
    const response = await merchantSell(dataToSend);
    if (response.status !== 200) return displayError(dispatch, response);
    setCurrentItem(null);
    fetchHero(updateHero);
  };

  const handleBuyItem = async () => {
    const dataToSend = {
      merchantName: currentMerchant.toLowerCase(),
      slotIndex: currentItem?.itemData.slotIndex!,
    };
    const response = await merchantBuy(dataToSend);
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
  };
  
  const handleAction = () => {
    if (currentItem?.action === "BUY") handleBuyItem();
    else if (currentItem?.action === "SELL") handleSellItem();
  };
    
  useEffect(() => {
    if (currentMerchant === "") setCurrentItem(null)
  }, [currentMerchant]);

  const inventoryStyle = new TextStyle({
    fontFamily: "Almendra",
    fontSize: 28,
    fill: "#ffffff",
    letterSpacing: 0,
  });

  if (currentMerchant === "") return null;
 
  return (
    <NpcPopup
      setTrigger={setCurrentMerchant}
      npc={getAvatar(currentMerchant)}
      title={getTitle(currentMerchant)}
    >
      <>
        <Text text={"Inventory"} style={inventoryStyle} x={0} y={260} />
        <HeroInventorySlots />
        <HeroItems inventory={hero.inventory} setCurrentItem={setCurrentItem} />
        {currentItem && (
          <MerchantItemPreview
            itemData={currentItem.itemData.item}
            value={getItemValue()}
            action={currentItem.action}
            handleAction={handleAction}
          />
        )}
        {currentMerchant && (
          <Container position={[640, 0]}>
            <Text text={"Merchant"} style={inventoryStyle} x={0} y={260} />
            <HeroInventorySlots />
            <MerchantItems
              items={hero.merchantsItems[`${currentMerchant.toLowerCase()}`]}
              setCurrentItem={setCurrentItem}
            />
          </Container>
        )}
      </>
    </NpcPopup>
  );
}

export default MerchantShop;