import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from "./Pages/Home";
import StockPage  from "./Pages/Stock";
import AddNewStock from "./Pages/AddNewStock";
import EditStock from "./Pages/EditStock";
import RecipePage from "./Pages/Recipe";
import FormAddNewRecipe from "./Pages/FormAddNewRecipe";
import InfoRecipe from "./Pages/InfoRecipe";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Stock" element={<StockPage />} />
        <Route path="/addnewstock" element={<AddNewStock />} />
        <Route path="/editstock/:id" element={<EditStock />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/formAddNewrecipe" element={<FormAddNewRecipe />} />
        <Route path="/infoRecipe/:id" element={<InfoRecipe />} />
      </Routes>
    </Router>
  );
}
export default App;
