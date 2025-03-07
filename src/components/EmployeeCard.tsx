import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Modal,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CloseIcon from "@mui/icons-material/Close";
import CakeIcon from "@mui/icons-material/Cake";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
};

function EmployeeCard({ employee }: { employee: EmployeeWithId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card key={employee.id} className="text-center h-full">
        <Box
          className="mb-16 border-b"
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          }}
        >
          <div className="w-[100px] aspect-square rounded-full bg-#424242-400 overflow-hidden mx-auto translate-y-1/2 border">
            <Avatar
              src={employee.profile}
              className=""
              sx={{ width: 100, height: 100 }}
            />
          </div>
        </Box>
        <CardContent className="space-y-4">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            {employee.display_name}
          </Typography>
          <Typography>
            <div className="flex items-center gap-2 text-sm justify-center">
              <ContactMailIcon
                fontSize="small"
                sx={{
                  color: (theme) => alpha(theme.palette.primary.main, 0.5),
                }}
              />
              <p>{employee.work_email}</p>
            </div>
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              marginTop: 4,
            }}
          >
            View Profile
          </Button>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ExpandedCard employee={employee} />
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
    </>
  );
}

export default EmployeeCard;

export function ExpandedCard({ employee }: { employee: EmployeeWithId }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Card sx={{ minWidth: 800, maxWidth: 800, margin: "auto" }}>
      <AppBar position="static" sx={{ padding: 1 }}>
        <Toolbar>
          <Avatar
            src={employee.profile ? employee.profile : ""}
            sx={{ width: 50, height: 50, marginRight: 2 }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            {employee.display_name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Tabs value={tabIndex} onChange={handleChange} variant="fullWidth">
          <Tab label="Basic Details" />
          <Tab label="Job Details" />
          <Tab label="Work Details" />
        </Tabs>
      </Box>
      <Divider />
      <CardContent className="space-y-4">
        {tabIndex === 0 && (
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#424242" }}
              className="uppercase"
            >
              Contact Details:
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
              <div className="flex items-center gap-2 text-sm">
                <ContactMailIcon
                  fontSize="small"
                  sx={{
                    color: (theme) => alpha(theme.palette.primary.main, 0.5),
                  }}
                />
                <p>{employee.work_email}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlternateEmailIcon
                  fontSize="small"
                  sx={{
                    color: (theme) => alpha(theme.palette.primary.main, 0.4),
                  }}
                />
                <p>{employee.email}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <LocalPhoneIcon
                  fontSize="small"
                  sx={{
                    color: (theme) => alpha(theme.palette.primary.main, 0.4),
                  }}
                />
                <p>{employee.phone_number}</p>
              </div>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#424242" }}
              className="uppercase"
            >
              Personal Details:
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
              <div>
                <div className="flex items-center gap-2">
                  <CakeIcon
                    fontSize="small"
                    sx={{
                      color: (theme) => alpha(theme.palette.primary.main, 0.5),
                    }}
                  />
                  <strong>DOB</strong>
                </div>
                <p className="">
                  {new Date(employee.DOB).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong>Gender</strong>
                </div>
                <p className="capitalize">{employee.gender}</p>
              </div>
            </Box>
          </Box>
        )}

        {tabIndex === 1 && (
          <>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Job Title:
                </Typography>
                <Typography>{employee.job_title}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Department:
                </Typography>
                <Typography>{employee.department}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Employment Type:
                </Typography>
                <Typography className="capitalize">{employee.type}</Typography>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Position:
                </Typography>
                <Typography className="capitalize">{employee.level}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Supervisor:
                </Typography>
                <Typography>{employee.supervisor}</Typography>
              </Box>
            </Box>
          </>
        )}

        {tabIndex === 2 && (
          <Box>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Date of Joining:
                </Typography>
                <Typography>
                  {new Date(employee.DOJ).toLocaleDateString("en-GB")}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Shift:
                </Typography>
                <Typography className="capitalize">{employee.shift}</Typography>
              </Box>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#424242" }}
                className="uppercase"
              >
                Salary:
              </Typography>
              <Typography>
                ₹{employee.salary.toLocaleString()} / {employee.frequency}
              </Typography>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#424242" }}
                className="uppercase"
              >
                Leave Balance:
              </Typography>
              <Typography>
                Annual: {employee.leaves.annual}, Sick: {employee.leaves.sick}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>

      {/* <CardContent className="space-y-4">
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
            className="uppercase"
          >
            Contact Details:
          </Typography>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <ContactMailIcon
                fontSize="small"
                sx={{
                  color: (theme) => alpha(theme.palette.primary.main, 0.5),
                }}
              />
              <p>{employee.work_email}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlternateEmailIcon
                fontSize="small"
                sx={{
                  color: (theme) => alpha(theme.palette.primary.main, 0.4),
                }}
              />
              <p>{employee.work_email}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <LocalPhoneIcon
                fontSize="small"
                sx={{
                  color: (theme) => alpha(theme.palette.primary.main, 0.4),
                }}
              />
              <p>{employee.phone_number}</p>
            </div>
          </Box>
        </Box>
        <Divider
          sx={{
            marginBottom: 1,
          }}
        />
        <Box className="">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
              className="uppercase"
            >
              Location:{" "}
            </Typography>
            <Typography variant="body1">{employee.location}</Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            marginBottom: 1,
          }}
        />
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
              className="uppercase"
            >
              Job Title:
            </Typography>
            <Box className=" mt-2">
              <div className="flex items-center gap-2">
                <p>{employee.job_title}</p>
              </div>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
              className="uppercase"
            >
              Department:
            </Typography>
            <Box className=" mt-2">
              <div className="flex items-center gap-2">
                <p>{employee.department}</p>
              </div>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
              className="uppercase"
            >
              Position:
            </Typography>
            <Box className=" mt-2">
              <div className="flex items-center gap-2">
                <p>{employee.level}</p>
              </div>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
              className="uppercase"
            >
              Supervisor:
            </Typography>
            <Box className=" mt-2">
              <div className="flex items-center gap-2">
                <p>{employee.supervisor}</p>
              </div>
            </Box>
          </Box>
        </Box>
      </CardContent> */}
    </Card>
  );
}
