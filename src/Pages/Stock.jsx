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
    // w-36 h-12 rounded-[15px] bg-[#A27B5C] flex justify-center items-center text-white mt-5 font-bold
    return (
        <div className="bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-screen pt-5 ">
            <NavbarDefault/>
            <div className="flex flex-col items-center mt-4 ">
                <StockTable/>
                <Button href={'/addnewstock'} className={"w-36 h-12 rounded-[15px] bg-[#A27B5C] flex justify-center items-center text-white mt-5 font-bold"} buttonName={"Add New Stock"}/>
            </div>
        </div>
    );
}

export default StockPage;