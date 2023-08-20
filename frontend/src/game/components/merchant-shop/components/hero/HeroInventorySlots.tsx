import { Container } from '@pixi/react';
import { shopHeroInventorySlots } from '../../../hero/helpers/slots';
import InventorySlotShop from '../InventorySlotShop';

function HeroInventorySlots() {
    return (
        <Container position={[0, 0]}>
            {shopHeroInventorySlots.map((slot, index) => (
                <InventorySlotShop x={slot.x} y={slot.y} key={index} />
            ))}
        </Container>
    );
}

export default HeroInventorySlots;