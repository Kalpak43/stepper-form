import { Box, Button, Modal, Typography } from "@mui/material";
import { useAppDispatch } from "../app/hook";
import { logout } from "../features/auth/authThunk";
import { useState } from "react";
import EmployeeFormModal from "../components/EmployeeFormModal";
import EmployeeStepperForm from "../components/EmployeeStepper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
};

function Dashboardpage() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-8">
      <Button onClick={handleOpen} variant="contained">
        Add Employee
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EmployeeStepperForm />
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboardpage;
