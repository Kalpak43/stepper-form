import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

import { FormikProps, useFormik } from "formik";
import CircleImageInput from "./CircleImageInput";
import { createEmployeeSchema, saveEmployeeData } from "../utils";
import { useAppDispatch } from "../app/hook";
import { addEmployee } from "../features/employees/employeeSlice";
import PasswordInput from "./PasswordInput";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

const steps = ["Basic Details", "Job Details", "Work Details"];

const EmployeeStepperForm: React.FC<{
  handleClose: () => void;
}> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      profile: null,
      work_email: "",
      email: "",
      first_name: "",
      last_name: "",
      display_name: "",
      phone_number: "",
      gender: "",
      DOB: "",
      job_title: "",
      department: "",
      type: "",
      level: "",
      DOJ: "",
      location: "office",
      salary: 0,
      frequency: "monthly",
      supervisor: "",
      shift: "day",
      leaves: {
        annual: 5,
        sick: 6,
      },
      password: "",
    },
    validationSchema: createEmployeeSchema[activeStep],
    onSubmit: async (values) => {
      // setLoading(true);
      // try {
      //   await onSubmit(values); // Call the submit function
      // } finally {
      //   setLoading(false);
      // }

      console.log(values);
    },
  });

  const handleNext = async () => {
    const isValid = await formik.validateForm();
    console.log(isValid);
    if (Object.keys(isValid).length === 0) {
      setActiveStep((prev) => prev + 1);
    } else {
      // Set touched for the fields to display validation messages
      formik.setTouched({
        first_name: true,
        last_name: true,
        display_name: true,
        password: true,
        work_email: true,
        phone_number: true,
        DOB: true,
        job_title: true,
        department: true,
        type: true,
        level: true,
        DOJ: true,
        location: true,
        salary: true,
        frequency: true,
        supervisor: true,
        gender: true,
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Card className="relative">
      <CardContent
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
          color: "white",
        }}
      >
        <Typography variant="h6">Employee Creation Wizard</Typography>
      </CardContent>

      <Divider
        sx={{
          marginBottom: 1,
        }}
      />

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Divider
        sx={{
          marginBlock: 1,
        }}
      />

      <CardContent>
        <Box sx={{ mt: 3 }} className="form-container">
          {activeStep === 0 && (
            <BasicDetailsField formik={formik as FormikProps<Employee>} />
          )}

          {activeStep === 1 && (
            <JobDetailsField formik={formik as FormikProps<Employee>} />
          )}

          {activeStep === 2 && (
            <WorkDetailsField formik={formik as FormikProps<Employee>} />
          )}
        </Box>
      </CardContent>
      <Divider
        sx={{
          marginBottom: 1,
        }}
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                console.log("SOOMETHINK");
                setLoading(true);
                const data = await saveEmployeeData(formik.values as Employee);
                if (data?.success && data.employee) {
                  dispatch(addEmployee(data.employee));
                  toast.success("Employee added Successfully");
                  setActiveStep((prev) => prev + 1);
                  handleClose();
                }

                if (data?.error) {
                  toast.error("There was an error in adding employee");
                }
                setLoading(false);
              }}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Submit"}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeStepperForm;

export const BasicDetailsField = ({
  formik,
}: {
  formik: FormikProps<Employee>;
}) => {
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const { first_name, last_name } = formik.values;
    if (!changed) {
      if (first_name || last_name) {
        formik.setFieldValue(
          "display_name",
          `${first_name.trim()} ${last_name.trim()}`.trim()
        );
      }
    }
  }, [formik.values.first_name, formik.values.last_name]);

  const setImage = (image: string | File) => {
    if (image instanceof File) {
      formik.setFieldValue("profile", image);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2">
      <div>
        <CircleImageInput value={formik.values.profile} setValue={setImage} />
      </div>
      <div className="lg:col-span-2 h-full flex items-center">
        <TextField
          label="Display Name"
          name="display_name"
          value={formik.values.display_name}
          onChange={(e) => {
            setChanged(true);
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={
            formik.touched.display_name && Boolean(formik.errors.display_name)
          }
          helperText={formik.touched.display_name && formik.errors.display_name}
          fullWidth
          className=""
        />
      </div>

      <TextField
        label="First Name"
        name="first_name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />

      <PasswordInput formik={formik} />

      <TextField
        label="Work Email"
        name="work_email"
        value={formik.values.work_email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.work_email && Boolean(formik.errors.work_email)}
        helperText={formik.touched.work_email && formik.errors.work_email}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />
      <TextField
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        value={formik.values.phone_number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.phone_number && Boolean(formik.errors.phone_number)
        }
        helperText={formik.touched.phone_number && formik.errors.phone_number}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />
      <Box
        sx={{
          marginBlock: "0.5rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="gender-select-label   ">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender"
            name="gender"
            value={formik.values.gender}
            label="Gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {formik.touched.gender && formik.errors.gender && (
            <FormHelperText
              sx={{
                color: (theme) => theme.palette.error.main,
              }}
            >
              {formik.errors.gender}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <TextField
        label="Date of Birth"
        type="date"
        name="DOB"
        value={formik.values.DOB}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.DOB && Boolean(formik.errors.DOB)}
        helperText={
          formik.touched.DOB && formik.errors.DOB
            ? String(formik.errors.DOB)
            : ""
        }
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          marginBlock: "0.5rem",
        }}
      />
    </div>
  );
};

export const JobDetailsField = ({
  formik,
}: {
  formik: FormikProps<Employee>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
      <TextField
        label="Job Title"
        name="job_title"
        value={formik.values.job_title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.job_title && Boolean(formik.errors.job_title)}
        helperText={formik.touched.job_title && formik.errors.job_title}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />

      <TextField
        label="Department"
        name="department"
        value={formik.values.department}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.department && Boolean(formik.errors.department)}
        helperText={formik.touched.department && formik.errors.department}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />
      <TextField
        label="Employement Type"
        name="type"
        value={formik.values.type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />

      <Box
        sx={{
          marginBlock: "0.5rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="level-select-label   ">Level</InputLabel>
          <Select
            labelId="level-select-label"
            id="level"
            name="level"
            value={formik.values.level}
            label="Level"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.level && Boolean(formik.errors.level)}
            fullWidth
          >
            <MenuItem value="junior">Junior</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
            <MenuItem value="lead">Lead</MenuItem>
          </Select>
          {formik.touched.level && formik.errors.level && (
            <FormHelperText
              sx={{
                color: (theme) => theme.palette.error.main,
              }}
            >
              {formik.errors.level}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <TextField
        label="Date of Joining"
        type="date"
        name="DOJ"
        value={formik.values.DOJ}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.DOJ && Boolean(formik.errors.DOJ)}
        helperText={formik.touched.DOJ && formik.errors.DOJ}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          marginBlock: "0.5rem",
        }}
      />

      <Box
        sx={{
          marginBlock: "0.5rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="location-select-label   ">Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location"
            name="location"
            value={formik.values.location}
            label="Location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            fullWidth
          >
            <MenuItem value="office">Office</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </Select>
          {formik.touched.location && formik.errors.location && (
            <FormHelperText
              sx={{
                color: (theme) => theme.palette.error.main,
              }}
            >
              {formik.errors.location}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <TextField
        label="Salary"
        name="salary"
        value={formik.values.salary}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.salary && Boolean(formik.errors.salary)}
        helperText={formik.touched.salary && formik.errors.salary}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          marginBlock: "0.5rem",
        }}
      />

      <Box
        sx={{
          marginBlock: "0.5rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="frequency-select-label   ">Pay cycle</InputLabel>
          <Select
            labelId="frequency-select-label"
            id="frequency"
            name="frequency"
            value={formik.values.frequency}
            label="Frequency"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.frequency && Boolean(formik.errors.frequency)}
            fullWidth
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="biweekly">Bi-weekly</MenuItem>
          </Select>
          {formik.touched.frequency && formik.errors.frequency && (
            <FormHelperText
              sx={{
                color: (theme) => theme.palette.error.main,
              }}
            >
              {formik.errors.frequency}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <TextField
        label="Supervisor"
        name="supervisor"
        value={formik.values.supervisor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.supervisor && Boolean(formik.errors.supervisor)}
        helperText={formik.touched.supervisor && formik.errors.supervisor}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />
    </div>
  );
};

export const WorkDetailsField = ({
  formik,
}: {
  formik: FormikProps<Employee>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
      <Box
        sx={{
          marginBlock: "0.5rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="shift-select-label   ">Shift</InputLabel>
          <Select
            labelId="shift-select-label"
            id="shift"
            name="shift"
            value={formik.values.shift}
            label="Shift"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.shift && Boolean(formik.errors.shift)}
            fullWidth
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="night">Night</MenuItem>
            <MenuItem value="flexible">Flexible</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Annual Leaves"
        name="annual"
        type="number"
        value={formik.values.leaves.annual}
        onChange={formik.handleChange}
        variant="outlined"
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />
      <TextField
        label="Sick Leaves"
        name="sick"
        type="number"
        value={formik.values.leaves.sick}
        onChange={formik.handleChange}
        variant="outlined"
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />
    </div>
  );
};
