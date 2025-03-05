import { alpha, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { login } from "../features/auth/authThunk";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Loginpage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAdmin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      isAdmin ? navigate("/dashboard") : navigate("/profile");
    }
  }, [user, isAdmin]);

  async function handleLogin(email: string, password: string) {
    await dispatch(
      login({
        email,
        password,
      })
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
        display: "flex",
        minHeight: "100dvh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm onLogin={handleLogin} />
    </Box>
  );
}

export default Loginpage;
