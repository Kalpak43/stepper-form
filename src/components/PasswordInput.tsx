import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function PasswordInput({ formik }: { formik: any }) {
  const [hide, setHide] = useState(true);
  const handleTogglePasswordVisibility = () => {
    setHide(!hide);
  };

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
        sx={{
          marginBlock: "0.5rem",
        }}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {hide ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export default PasswordInput;
