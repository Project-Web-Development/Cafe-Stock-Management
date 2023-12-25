import React from "react";
import NavbarDefault from "../Components/NavigationBar";
// import { useAuth } from "../Context/AuthContext";
// import { Navigate } from "react-router-dom";
// import { getUserDataByEmail } from "../Context/firebaseController";
import { useUserData } from '../Context/getUserData';
import { Navigate } from "react-router-dom";

function Home() {
  const userData = useUserData();
  if(!useUserData){
    return <Navigate to="/" />
  }
  
    return (
      <div className="bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-screen pt-2">
        <NavbarDefault />
        {userData && (
          <div>
            <p>Hai,  {userData.displayName}</p>

          </div>
        )}
      </div>
    );
  }
  
  export default Home;