import React, { useState, useCallback  } from "react";
import NavbarDefault from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { getUserDataByEmail } from "../Context/firebaseController";

function Home() {
    const { isAuthenticated, user } = useAuth();
    const [userData, setUserData] = useState(null);
    const getUserData = useCallback(async () => {
      try {
        if (isAuthenticated && user && user.email) {
          const userData = await getUserDataByEmail(user.email);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }, [isAuthenticated, user]);
  
    function callbck(callback) {
      callback(); 
    }
    
    callbck(getUserData);
    
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
  
    return (
      <div>
        <NavbarDefault />
        {userData && (
          <div>
            <p>Hai,  {userData.displayName}</p>

          </div>
        )}
        <Footer />
      </div>
    );
  }
  
  export default Home;