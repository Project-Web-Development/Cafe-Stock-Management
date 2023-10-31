import React from "react";
import NavbarDefault from "../Components/NavigationBar";
import Footer from "../Components/Footer"
import { useAuth } from "../Context/AuthContext";
function Home(){
    const { isAuthenticated, user } = useAuth();
    if(isAuthenticated){
        return(
            <div className="mx-7">
                <NavbarDefault/>
                <main>
                    <h1>Home</h1>
                </main>
                <Footer/>
            </div>
        );
    }
}
export default Home;