// File: CategoryRadioGroup.js
import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const CustomRadioGroup = ({ value, onChange }) => {
  return (
    <FormControl className="">
      <FormLabel id="demo-row-radio-buttons-group-label" className="ms-4">
        Category
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        className="ms-4 flex flex-col"
        value={value}
        onChange={onChange}
      >
        <div className="flex flex-col justify-center">
          <FormControlLabel
            value="Food Ingredients"
            control={<Radio />}
            label="Food Ingredients"
          />
          <FormControlLabel
            value="Cleaning Supplies"
            control={<Radio />}
            label="Cleaning Supplies"
          />
        </div>

        <div className="flex flex-col justify-center ml-10">
          <FormControlLabel
            value="Supplies & Equipment"
            control={<Radio />}
            label="Supplies & Equipment"
          />
          <FormControlLabel
            value="Tools and Machines"
            control={<Radio />}
            label="Tools and Machines"
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
