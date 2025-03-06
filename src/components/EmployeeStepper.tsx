import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { supabase } from "../supbase";

const steps = ["Basic Details", "Job Details", "Review & Submit"];

interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
}

const EmployeeStepperForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<EmployeeData>({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    department: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    console.log("Submitted Data:", formData);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: "Test#123",
    });

    if (error) {
      console.error("Error creating user:", error);
    } else {
      console.log("User created:", data);
    }
    setActiveStep(steps.length);
  };

  return (
    <Card sx={{ maxWidth: 400, padding: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 3 }}>
        {activeStep === 0 && (
          <Box>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <TextField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6">Review Employee Details</Typography>
            <Typography>First Name: {formData.firstName}</Typography>
            <Typography>Last Name: {formData.lastName}</Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Job Title: {formData.jobTitle}</Typography>
            <Typography>Department: {formData.department}</Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default EmployeeStepperForm;
