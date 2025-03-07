import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityIconOff from "@mui/icons-material/Visibility";

function PasswordInput({ formik }: { formik: any }) {
  const [hide, setHide] = useState(true);

  return (
    <>
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type={hide ? "password" : "text"}
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        required
      />
    </>
  );
}

export default PasswordInput;
