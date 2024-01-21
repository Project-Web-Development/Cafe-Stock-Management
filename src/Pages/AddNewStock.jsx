import React from "react";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
//Import Keperluan Data User ==========================
import { useUserData } from "../Context/getUserData";

//import Component ====================================
import NavbarDefault from "../Components/NavigationBar";
import TextFieldBox from "../Components/FormComponent/TextFieldBox";
import CustomRadioGroup from "../Components/FormComponent/RadioGroup";
import SelectBox from "../Components/FormComponent/SelectBox";
// import CheckboxControl from "../Components/FormComponent/CheckBoxControl";
import ButtonStack from "../Components/FormComponent/SendButton";
//=====================================================
import addNewStock from "../Context/firebaseController";

export default function AddNewStock() {
  const [unit, setUnit] = React.useState("");
  const [insideUnit, setinsideUnit] = React.useState("");
  const [isInsideQuantityNeeded, setIsInsideQuantityNeeded] =
    React.useState(true);
  const [stockName, setStockName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [minimumStock, setMinimumStock] = React.useState(0);
  const [maximumStock, setMaximumStock] = React.useState(0);
  const [insideQuantity, setInsideQuantity] = React.useState(0);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertError, setAlertError] = React.useState(false);

  const options = [
    { value: "Pieces", label: "Pieces (Pcs)" },
    { value: "Kilogram", label: "Kilogram (Kg)" },
    { value: "Gram", label: "Gram (g)" },
    { value: "Liter", label: "Liter (L)" },
    { value: "Meter", label: "Meter (m)" },
    { value: "Centimeter", label: "Centimeter (cm)" },
    { value: "Boxes", label: "Boxes (Box)" },
  ];

  const handleInsideQuantity = (event) => {
    setInsideQuantity(parseInt(event.target.value));
  };

  const handleMinimumStockChange = (event) => {
    setMinimumStock(parseInt(event.target.value));
  };

  const handleMaximumStockChange = (event) => {
    setMaximumStock(parseInt(event.target.value));
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleInsideUnitChange = (event) => {
    setinsideUnit(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsInsideQuantityNeeded(event.target.checked);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleStockNameChange = (event) => {
    setStockName(event.target.value);
  };

  const handleAlertError = () => {
    setAlertError(true);
    setTimeout(() => {
      setAlertError(false);
    }, 3000);
  };
  
  // Menampilkan pesan sukses selama 4 detik
  const handleAlertSuccess = () => {
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
    }, 3000);
  };

  const userData = useUserData();
  const addStockToFirebase = async () => {
    if (
      stockName === "" ||
      category === "" ||
      quantity === 0 ||
      minimumStock === 0 ||
      maximumStock === 0
    ) {
      handleAlertError();
    } else {
      const stockDataToAdd = {
        StockName: stockName,
        Category: category,
        Quantity: quantity,
        Unit: unit,
        MinimumStock: minimumStock,
        MaximumStock: maximumStock,
        InsideQuantityPerUnit: insideQuantity,
        InsideUnit: insideUnit,
        IsInsideQuantityNeeded: isInsideQuantityNeeded,
        Email: userData.email,
      };
      handleAlertSuccess();
      addNewStock(stockDataToAdd); // function ke firebase
    }
    //reset
    setStockName("");
    setCategory("");
    setQuantity(0);
    setUnit("");
    setMinimumStock(0);
    setMaximumStock(0);
    setInsideQuantity(0);
    setinsideUnit("");
    setIsInsideQuantityNeeded(false);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-screen pt-2">
      {/* navigasi bar */}
      <NavbarDefault />
      <div className="flex flex-col justify-center bg-gray-200 mt-4 items-center w-1/2 p-10 rounded-[35px]">
        <div className="flex flex-col justify-center items-start">
          {/* Stock Name */}
          <TextFieldBox
            label="Stock Name"
            value={stockName}
            onChange={handleStockNameChange}
            width="510px"
          />
          {/*  Category */}
          <CustomRadioGroup value={category} onChange={handleCategoryChange} />
          <div className="flex justify-center">
            {/* Quantity */}
            <TextFieldBox label="Quantity" value={quantity} onChange={handleQuantityChange} type="number"  width="150px"/>
            {/* Unit */}
            <SelectBox
              label="Unit"
              value={unit}
              onChange={handleUnitChange}
              required
              minWidth={200}
              options={options}
            />
          </div>
          <div className="flex justify-center">
            {/* Minimum Stock */}
            <TextFieldBox
              label="MinimumStock"
              value={minimumStock}
              onChange={handleMinimumStockChange}
              type="number"
              width="150px"
            />
            {/* Maximum Stock */}
            <TextFieldBox
              label="MaximumStock"
              value={maximumStock}
              onChange={handleMaximumStockChange}
              type="number"
              width="150px"
            />
          </div>
          <div>
            {/* CheckBox */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isInsideQuantityNeeded}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Need Inside Quantity ?"
                sx={{ m: 1 }}
              />
            </FormGroup>
          </div>
          <div className="flex justify-center">
            {/* Inside Quantity */}
            <TextFieldBox
              label="Inside Quantity"
              value={insideQuantity}
              onChange={handleInsideQuantity}
              type="number"
              width="150px"
              disabled={!isInsideQuantityNeeded}
            />
            {/* Inside Unit */}
            <SelectBox
              label="Inside Unit"
              value={insideUnit}
              onChange={handleInsideUnitChange}
              required
              minWidth={200}
              options={options}
              disabled={!isInsideQuantityNeeded}
            />
          </div>
          <div className="flex justify-center  w-full mt-3">
            {/* Send Button  */}
            <ButtonStack onClick={addStockToFirebase} buttonName={"Add"}/>
            {alertSuccess && (
              <div
                className="bg-green-200 border border-green-600 text-green-900 px-4 py-3 rounded absolute"
                role="alert"
              >
                <strong className="font-bold">Berhasil!</strong>
                <span className="block sm:inline">
                  {" "}
                  Data telah terkirim ke Firebase.
                </span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setAlertSuccess(false)}
                >
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.359 5.652a.5.5 0 0 0-.707.707L9.293 10l-3.64 3.641a.5.5 0 0 0 .707.707L10 10.707l3.641 3.641a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.641a.5.5 0 0 0 0-.707z" />
                  </svg>
                </span>
              </div>
            )}
            {/* Allert Gagal */}
            {alertError && (
              <div
                className="bg-red-200 border border-red-600 text-red-900 px-4 py-3 rounded absolute"
                role="alert"
              >
                <strong className="font-bold">Gagal!</strong>
                <span className="block sm:inline">
                  {" "}
                  Harap lengkapi semua bidang.
                </span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setAlertError(false)}
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.359 5.652a.5.5 0 0 0-.707.707L9.293 10l-3.64 3.641a.5.5 0 0 0 .707.707L10 10.707l3.641 3.641a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.641a.5.5 0 0 0 0-.707z" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
