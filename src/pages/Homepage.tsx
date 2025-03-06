import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function Homepage() {
  const navigate = useNavigate();
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
