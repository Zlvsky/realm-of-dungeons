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
import PrivacyPolicy from "./pages/terms/PrivacyPolicy";
import Terms from "./pages/terms/Terms";

function Router() {
  const loading = usePersistUser();
  const user = useSelector(getUser);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} index />

          <Route
            element={
              <ProtectedRoute accessBy="non-authenticated" user={user} />
            }
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

          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/terms" element={<Terms />} />
        </Route>
      </Routes>
      <NotificationsGlobal />
      <GameNotificationsGlobal />
    </BrowserRouter>
  );
}

export default Router;
