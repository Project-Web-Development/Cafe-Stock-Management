// File: ButtonStack.js
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const ButtonStack = ({ onClick }) => {
  const handleAddClick = () => {
    onClick();
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        style={{
          width: "9rem", // atau gunakan width: "36px" jika ingin menggunakan ukuran pixel
          height: "3rem", // atau gunakan height: "12px" jika ingin menggunakan ukuran pixel
          borderRadius: "15px",
          backgroundColor: "#A27B5C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
        }}
        endIcon={<AddIcon />}
        onClick={handleAddClick}
      >
        Add
      </Button>
    </Stack>
  );
};

export default ButtonStack;
