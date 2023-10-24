import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getGameDimensions } from "../../redux/reducers/gameSlice";

interface NotificationInterface {
  handleRemoveNotification: Function;
  duration: number;
  message: string;
  type: "success" | "warning" | "error";
}

const GameNotification = ({
  handleRemoveNotification,
  duration,
  message,
  type,
}: NotificationInterface) => {
  const NotificationRef = useRef<any>();
  const [show, toggleShow] = useState(true);
  const [mounted, setMounted] = useState(show);
  const [top, setTop] = useState<any>();

  const dimensions = useSelector(getGameDimensions);

  console.log(dimensions)

  useEffect(() => {
    if (show) setMounted(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) {
      setMounted(false);
      handleRemoveNotification();
    }
  };

  const setPosition = () => {
    const { current: node } = NotificationRef;
    if (document) {
      const nodeList: any = document.getElementsByClassName(
        "pop-up-notification"
      );
      const elements = [...nodeList];
      const currentIndex = elements.findIndex((element) => {
        return element.isSameNode(node);
      });

      const gaps = 24 * (currentIndex + 1);
      let top = 30;
      for (let i = 0; i < currentIndex; i++) {
        top -= elements[i].clientHeight;
      }
      top -= gaps;
      setTop(`${(top)}px`);
    }
  };

  useLayoutEffect(() => {
    setPosition();
  }, []);

  useEffect(() => {
    setPosition();
  }, []);

  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        toggleShow(false);
      }, duration);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mounted ? (
    <div
      className={`pop-up-notification absolute max-w-[600px]  z-20  ${
        show ? "animate-notificationStart" : "animate-notificationEnd"
      }
      `}
      style={
        top
          ? {
              top: top,
              marginLeft: 350 * dimensions.scaleW,
              left: (1316 * dimensions.scaleW) / 2,
            }
          : { top: "24px" }
      }
      onAnimationEnd={onAnimationEnd}
      ref={NotificationRef}
    >
      <span
        className="font-bold uppercase font-sans bg-gradient-to-b from-accent to-amber-900 text-transparent bg-clip-text"
        style={{ fontSize: `${20 * dimensions.scaleW}px` }}
      >
        {message}
      </span>
    </div>
  ) : null;
};

export default GameNotification;
