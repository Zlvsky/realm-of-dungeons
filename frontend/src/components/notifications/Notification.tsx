import { useEffect, useLayoutEffect, useState, useRef } from "react";

interface NotificationInterface {
  handleRemoveNotification: Function;
  duration: number;
  message: string;
  type: "success" | "warning" | "error";
}

const Notification = ({
  handleRemoveNotification,
  duration,
  message,
  type,
}: NotificationInterface) => {
  const NotificationRef = useRef<any>();
  const [show, toggleShow] = useState(true);
  const [mounted, setMounted] = useState(show);
  const [bottom, setBottom] = useState<any>();

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
      let bottom = 130;
      for (let i = 0; i < currentIndex; i++) {
        bottom -= elements[i].clientHeight;
      }
      bottom -= gaps;
      setBottom(`${(bottom)}px`);
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
      className={`pop-up-notification fixed w-full max-w-[410px] left-1/2 -translate-x-1/2 pl-4 pr-5 py-4 bg-bgBrown border border-borderBrown border-t-borderTopBrown shadow-hover z-20  ${
        show ? "animate-notificationStart" : "animate-notificationEnd"
      }
      `}
      style={bottom ? { bottom: bottom } : { bottom: "24px" }}
      onAnimationEnd={onAnimationEnd}
      ref={NotificationRef}
    >
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-3">
          <span className="text-accent text-lg font-sans">{message}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default Notification;
