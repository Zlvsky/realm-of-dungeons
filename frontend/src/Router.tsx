import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import UserPanel from "./pages/user-panel/UserPanel";
import CreateHero from "./pages/create-hero/CreateHero";
import Game from "./game/Game";
import GameNotificationsGlobal from "./components/game-notifications/GameNotificationsGlobal";
import NotificationsGlobal from "./components/notifications/NotificationsGlobal";
import { useSelector } from "react-redux";
import { getUser } from "./redux/reducers/userSlice";
import LoadingScreen from "./components/layouts/page-wrappers/LoadingScreen";
import usePersistUser from "./hooks/usePersistUser";

function Router() {
  const loading = usePersistUser();
  const user = useSelector(getUser);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<ProtectedRoute accessBy="non-authenticated" user={user} />}
        >
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route
          element={<ProtectedRoute accessBy="authenticated" user={user} />}
        >
          <Route path="/start" element={<UserPanel />} />
          <Route path="/createhero" element={<CreateHero />} />
          <Route path="/game" element={<Game />} />
        </Route>
        <Route index path="/" element={<Home />} />
      </Routes>
      <NotificationsGlobal />
      <GameNotificationsGlobal />
    </BrowserRouter>
  );
}

export default Router;
