import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate, } from "react-router";
import NavbarDefault from "../Components/NavigationBar";
import ReactVirtualizedTable from "../Components/Table";
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
        <div>
            <NavbarDefault/>
            <div className="flex flex-col items-center mt-4">
                <ReactVirtualizedTable/>
                <Button href={'/addnewstock'}/>
            </div>

        </div>
    );
}

export default StockPage;