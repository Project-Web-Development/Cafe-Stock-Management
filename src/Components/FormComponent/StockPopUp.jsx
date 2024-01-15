import React, { useState } from "react";


const StockPopup = ({ stockData, handleClose }) => {
  const [editedStockData, setEditedStockData] = useState({
    stockname: stockData.stockname,
    category: stockData.category,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStockData({ ...editedStockData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedDataForFirebase = {
        StockName: editedStockData.stockname,
        Category: editedStockData.category,
        // Tambahkan field lainnya sesuai kebutuhan dengan nama kunci yang sesuai di Firebase
      };
      await updateStockData(stockData.id, updatedDataForFirebase);
      handleClose();
    } catch (error) {
      console.error("Error updating stock data:", error);
    }
  };

  return (
    <div className="popup absolute">
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
        <label>
          Stock Name:
          <input
            type="text"
            name="stockname"
            value={editedStockData.stockname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={editedStockData.category}
            onChange={handleInputChange}
          />
        </label>
        {/* Tambahkan field lainnya sesuai kebutuhan */}
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default StockPopup;
