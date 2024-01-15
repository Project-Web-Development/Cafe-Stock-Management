// File: ButtonStack.js
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const ButtonStack = ({ onClick, buttonName }) => {
  const handleButtonClick = () => {
    onClick();
  };

  let icon;
  let buttonColor = "#A27B5C"; // Warna default
  let iconSize = 20; // Ukuran ikon

  switch (buttonName) {
    case 'Add':
      icon = <AddIcon sx={{ fontSize: iconSize }} />;
    
      break;
    case 'Remove':
      icon = <DeleteForeverIcon sx={{ fontSize: iconSize }} />;
      buttonColor = "#C22B11"; // Warna merah untuk tombol hapus
      break;
    case 'Save':
      icon = <SaveAltIcon sx={{ fontSize: iconSize }} />;
      buttonColor = "#375C3B"
      break;
    default:
      icon = null;
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        style={{
          width: "9rem",
          height: "3rem",
          borderRadius: "15px",
          backgroundColor: buttonColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
          margin: "0 10px", // Memberikan margin antar tombol
        }}
        endIcon={icon}
        onClick={handleButtonClick}
      >
        {buttonName}
      </Button>
    </Stack>
  );
};

export default ButtonStack;
