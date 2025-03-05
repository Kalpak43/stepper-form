import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const { user, isAdmin } = useAppSelector((state) => state.auth);

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
