import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import StockPopup from "./FormComponent/StockPopUp";
import { useUserData } from "../Context/getUserData";
import { getStockDataByEmail } from "../Context/firebaseController";
import { useNavigate } from "react-router-dom";


export default function ReactVirtualizedTable() {
  const userData = useUserData();
  const navigate = useNavigate();
  const [stockData, setStockData] = useState([]);
  const [rows, setRows] = useState([]);
  const columns = [
    {
      width: 200,
      label: "Stock Name",
      dataKey: "stockname",
    },
    {
      width: 120,
      label: "Category",
      dataKey: "category",
    },
    {
      width: 120,
      label: "Quantity",
      dataKey: "quantity",
      numeric: true,
    },
    {
      width: 120,
      label: "Unit",
      dataKey: "unit",
    },
    {
      width: 120,
      label: "Inside Quantity Per Unit",
      dataKey: "insideQuantityPerUnit",
      numeric: true,
    },
    {
      width: 120,
      label: "Inside Unit",
      dataKey: "insideunit",
    },
    {
      width: 120,
      label: "Setting",
      dataKey: "setting",
      render: (row, index) => (
        <button className="mt-1" onClick={() => handleButtonEdit(row)} >
          Edit
        </button>
      ),
    },
  ];

  const handleButtonEdit = (stock) => {
    navigate(`/editstock/${stock.id}`);
    console.log("dikerjakan")
  };

  useEffect(() => {
    async function fetchStockData() {
      if (userData && userData.email) {
        console.log("User Email:", userData.email); // Pastikan email ada
        try {
          const data = await getStockDataByEmail(userData.email);
          console.log("Fetched Stock Data:", data); // Periksa data yang diambil
          setStockData(data);
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }
      }
    }

    fetchStockData();
  }, [userData]);

  // Ubah efek useEffect untuk memperbarui rows saat stockData berubah
  useEffect(() => {
    async function updateStockData() {
      if (stockData.length > 0) {
        const updatedRows = stockData.map((stock) => createData(stock));
        setRows([...updatedRows]); // Pastikan pengaturan rows memicu re-rendering
      }
    }
    updateStockData();
  }, [stockData]);

  function createData(stock) {
    return {
      id: stock.id,
      stockname: stock.stockName, // Ubah dari 'stock['Stock Name']' ke 'stock.stockName'
      category: stock.category,
      quantity: stock.quantity,
      unit: stock.unit,
      insideQuantityPerUnit: stock.insideQuantityPerUnit,
      insideunit: stock.insideUnit,
    };
  }
  

  // const handleSaveChanges = async () => {
  //   try {
  //     const updatedDataForFirebase = {
  //       StockName: editedStockData.stockname,
  //       Category: editedStockData.category,
  //       // Tambahkan field lainnya sesuai kebutuhan dengan nama kunci yang sesuai di Firebase
  //     };
  //     await updateStockData(stockData.id, updatedDataForFirebase);
  //     // handleClose()
  //   } catch (error) {
  //     console.error("Error updating stock data:", error);
  //   }
  // };
  return (
    <Paper style={{ height: 400, width: "78.5%", overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                style={{
                  position: "sticky",
                  top: 0,
                  background: "white",
                  zIndex: 1,
                  textAlign: "center",
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.dataKey} style={{ textAlign: "center" }}>
                  {column.dataKey !== "setting"
                    ? row[column.dataKey]
                    : column.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
