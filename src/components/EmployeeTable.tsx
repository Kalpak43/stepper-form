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
} from "@mui/material";

function EmployeeTable({ employees }: { employees: EmployeeWithId[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2)
          }}>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Profile</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Name</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Email</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Phone</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Gender</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>DOB</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Job Title</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Department</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Position</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Supervisor</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>DOJ</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Location</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Shift</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Salary</TableCell>
            <TableCell sx={{
                fontWeight: 600,
                minWidth: "150px"
            }}>Leave Balance</TableCell>
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
              <TableCell>{employee.gender}</TableCell>
              <TableCell>
                {new Date(employee.DOB).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>{employee.job_title}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.level}</TableCell>
              <TableCell>{employee.supervisor}</TableCell>
              <TableCell>
                {new Date(employee.DOJ).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>{employee.location}</TableCell>
              <TableCell>{employee.shift}</TableCell>
              <TableCell>
              ₹{employee.salary.toLocaleString()} / {employee.frequency}
              </TableCell>
              <TableCell>
                {employee.leaves.annual} Annual, {employee.leaves.sick} Sick
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;
