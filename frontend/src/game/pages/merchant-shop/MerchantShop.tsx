import { useState } from "react";
import { Container, TilingSprite } from "@pixi/react";
import BgPattern from "../../../assets/images/dark_wall.png";
import merchantsData from "../merchants/data/merchantsData";
import { getHero, setHero } from "../../../redux/reducers/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./components/Avatar";
import HeroInventorySlots from "./components/hero/HeroInventorySlots";
import ItemPreview from "../../components/items/item-preview/ItemPreview";
import HeroItems from "./components/hero/HeroItems";
import MerchantItems from "./components/merchant/MerchantItems";
import { merchantBuy, merchantSell } from "../../../client/appClient";
import fetchHero from "../../../utils/fetchers/fetchHero";
import { IItem } from "../../../interfaces/MainInterface";

interface IMerchantShop {
  currentMerchant: string;
}

interface ICurrentItem {
  itemData: {
    slotIndex: number;
    item: any;
  };
  action: "BUY" | "SELL";
}

function MerchantShop({ currentMerchant }: IMerchantShop) {
  const [merchantData] = useState<any>(
    merchantsData.find((el) => el.name === currentMerchant)
  );
  const [currentItem, setCurrentItem] = useState<ICurrentItem | null>();
  const hero: any = useSelector(getHero)!;

  const isMerchantInterested = (item: IItem, merchant: any) => {
    const itemType = item.type;
    const itemSubType = item.subType;
    const itemArmorType = item?.armorType;
    const typesToCheck = [itemType, itemSubType, itemArmorType];
    return merchant.interestedIn.some((item: any) => typesToCheck.includes(item));
  };

  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
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
    if (response.status !== 200) return console.log(response.data);
    setCurrentItem(null);
    fetchHero(updateHero);
  };

  const handleBuyItem = async () => {
    const dataToSend = {
      merchantName: currentMerchant.toLowerCase(),
      slotIndex: currentItem?.itemData.slotIndex!,
    };
    const response = await merchantBuy(dataToSend);
    if (response.status !== 200) return console.log(response.data);
    setCurrentItem(null);
    fetchHero(updateHero);
  };

  const handleAction = () => {
    if (currentItem?.action === "BUY") handleBuyItem();
    else if (currentItem?.action === "SELL") handleSellItem();
  };

  return (
    <Container position={[0, 2]}>
      <TilingSprite
        image={BgPattern}
        width={1315}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
      <Container position={[60, 170]}>
        <Avatar image={hero.avatar} name="You" />
        <HeroInventorySlots />
        <HeroItems inventory={hero.inventory} setCurrentItem={setCurrentItem} />
      </Container>

      {currentItem && (
        <ItemPreview
          position={[495, 80]}
          itemData={currentItem.itemData.item}
          value={getItemValue()}
          action={currentItem.action}
          handleAction={handleAction}
        />
      )}

      {currentMerchant && (
        <Container position={[835, 170]}>
          <Avatar image={merchantData.image} name={merchantData.name} />
          <HeroInventorySlots />
          <MerchantItems
            items={hero.merchantsItems[`${currentMerchant.toLowerCase()}`]}
            setCurrentItem={setCurrentItem}
          />
        </Container>
      )}
    </Container>
  );
}

export default MerchantShop;
