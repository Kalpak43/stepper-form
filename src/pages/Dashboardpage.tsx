import { Box, Fab, IconButton, Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useEffect, useState } from "react";
import EmployeeStepperForm from "../components/EmployeeStepper";
import { fetchEmployees } from "../features/employees/employeeThunk";
import EmployeeCard from "../components/EmployeeCard";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
};

function Dashboardpage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { employees } = useAppSelector((state) => state.employee);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  return (
    <div className="p-8">
      <Fab
        onClick={handleOpen}
        variant="extended"
        color="primary"
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: 2,
        }}
      >
        <AddIcon />
        Add Employee
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EmployeeStepperForm />
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>

      <div className="space-y-4 my-8 grid grid-cols-4 gap-4">
        {employees.length > 0 &&
          employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
      </div>
    </div>
  );
}

export default Dashboardpage;
