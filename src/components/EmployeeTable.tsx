import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  alpha,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEmployee } from "../utils";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hook";
import { filterEmployees } from "../features/employees/employeeSlice";
import { useState } from "react";
import EditFormStepper from "./EditFormStepper";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
};

function EmployeeTable({ employees }: { employees: EmployeeWithId[] }) {
  const dispatch = useAppDispatch();

  const [openEdit, setOpenEdit] = useState(false);
  const [active, setActive] = useState(-1);

  const handleOpenEdit = (x: number) => {
    setOpenEdit(true);
    setActive(x);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setActive(-1);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.2),
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Profile
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Gender
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                DOB
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Job Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Department
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Position
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Supervisor
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                DOJ
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Location
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Shift
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Salary
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "150px",
                }}
              >
                Leave Balance
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  minWidth: "120px",
                  position: "sticky",
                  right: 0,
                  boxShadow: "-3px 0 5px rgba(43, 29, 29, 0.1)", // Optional shadow for separation
                  zIndex: 2,
                  backgroundColor: "#e5ccff",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                {/* Profile Picture or Initials */}
                <TableCell>
                  <Avatar>
                    {employee.profile ? (
                      <img
                        src={employee.profile}
                        alt="Profile"
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%" }}
                        className="border border-black"
                      />
                    ) : (
                      `${employee.first_name[0]}${employee.last_name[0]}`
                    )}
                  </Avatar>
                </TableCell>

                {/* Other Details */}
                <TableCell>{employee.display_name}</TableCell>
                <TableCell>{employee.work_email}</TableCell>
                <TableCell>{employee.phone_number}</TableCell>
                <TableCell className="capitalize">{employee.gender}</TableCell>
                <TableCell>
                  {new Date(employee.DOB).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="capitalize">{employee.job_title}</TableCell>
                <TableCell className="capitalize">{employee.department}</TableCell>
                <TableCell className="capitalize">{employee.level}</TableCell>
                <TableCell className="capitalize">{employee.supervisor}</TableCell>
                <TableCell>
                  {new Date(employee.DOJ).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="capitalize">{employee.location}</TableCell>
                <TableCell className="capitalize">{employee.shift}</TableCell>
                <TableCell>
                  ₹{employee.salary.toLocaleString()} / {employee.frequency}
                </TableCell>
                <TableCell className="capitalize"> 
                  {employee.leaves.annual} Annual, {employee.leaves.sick} Sick
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    right: 0,
                    backgroundColor: "white",
                    boxShadow: "-3px 0 5px rgba(0,0,0,0.1)", // Optional shadow for separation
                    zIndex: 1,
                  }}
                >
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        handleOpenEdit(index);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={async () => {
                        const res = await deleteEmployee(employee.uuid);
                        if (res.error) {
                          toast.error(res.error);
                        } else {
                          dispatch(filterEmployees(employee.uuid));
                          toast.success("Deleted");
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditFormStepper employee={employees[active]} />
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
            }}
            onClick={handleCloseEdit}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </>
  );
}

export default EmployeeTable;
