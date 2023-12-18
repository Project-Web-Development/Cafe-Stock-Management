import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NavbarDefault from "../Components/NavigationBar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export default function AddNewStock() {
  return (
    <div className="">
      <NavbarDefault />
      <div className="flex flex-col justify-center mt-4 bg-green-200 items-center">
        <div className="flex flex-col justify-center items-start">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "510px" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="">
              <TextField
                required
                id="outlined-required"
                label="Name"
                defaultValue="Name"
                style={{ color: "white" }}
              />
            </div>
          </Box>
          <FormControl className="">
            <FormLabel id="demo-row-radio-buttons-group-label" className="ms-4">
              Category
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              className="ms-4 flex flex-col"
            >
              <div className="flex flex-col justify-center ">
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
        </div>
      </div>
    </div>
  );
}
