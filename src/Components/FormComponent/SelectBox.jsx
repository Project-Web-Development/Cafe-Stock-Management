// File: SelectBox.js
import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SelectBox = ({ label, value, onChange, required, minWidth, options, disabled }) => {
  return (
    <Box sx={{ m: 1, minWidth: minWidth || 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" required={required}>
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          required={required}
          onChange={onChange}
          disabled= {disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBox;
