import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useUserData } from '../Context/getUserData';
import { getStockDataByEmail } from '../Context/firebaseController';

const columns = [
  {
    width: 200,
    label: 'Stock Name',
    dataKey: 'stockname',
  },
  {
    width: 120,
    label: 'Category',
    dataKey: 'category',
  },
  {
    width: 120,
    label: 'Quantity',
    dataKey: 'quantity',
    numeric: true,
  },
  {
    width: 120,
    label: 'Unit',
    dataKey: 'unit',

  },
  {
    width: 120,
    label: 'Inside Quantity Per Unit',
    dataKey: 'insideQuantityPerUnit',
    numeric: true,
  },
  {
    width: 120,
    label: 'Inside Unit',
    dataKey: 'insideunit',
  },
];

export default function ReactVirtualizedTable() {
  const userData = useUserData();
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    async function fetchStockData() {
      if (userData && userData.email) {
        try {
          const data = await getStockDataByEmail(userData.email);
          setStockData(data);
        } catch (error) {
          console.error('Error fetching stock data:', error);
        }
      }
    }

    fetchStockData();
  }, [userData]);

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

  // Ubah efek useEffect untuk memperbarui rows saat stockData berubah
  useEffect(() => {
    const updatedRows = stockData.map((stock, index) => createData(stock));
    setRows(updatedRows);
  }, [stockData]);

  const [rows, setRows] = useState([]);

  return (
    <Paper style={{ height: 400, width: '78.5%' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.dataKey} >{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row, index) => (
            <TableRow key={index} >
              {columns.map((column) => (
                <TableCell key={column.dataKey}>{row[column.dataKey]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
