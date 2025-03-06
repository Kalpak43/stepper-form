import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const CircleImageInput = ({
  value,
  setValue,
}: {
  value: File | null;
  setValue: (x: File) => void;
}) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setValue(value);
      const reader = new FileReader();
      reader.onloadend = () => {
        reader.result && setImage(reader.result as string);
      };
      reader.readAsDataURL(value);
    }
  }, [value]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setValue(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        reader.result && setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label htmlFor="icon-button-file">
        <Avatar
          src={image || ""}
          alt="Profile"
          sx={{ width: 100, height: 100, cursor: "pointer" }}
        >
          {!image && <CameraAltIcon />}
        </Avatar>
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleImageChange}
        />
      </label>
      <IconButton color="primary" aria-label="upload picture" component="span">
        <CameraAltIcon />
      </IconButton>
    </div>
  );
};

export default CircleImageInput;
