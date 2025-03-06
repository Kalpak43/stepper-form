import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { supabase } from "../supbase";

import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import CircleImageInput from "./CircleImageInput";

const steps = ["Basic Details", "Job Details", "Work Details"];

const EmployeeStepperForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const employeeSchema = Yup.object().shape({
    profile: Yup.mixed()
      .test("fileRequired", "Profile image is required", (value) => !!value)
      .test("fileType", "Only images are allowed", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/gif"].includes(
              (value as File).type
            )
          : true
      ),
    work_email: Yup.string()
      .email("Invalid work email")
      .required("Work email is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    display_name: Yup.string().required("Display name is required"),
    phone_number: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    gender: Yup.mixed<"male" | "female" | "other">()
      .oneOf(["male", "female", "other"], "Invalid gender")
      .required("Gender is required"),
    DOB: Yup.date()
      .max(new Date(), "DOB cannot be in the future")
      .required("Date of Birth is required"),
    job_title: Yup.string().required("Job title is required"),
    department: Yup.string().required("Department is required"),
    type: Yup.string().required("Employement Type is required"),
    level: Yup.mixed<"junior" | "mid" | "senior" | "lead">()
      .oneOf(["junior", "mid", "senior", "lead"], "Invalid level")
      .required("Level is required"),
    DOJ: Yup.date()
      .min(new Date(), "DOJ cannot be in the past")
      .required("Date of Joining is required"),
    location: Yup.mixed<"office" | "remote" | "hybrid">()
      .oneOf(["office", "remote", "hybrid"], "Invalid location")
      .required("Location is required"),
    salary: Yup.number()
      .positive("Salary must be a positive number")
      .required("Salary is required"),
    frequency: Yup.mixed<"monthly" | "weekly" | "biweekly">()
      .oneOf(["monthly", "weekly", "biweekly"], "Invalid Salary frequency")
      .required("Salary frequency is required"),
    supervisor: Yup.string().required("Supervisor is required"),
    shift: Yup.mixed<"day" | "night" | "flexible">()
      .oneOf(["day", "night", "flexible"], "Invalid Shift")
      .required("Shift is required"),
    leaves: Yup.object().shape({
      annual: Yup.number()
        .integer("Annual leaves must be an integer")
        .min(0, "Annual leaves cannot be negative")
        .required("Annual leaves are required"),
      sick: Yup.number()
        .integer("Sick leaves must be an integer")
        .min(0, "Sick leaves cannot be negative")
        .required("Sick leaves are required"),
    }),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      )
      .required("Password is required"),
  });

  const formik = useFormik<Employee>({
    initialValues: {
      profile: null,
      work_email: "",
      email: "",
      first_name: "",
      last_name: "",
      display_name: "",
      phone_number: "",
      gender: "male",
      DOB: new Date(),
      job_title: "",
      department: "",
      type: "",
      level: "",
      DOJ: new Date(),
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
    validationSchema: employeeSchema,
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

  const stepOneValidation = (values: Employee) => {
    const errors: Partial<Employee> = {};

    if (!values.first_name) {
      errors.first_name = "First name is required";
    }
    if (!values.last_name) {
      errors.last_name = "Last name is required";
    }
    if (!values.display_name) {
      errors.display_name = "Display name is required";
    }

    return errors;
  };

  const handleNext = async () => {
    let errors = {};
    if (activeStep == 0) stepOneValidation(formik.values);

    const isValid = await formik.validateForm();
    console.log(formik.values);

    console.log(isValid);
    if (Object.keys(errors).length === 0) {
      setActiveStep((prev) => prev + 1);
    } else {
      // Set touched for the fields to display validation messages
      formik.setTouched({
        first_name: true,
        last_name: true,
        display_name: true,
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const setImage = (image: File) => {
    formik.setFieldValue("profile", image);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Employee Creation Wizard</Typography>
      </CardContent>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <CardContent>
        <Box sx={{ mt: 3 }}>
          {activeStep === 0 && <BasicDetailsField formik={formik} />}

          {activeStep === 1 && <JobDetailsField formik={formik} />}

          {activeStep === 2 && <WorkDetailsField formik={formik} />}
        </Box>
      </CardContent>

      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={() => {}}>
              Submit
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
      <div>
        <CircleImageInput
          value={formik.values.profile}
          setValue={(x: File) => {
            formik.setFieldValue("profile", x);
          }}
        />
      </div>
      <TextField
        label="Display Name"
        name="display_name"
        value={formik.values.display_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.display_name && Boolean(formik.errors.display_name)
        }
        helperText={formik.touched.display_name && formik.errors.display_name}
        fullWidth
        className="col-span-2"
      />

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

      <TextField
        label="Password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
        sx={{
          marginBlock: "0.5rem",
        }}
      />

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
            helperText={formik.touched.gender && formik.errors.gender}
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
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
        helperText={formik.touched.DOB && formik.errors.DOB}
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
            helperText={formik.touched.level && formik.errors.level}
            fullWidth
          >
            <MenuItem value="junior">Junior</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
            <MenuItem value="lead">Lead</MenuItem>
          </Select>
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
            helperText={formik.touched.location && formik.errors.location}
            fullWidth
          >
            <MenuItem value="office">Office</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </Select>
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
            helperText={formik.touched.frequency && formik.errors.frequency}
            fullWidth
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="biweekly">Bi-weekly</MenuItem>
          </Select>
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
            helperText={formik.touched.shift && formik.errors.shift}
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
