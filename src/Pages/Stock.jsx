import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate, } from "react-router";
import NavbarDefault from "../Components/NavigationBar";
import StockTable from "../Components/Table";
import Button from "../Components/Button";
function 
StockPage(){
    const { isAuthenticated } = useAuth();
    const isUserAuthenticated = isAuthenticated();
    console.log(isUserAuthenticated);
    if (!isUserAuthenticated) {
        return <Navigate to="/" />;
    }
    return (
        <div className="bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-screen pt-5 ">
            <NavbarDefault/>
            <div className="flex flex-col items-center mt-4 ">
                <StockTable/>
                <Button href={'/addnewstock'}/>
            </div>

        </div>
    );
}

export default StockPage;