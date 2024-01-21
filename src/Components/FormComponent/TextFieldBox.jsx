// File: TextFieldBox.js
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const TextFieldBox = ({ label, value, onChange, type, width, disabled }) => {
  
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: width },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="">
        <TextField
          required
          id="outlined-required"
          label={label}
          value={value}
          onChange={onChange}
          type={type}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
          
        />
      </div>
    </Box>
  );
};

export default TextFieldBox;
