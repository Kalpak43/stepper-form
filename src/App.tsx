import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { useEffect } from "react";
import { checkSession } from "./features/auth/authThunk";
import Dashboardpage from "./pages/Dashboardpage";
import NotAuthorizedpage from "./pages/NotAuthorizedpage";
import Profilepage from "./pages/Profilepage";
import {
  AdminProtectedRoute,
  UserProtectedRoute,
} from "./components/ProtectedRoute";
import Layout from "./Layout";

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/not-authorized" element={<NotAuthorizedpage />} />
      <Route element={<Layout />}>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboardpage />} />
        </Route>
        <Route element={<UserProtectedRoute />}>
          <Route path="/profile" element={<Profilepage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
