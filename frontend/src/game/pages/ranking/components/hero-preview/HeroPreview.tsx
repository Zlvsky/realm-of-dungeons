import { Container } from '@pixi/react';
import { useState, useEffect } from "react";
import { characterPreviewRequest } from '../../../../../client/appClient';
import displayError from '../../../../../utils/notifications/errors';
import { useDispatch } from 'react-redux';
import HeroInfo from '../../../hero/components/HeroInfo';
import HeroStats from '../../../hero/components/HeroStats';
import { equipmentSlots } from '../../../hero/helpers/slots';
import EmpyEquipmentSlots from '../../../hero/components/EmpyEquipmentSlots';
import Item from '../../../../components/merchant/Item';
import { getEquipmentPosition } from '../../../hero/helpers/getEquipmentPosition';
import ItemSlot from '../../../hero/components/ItemSlot';

function HeroPreview({ heroId }: any) {
    const [heroData, setHeroData] = useState<any>(null);

    const dispatch = useDispatch();

    const fetchHeroPreview = async () => {
        const response = await characterPreviewRequest(heroId);
        if (response.status !== 200) return displayError(dispatch, response);
        setHeroData(response.data);
    }

    useEffect(() => {
        fetchHeroPreview();
    }, [heroId]);

    if (!heroData) return null;

    return (
      <Container position={[758, 100]}>
        <HeroInfo hero={heroData} />
        <HeroStats hero={heroData} />
        {equipmentSlots.map((position, index) => (
          <ItemSlot
            key={index}
            x={position.x}
            y={position.y}
            itemType={""}
            itemSubType={""}
            slotType={position.type}
          />
        ))}
        <EmpyEquipmentSlots heroEquipment={heroData.equipment} />
        {heroData.equipment.map((item: any, index: number) => {
          if (item.item !== null)
            return (
              <Item
                key={"equip" + index}
                itemData={item}
                itemPosition={getEquipmentPosition(item.type, item.type)}
                itemSpot={"EQUIPMENT"}
                anchor={0.5}
              />
            );
        })}
      </Container>
    );
}

export default HeroPreview;