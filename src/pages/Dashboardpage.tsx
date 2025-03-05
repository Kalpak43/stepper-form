import { Button } from "@mui/material";
import { useAppDispatch } from "../app/hook";
import { logout } from "../features/auth/authThunk";

function Dashboardpage() {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button
        onClick={() => {
          dispatch(logout());
        }}
      >
        log out
      </Button>
    </div>
  );
}

export default Dashboardpage;
