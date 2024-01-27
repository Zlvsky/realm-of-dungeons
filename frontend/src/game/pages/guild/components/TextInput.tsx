import { Input } from '@pixi/ui';
import { Graphics } from 'pixi.js';

const generateTextInput = (ref: any) => {
  const input = new Input({
    bg: new Graphics()
      .drawRoundedRect(0, 0, 320, 70, 0 + 5)
      .beginFill("#2e2e2e")
      .drawRoundedRect(
        5,
        5,
        320 - 5 * 2,
        70 - 5 * 2,
        11
      ),
    textStyle: {
      fill: "#000000",
      fontSize: 20,
      fontWeight: "bold",
    },
    placeholder: "Siema"
  });

  input.position.set(115, 120)
  
  ref.current.addChild(input);
  console.log(ref);
};

export default generateTextInput;