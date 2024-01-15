import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStockById, updateStockData } from "../Context/firebaseController";
import { deleteStock } from "../Context/firebaseController";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
//Import Keperluan Data User ==========================

//import Component ====================================
import NavbarDefault from "../Components/NavigationBar";
import TextFieldBox from "../Components/FormComponent/TextFieldBox";
import CustomRadioGroup from "../Components/FormComponent/RadioGroup";
import SelectBox from "../Components/FormComponent/SelectBox";
// import CheckboxControl from "../Components/FormComponent/CheckBoxControl";
import ButtonStack from "../Components/FormComponent/SendButton";
//=====================================================

export default function EditStock() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [messageAlert, setMessageAlert] = useState("")
  const options = [
    { value: "Pieces", label: "Pieces (Pcs)" },
    { value: "Kilogram", label: "Kilogram (Kg)" },
    { value: "Gram", label: "Gram (g)" },
    { value: "Liter", label: "Liter (L)" },
    { value: "Meter", label: "Meter (m)" },
    { value: "Centimeter", label: "Centimeter (cm)" },
    { value: "Boxes", label: "Boxes (Box)" },
  ];

  const [stockData, setStockData] = useState({
    stockName: "",
    category: "",
    quantity: 0,
    unit: "",
    minimumStock: 0,
    maximumStock: 0,
    isInsideQuantityNeeded: false,
    insideQuantityPerUnit: 0,
    insideUnit: "",
  });
  console.log(stockData)

  useEffect(() => {
    async function fetchStockData() {
      try {
        const data = await getStockById(id);
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }

    fetchStockData();
  }, [id]);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setStockData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleCheckboxChange = () => {
    setStockData({
      ...stockData,
      isInsideQuantityNeeded: !stockData.isInsideQuantityNeeded,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedDataForFirebase = {
        StockName: stockData.stockName,
        Category: stockData.category,
        Quantity: stockData.quantity,
        Unit: stockData.unit,
        InsideQuantityPerUnit: stockData.insideQuantityPerUnit,
        InsideUnit: stockData.insideUnit,
        MaximumStock: stockData.maximumStock,
        MinimumStock: stockData.minimumStock
        // Tambahkan field lainnya sesuai kebutuhan dengan nama kunci yang sesuai di Firebase
      };
      await updateStockData(id, updatedDataForFirebase);
      handleAlertSuccess()
      // handleClose()
    } catch (error) {
        handleAlertError();
      console.error("Error updating stock data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStock(id);
      
      handleAlertSuccess()
      // Redirect ke halaman sebelumnya setelah menghapus
      
    } catch (error) {
    handleAlertError();
      console.error("Error deleting stock data:", error);
    }
  };
  const handleAlertError = (message = "Perika Koneksi Anda Coba Lagi !!!") => {
    setAlertError(true);
    setMessageAlert(message)
    setTimeout(() => {
      setAlertError(false);
    }, 3000);
  };
  
  // Menampilkan pesan sukses selama 4 detik
  const handleAlertSuccess = (message = "Yeay berhasil TerUpdate !!!") => {
    setAlertSuccess(true);
    setMessageAlert(message);
    setTimeout(() => {
      setAlertSuccess(false);
      navigate(-1);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-screen pt-2">
      {/* Navigasi bar */}
      <NavbarDefault />
      <div className="flex flex-col justify-center bg-gray-200 mt-4 items-center w-1/2 p-10 rounded-[35px]">
        <div className="flex flex-col justify-center items-start">
          {/* Stock Name */}
          <TextFieldBox
            label="Stock Name"
            value={stockData.stockName}
            onChange={(e) => handleInputChange(e, "stockName")}
            width="510px"
          />
          {/* Category */}
          <CustomRadioGroup
            value={stockData.category}
            onChange={(e) => handleInputChange(e, "category")}
          />
          <div className="flex justify-center">
            {/* Quantity */}
            <TextFieldBox
              label="Quantity"
              value={stockData.quantity}
              onChange={(e) => handleInputChange(e, "quantity")}
              type="number"
              width="150px"
            />
            {/* Unit */}
            <SelectBox
              label="Unit"
              value={stockData.unit}
              onChange={(e) => handleInputChange(e, "unit")}
              required
              minWidth={200}
              options={options}
            />
          </div>
          <div className="flex justify-center">
            {/* Minimum Stock */}
            <TextFieldBox
              label="Minimum Stock"
              value={stockData.minimumStock}
              onChange={(e) => handleInputChange(e, "minimumStock")}
              type="number"
              width="150px"
            />
            {/* Maximum Stock */}
            <TextFieldBox
              label="Maximum Stock"
              value={stockData.maximumStock}
              onChange={(e) => handleInputChange(e, "maximumStock")}
              type="number"
              width="150px"
              style={{ marginTop: "10px" }} // Sesuaikan nilai marginTop sesuai kebutuhan
            />
          </div>
          <div>
            {/* CheckBox */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stockData.isInsideQuantityNeeded}
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
              value={stockData.insideQuantityPerUnit}
              onChange={(e) => handleInputChange(e, "insideQuantityPerUnit")}
              type="number"
              width="150px"
              disabled={!stockData.isInsideQuantityNeeded}
            />
            {/* Inside Unit */}
            <SelectBox
              label="Inside Unit"
              value={stockData.insideUnit}
              onChange={(e) => handleInputChange(e, "insideUnit")}
              required
              minWidth={200}
              options={options}
              disabled={!stockData.isInsideQuantityNeeded}
            />
          </div>
          <div className="flex justify-center w-full mt-3">
            {/* Send Button */}
            <ButtonStack onClick={handleSaveChanges} buttonName={"Save"} />
            <ButtonStack onClick={handleDelete} buttonName={"Remove"} />
            {alertSuccess && (
              <div
                className="bg-green-200 border border-green-600 text-green-900 px-4 py-3 rounded absolute"
                role="alert"
              >
                <strong className="font-bold">Berhasil!</strong>
                <span className="block sm:inline">
                  {" "}
                  {messageAlert}
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
            {/* Alert Gagal */}
            {alertError && (
              <div
                className="bg-red-200 border border-red-600 text-red-900 px-4 py-3 rounded absolute"
                role="alert"
              >
                <strong className="font-bold">Gagal!</strong>
                <span className="block sm:inline">
                  {" "}
                  {messageAlert}
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
