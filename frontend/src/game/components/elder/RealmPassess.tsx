import { Container, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { realmsData } from '../../../data/realms/data/realmsData';

const realmPassessData = [
  {
    name: "Caverns of Echoes",
    value: "CAVERNS",
    image: "https://i.ibb.co/PhRPFFT/crypt-orb.png",
    x: 251 / 2
  },
  {
    name: "Crypt",
    value: "CRYPT",
    image: "https://i.ibb.co/PhRPFFT/crypt-orb.png",
    x: 75 / 2 
  },
];

const RealmPassComponent = ({ data, index, realm, setRealm }: any) => {
  return (
    <Container
      position={[300 * index, 0]}
      interactive
      cursor="pointer"
      onpointertap={() => setRealm(realmsData(data.value))}
    >
      <Text
        text={data.name}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            letterSpacing: 1,
            fontSize: 28,
            fill: realm.value === data.value ? `#BC330C` : "#BCBCBC",
          })
        }
      />
      <Sprite
        image={data.image}
        position={[data.x, 40]}
        anchor={[0.5, 0]}
        height={70}
        width={70}
      />
    </Container>
  );
};

function RealmPassess({ realm, setRealm }: any) {
    return (
        <Container position={[0, 250]}>
            {realmPassessData.map((el: any, index: number) => {
                return (
                  <RealmPassComponent
                    data={el}
                    realm={realm}
                    setRealm={setRealm}
                    index={index}
                    key={`pass_` + index}
                  />
                );
            })}
        </Container>
    );
}

export default RealmPassess;