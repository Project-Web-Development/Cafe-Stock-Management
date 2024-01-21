import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from "./Pages/Home";
import StockPage from "./Pages/Stock";
import AddNewStock from "./Pages/AddNewStock";
import EditStock from "./Pages/EditStock";
import RecipePage from "./Pages/Recipe";
import FormAddNewRecipe from "./Pages/FormAddNewRecipe";
import InfoRecipe from "./Pages/InfoRecipe";
import { useAuth } from "./Context/AuthContext";

// Buat komponen terpisah untuk menangani autentikasi
function AuthenticatedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  const isUserAuthenticated = isAuthenticated();

  if (!isUserAuthenticated) {
    // Jika tidak terautentikasi, arahkan pengguna kembali ke halaman sign-in
    return <Navigate to="/" />;
  }

  // Jika terautentikasi, render elemen rute yang diinginkan
  return <>{element}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        {/* Gunakan AuthenticatedRoute untuk melindungi rute Home */}
        <Route path="/home" element={<AuthenticatedRoute element={<Home />} />} />
        <Route path="/stock" element={<AuthenticatedRoute element={<StockPage />} />}/>
        <Route path="/addnewstock" element={<AuthenticatedRoute element={<AddNewStock />} />} />
        <Route path="/editstock/:id" element={<AuthenticatedRoute element={<EditStock />} />} />
        <Route path="/recipe" element={<AuthenticatedRoute element={<RecipePage />} />} />
        <Route path="/formAddNewrecipe" element={<AuthenticatedRoute element={<FormAddNewRecipe />} />} />
        <Route path="/infoRecipe/:id" element={<AuthenticatedRoute element={<InfoRecipe />} /> } />
      </Routes>
    </Router>
  );
}

export default App;
