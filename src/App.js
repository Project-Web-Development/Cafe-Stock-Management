import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from "./Pages/Home";
import  AddStockPage  from "./Pages/AddStock";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AddStock" element={<AddStockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
