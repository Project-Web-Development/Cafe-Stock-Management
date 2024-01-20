// File: CategoryRadioGroup.js
import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const CustomRadioGroupRecipeCat = ({ value, onChange,}) => {
  return  (
    <div className="flex flex-col mr-10 ml-3">
      {/* Kategori (Category) */}
      <FormControl className="flex flex-col">
        <FormLabel id="category-label">Category</FormLabel>
        <RadioGroup
          row
          aria-labelledby="category-label"
          name="category-radio-group"
          value={value}
          onChange={onChange}
        >
          <FormControlLabel value="Makanan" control={<Radio />} label="Makanan" />
          <FormControlLabel value="Minuman" control={<Radio />} label="Minuman" />
        </RadioGroup>
      </FormControl>

      {/* Jenis Menu (Type Menu) */}
      {/* <FormControl className="flex flex-col mt-4">
        <FormLabel id="type-menu-label">Type Menu</FormLabel>
        <RadioGroup
          row
          aria-labelledby="type-menu-label"
          name="type-menu-radio-group"
          value={value}
          onChange={onChange}
        >
          <FormControlLabel value="Main" control={<Radio />} label="Main" />
          <FormControlLabel value="Sub" control={<Radio />} label="Sub" />
        </RadioGroup>
      </FormControl> */}
    </div>
  );
};

export default CustomRadioGroupRecipeCat;
