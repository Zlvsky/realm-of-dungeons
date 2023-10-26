import { useDispatch, useSelector } from "react-redux";
import GameNotification from "./GameNotification";
import { getGameNotifications, removeGameNotifications } from "../../redux/reducers/gameNotificationSlice";

function GameNotificationsGlobal() {
  const gameNotifications = useSelector(getGameNotifications);
  const dispatch = useDispatch();

  return (
    <>
      {gameNotifications?.map((el: any) => {
        return (
          <GameNotification
            key={el.message}
            duration={3000}
            message={el.message}
            type={el.type}
            handleRemoveNotification={() => {
              dispatch(removeGameNotifications(el));
            }}
          />
        );
      })}
    </>
  );
}

export default GameNotificationsGlobal;
