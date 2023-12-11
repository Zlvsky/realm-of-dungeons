import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/reducers/userSlice";
import { fetchUser } from "../utils/fetchers/fetchUser";

const usePersistUser = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const token = Cookies.get("jwt");

  const [loading, setLoading] = useState(true);

  const handleGetUserDetails = async () => {
    await fetchUser(dispatch);
    setLoading(false);
  };

  useEffect(() => {
    if (token && !user) {
      handleGetUserDetails();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading;
};

export default usePersistUser;
