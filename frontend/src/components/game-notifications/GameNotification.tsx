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

  const scaleW = dimensions.scaleW > 1 ? 1 : dimensions.scaleW;

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
      let top = 45;
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
      className={`pop-up-notification fixed z-20 w-full left-1/2 -translate-x-1/2 flex flex-row  ${
        show ? "animate-notificationStart" : "animate-notificationEnd"
      }
      `}
      style={{
        top: top || "24px",
        maxWidth: dimensions.width,
      }}
      onAnimationEnd={onAnimationEnd}
      ref={NotificationRef}
    >
      <div style={{ width: 350 * scaleW, height: 1 }}></div>
      <div className="flex justify-center flex-1">
        <div className="px-3 py-2 bg-bgBrown/80 border border-borderBrown border-t-borderTopBrown">
          <span
            className="font-bold tracking-wider uppercase font-sans bg-gradient-to-b from-accent to-red-600 text-transparent bg-clip-text"
            style={{ fontSize: `${20 * scaleW}px` }}
          >
            {message}
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default GameNotification;
