import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import { useAppSelector } from "../app/hook";
import { LoaderCircle } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { loading } = useAppSelector((state) => state.auth);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onLogin(values.email, values.password);
    },
  });

  return (
    <Card sx={{ maxWidth: 400, padding: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            required
          />
          <PasswordInput formik={formik} />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
