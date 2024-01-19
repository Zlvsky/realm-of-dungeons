import { Container, Sprite, Text } from '@pixi/react';
import { useState } from "react";
import { IItem } from '../../../../../interfaces/MainInterface';
import InfoPopup, { InfoPopupTextStyle } from '../../../../components/ui/InfoPopup';

interface IItemLoot {
    item: IItem
}

function ItemLoot({ item }: IItemLoot) {
    const [itemHovered, setItemHovered] = useState(false);

    const handleShowPopup = () => setItemHovered(true);
    const handleHidePopup = () => setItemHovered(false);

    const textStyle = InfoPopupTextStyle();

    const ItemValue = () => {
      if (!item?.armor === undefined && item.damage === undefined)
        return null;
      let valueText;
      if (item?.armor !== undefined)
        valueText = `Defense: ${item.armor}`;
      if (item?.damage !== undefined)
        valueText = `Damage: ${item.damage}`;
      return <Text text={valueText} y={50} style={textStyle} />;
    };

    const ItemRequiredLevel = () => {
      const requiredLevel = item?.requiredLevel;
      if (!requiredLevel) return null;
      return (
        <Text
          text={`Required level: ${requiredLevel}`}
          y={70}
          style={textStyle}
        />
      );
    };

    const ItemPrice = () => {
      const itemPrice = item?.value;
      if (!itemPrice) return null;
      return <Text text={`Value: ${itemPrice}`} y={100} style={textStyle} />;
    };

    return (
      <Container position={[870, 550]}>
        <Sprite
          image={item.image}
          width={60}
          height={60}
          x={0}
          y={-10}
          interactive={true}
          onpointerenter={handleShowPopup}
          onpointerleave={handleHidePopup}
        />
        <InfoPopup position={[30, -20]} show={itemHovered}>
          <Container>
            <Text text={item.name} style={textStyle} />
            <Text y={30} text={"Type: " + item.type} style={textStyle} />
            <ItemValue />
            <ItemRequiredLevel />
            <ItemPrice />
          </Container>
        </InfoPopup>
      </Container>
    );
}

export default ItemLoot;