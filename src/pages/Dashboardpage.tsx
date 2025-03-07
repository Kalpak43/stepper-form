import {
  alpha,
  Box,
  Button,
  ButtonGroup,
  Fab,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useEffect, useState } from "react";
import EmployeeStepperForm from "../components/EmployeeStepper";
import { fetchEmployees } from "../features/employees/employeeThunk";
import EmployeeCard from "../components/EmployeeCard";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import EmployeeTable from "../components/EmployeeTable";
import TableChartIcon from "@mui/icons-material/TableChart";
import BadgeIcon from "@mui/icons-material/Badge";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Loader2 } from "lucide-react";

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
  const { employees, loading } = useAppSelector((state) => state.employee);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tabular, setTabular] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  if (loading)
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center text-lg">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="p-8 bg-[#f3f3f3] min-h-[90dvh]">
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
        <Box sx={style} className="form-modal">
          <EmployeeStepperForm handleClose={handleClose} />
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

      <div className="flex items-center justify-between">
        <Typography variant="h5">Employee List</Typography>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            onClick={() => setTabular(true)}
            disabled={tabular}
            sx={{
              backgroundColor: tabular
                ? (theme) => alpha(theme.palette.primary.light, 0.2)
                : "",
            }}
          >
            <TableChartIcon />
          </Button>
          <Button
            onClick={() => setTabular(false)}
            disabled={!tabular}
            sx={{
              backgroundColor: !tabular
                ? (theme) => alpha(theme.palette.primary.light, 0.2)
                : "",
            }}
          >
            <BadgeIcon />
          </Button>
        </ButtonGroup>
      </div>

      {employees.length > 0 ? (
        <>
          {!tabular ? (
            <div className="space-y-4 my-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {employees.length > 0 &&
                employees.map((employee) => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </div>
          ) : (
            employees && (
              <div className="my-8">
                <EmployeeTable employees={employees} />
              </div>
            )
          )}
        </>
      ) : (
        <div className="min-h-[500px] flex flex-col items-center justify-center text-lg text-red-400">
          <ErrorOutlineIcon fontSize="large" />
          No Employees Found
        </div>
      )}
    </div>
  );
}

export default Dashboardpage;
