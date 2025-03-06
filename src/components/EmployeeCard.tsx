import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CloseIcon from "@mui/icons-material/Close";

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
          <div className="w-[100px] aspect-square rounded-full bg-gray-400 overflow-hidden mx-auto translate-y-1/2 border">
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
  return (
    <Card sx={{ minWidth: 200, maxWidth: 800, margin: "auto" }}>
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
      <CardContent className="space-y-4">
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
      </CardContent>
      {/* <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} display="flex" justifyContent="center">
            <Avatar
              src={employee.profile ? employee.profile : ""}
              sx={{ width: 100, height: 100 }}
            />
          </Grid2>
          {Object.entries(employee).map(
            ([key, value]) =>
              key !== "profile" &&
              key !== "password" && (
                <Grid2 item xs={12} sm={6} key={key}>
                  <Typography variant="body1" fontWeight="bold">
                    {key.replace(/_/g, " ").toUpperCase()}:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {typeof value === "object" && value !== null
                      ? JSON.stringify(value)
                      : value}
                  </Typography>
                </Grid2>
              )
          )}
        </Grid2>
      </CardContent> */}
    </Card>
  );
}
