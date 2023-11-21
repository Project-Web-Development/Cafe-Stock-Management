import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate, } from "react-router";

function AddStockPage(){
    const { isAuthenticated } = useAuth();
    const isUserAuthenticated = isAuthenticated();
    console.log(isUserAuthenticated);
    if (!isUserAuthenticated) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <h1>Add Stock Page</h1>
        </div>
    );
}

export default AddStockPage;