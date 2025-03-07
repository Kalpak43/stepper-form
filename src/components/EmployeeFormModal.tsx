import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { supabase } from "../supbase";

function EmployeeFormModal() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: "Test#123",
      });

      if (error) {
        console.error("Error creating user:", error);
      } else {
        console.log("User created:", data);
      }
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Add Employee
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default EmployeeFormModal;
