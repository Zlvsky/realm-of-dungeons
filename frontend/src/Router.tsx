import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Cookies from "js-cookie";
import UserPanel from "./pages/user-panel/UserPanel";
import CreateHero from "./pages/create-hero/CreateHero";
import Game from "./game/Game";

function Router() {
  const user = Cookies.get("jwt");
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
    </BrowserRouter>
  );
}

export default Router;
