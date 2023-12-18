
import React from "react";
import { Link } from "react-router-dom";

export default function Button({href}){
    return(
        <Link className="w-36 h-12 rounded-[15px] bg-[#A27B5C] flex justify-center items-center text-white mt-5 font-bold" 
        to = {href}>
            Add New Stock   
        </Link>
    );
}