import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hook";
import { fetchEmployeeFromId } from "../utils";
import { useNavigate } from "react-router";
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CakeIcon from "@mui/icons-material/Cake";

function Profilepage() {
  const { user } = useAppSelector((state) => state.auth);
  const [data, setData] = useState<EmployeeWithId | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      setLoading(true);

      const data = await fetchEmployeeFromId(user.id);

      setLoading(false);
      setData(data);
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.2),
        minHeight: "91dvh",
      }}
      className="p-10"
    >
      {loading && <p>Loading...</p>}
      {data && (
        <Card
          sx={{
            maxWidth: 800,
            marginX: "auto",
          }}
        >
          <Box
            className="mb-16 border-b"
            sx={{
              backgroundColor: "#d1cfcf",
            }}
          >
            <div></div>
            <div className="w-[100px] aspect-square rounded-full bg-gray-400 overflow-hidden mx-auto translate-y-1/2 border">
              <Avatar
                src={data.profile}
                className=""
                sx={{ width: 100, height: 100 }}
              />
            </div>
          </Box>
          <Typography variant="h6" className="text-center">
            {data.display_name}
          </Typography>
          <CardContent>
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
                  <p>{data.work_email}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlternateEmailIcon
                    fontSize="small"
                    sx={{
                      color: (theme) => alpha(theme.palette.primary.main, 0.4),
                    }}
                  />
                  <p>{data.email}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <LocalPhoneIcon
                    fontSize="small"
                    sx={{
                      color: (theme) => alpha(theme.palette.primary.main, 0.4),
                    }}
                  />
                  <p>{data.phone_number}</p>
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
                        color: (theme) =>
                          alpha(theme.palette.primary.main, 0.5),
                      }}
                    />
                    <strong>DOB</strong>
                  </div>
                  <p className="">
                    {new Date(data.DOB).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong>Gender</strong>
                  </div>
                  <p className="">{data.gender}</p>
                </div>
              </Box>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Job Title:
                </Typography>
                <Typography>{data.job_title}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Department:
                </Typography>
                <Typography>{data.department}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Employment Type:
                </Typography>
                <Typography>{data.type}</Typography>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Position:
                </Typography>
                <Typography>{data.level}</Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#424242" }}
                  className="uppercase"
                >
                  Supervisor:
                </Typography>
                <Typography>{data.supervisor}</Typography>
              </Box>
            </Box>
            <Divider sx={{ marginY: 2 }} />
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
                    {new Date(data.DOJ).toLocaleDateString("en-GB")}
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
                  <Typography>{data.shift}</Typography>
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
                  ${data.salary.toLocaleString()} / {data.frequency}
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
                  Annual: {data.leaves.annual}, Sick: {data.leaves.sick}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Profilepage;
