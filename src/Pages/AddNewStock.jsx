import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NavbarDefault from "../Components/NavigationBar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
export default function AddNewStock() {
  const [unit, setUnit] = React.useState("");
  const [insideUnit, setinsideUnit] = React.useState("");

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleInsideUnitChange = (event) => {
    setinsideUnit(event.target.value);
  };
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-screen pt-2">
      <NavbarDefault />
      <div className="flex flex-col justify-center bg-gray-200 mt-4 items-center w-1/2 p-10 rounded-[35px]">
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
          <div className="flex justify-center">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "150px" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="">
                <TextField
                  required
                  id="outlined-required"
                  label="Quantity"
                  defaultValue="Quantity"
                  style={{ color: "white" }}
                  type="number"
                />
              </div>
            </Box>
            <Box sx={{ m: 1, minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={unit}
                  label="Unit"
                  required
                  onChange={handleUnitChange}
                >
                  <MenuItem value={"Pieces"}>Pieces (Pcs)</MenuItem>
                  <MenuItem value={"Kilogram"}>Kilogram (Kg)</MenuItem>
                  <MenuItem value={"Gram"}>Gram (g)</MenuItem>
                  <MenuItem value={"Liter"}>Liter (L)</MenuItem>
                  <MenuItem value={"Meter"}>Meter (m)</MenuItem>
                  <MenuItem value={"Centimeter"}>Centimeter (cm)</MenuItem>
                  <MenuItem value={"Boxes"}>Boxes (Box)</MenuItem>
                  <MenuItem value={"Set"}>Set</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Need Inside Quantity ?"
                sx={{ m: 1 }}
              />
            </FormGroup>
          </div>
          <div className="flex justify-center">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "150px" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="">
                <TextField
                  required
                  id="outlined-required"
                  label="Inside Quantity"
                  defaultValue="Inside Quantity"
                  style={{ color: "white" }}
                  type="number"
                />
              </div>
            </Box>
            <Box sx={{ m: 1, minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Inside Unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={insideUnit}
                  label="insideUnit"
                  required
                  onChange={handleInsideUnitChange}
                >
                  <MenuItem value={"Pieces"}>Pieces (Pcs)</MenuItem>
                  <MenuItem value={"Kilogram"}>Kilogram (Kg)</MenuItem>
                  <MenuItem value={"Gram"}>Gram (g)</MenuItem>
                  <MenuItem value={"Liter"}>Liter (L)</MenuItem>
                  <MenuItem value={"Meter"}>Meter (m)</MenuItem>
                  <MenuItem value={"Centimeter"}>Centimeter (cm)</MenuItem>
                  <MenuItem value={"Boxes"}>Boxes (Box)</MenuItem>
                  <MenuItem value={"Set"}>Set</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex justify-center  w-full mt-3">
            <Stack direction="row" spacing={2}>
              <Button variant="contained" endIcon={<AddIcon />}>
                Add
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
