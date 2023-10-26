import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
