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
          <TableRow
            sx={{
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.light, 0.1),
            }}
          >
            <TableCell
              sx={{
                fontWeight: 600,
              }}
            >
              Profile
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
              }}
            >
              Job Title
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
              }}
            >
              Department
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
              }}
            >
              Location
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
              }}
            >
              Salary
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
              }}
            >
              Leaves
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar>
                  {employee.profile ? (
                    <img
                      src={employee.profile}
                      alt="Profile"
                      width="40"
                      height="40"
                    />
                  ) : (
                    employee.first_name[0] + employee.last_name[0]
                  )}
                </Avatar>
              </TableCell>
              <TableCell>{employee.display_name}</TableCell>
              <TableCell>{employee.work_email}</TableCell>
              <TableCell>{employee.job_title}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.location}</TableCell>
              <TableCell>Rs. {employee.salary.toLocaleString()}</TableCell>
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
