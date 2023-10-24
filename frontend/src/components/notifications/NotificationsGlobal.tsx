import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  removeNotifications,
} from "../../redux/reducers/notificationsSlice";
import Notification from "./Notification";

function NotificationsGlobal() {
  const notifications = useSelector(getNotifications);
  const dispatch = useDispatch();
  return (
    <>
      {notifications?.map((el: any) => {
        return (
          <Notification
            key={el.message}
            duration={5000}
            message={el.message}
            type={el.type}
            handleRemoveNotification={() => {
              dispatch(removeNotifications(el));
            }}
          />
        );
      })}
    </>
  );
}

export default NotificationsGlobal;
