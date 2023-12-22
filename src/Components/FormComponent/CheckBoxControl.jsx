// File: CheckboxControl.js
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxControl = ({ checked, onChange, label }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
          />
        }
        label={label}
        sx={{ m: 1 }}
      />
    </FormGroup>
  );
};

export default CheckboxControl;
