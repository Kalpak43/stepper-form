import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { useEffect } from "react";
import { checkSession } from "./features/auth/authThunk";

function App() {
  const dispatch = useAppDispatch();
  const { user, isAdmin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkSession())
  }, [dispatch ])

  useEffect(() => {
    console.log(user, isAdmin);
  }, [user, isAdmin]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Loginpage />} />
    </Routes>
  );
}

export default App;
