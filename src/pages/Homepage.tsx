import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hook";

function Homepage() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      if (isAdmin) navigate("/dashboard");
      else navigate("/profile");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button
        variant="contained"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
    </div>
  );
}

export default Homepage;
