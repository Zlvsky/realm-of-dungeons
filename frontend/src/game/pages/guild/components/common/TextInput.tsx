import { Input } from '@pixi/ui';
import { Graphics } from 'pixi.js';
import TextInput from "pixi-text-input";

const generateTextInput = (ref: any, setGuildName: Function) => {
  // const input = new Input({
  //   bg: new Graphics()
  //     .drawRoundedRect(10, 0, 320, 70, 0)
  //     .beginFill("#2e2e2e", 0.5)
  //     .lineStyle(2, 0x656565)
  //     .drawRoundedRect(
  //       0,
  //       0,
  //       320,
  //       60,
  //       0
  //     ),
  //   textStyle: {
  //     fontFamily: "Almendra",
  //     fill: "#BCBCBC",
  //     fontSize: 20,
  //     fontWeight: "bold",
  //   },
  //   placeholder: "Siema",
  //   padding: {
  //     left: 10,
  //     right: 10,
  //   }
  // });
  const input = new TextInput({
    input: {
      fontSize: "20px",
      fontFamily: "Almendra",
      padding: "12px",
      width: "320px",
      color: "#BCBCBC",
    },
    box: {
      default: {
        fill: "#2e2e2e84",
        rounded: 0,
        stroke: { color: 0x656565, width: 2 },
      },
    },
  });

  // input.placeholder = "Guild name...";
  input.position.set(140, 140);

  input.on("input", (text: string) => {
    setGuildName(text);
  });

  ref.current.addChild(input);
  console.log(ref);
};

export default generateTextInput;