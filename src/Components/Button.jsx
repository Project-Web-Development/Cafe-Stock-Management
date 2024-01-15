import React from "react";
import { Link} from "react-router-dom";

export default function Button({ href, className, buttonName, onClick}) {
  
  return (
    <Link className={className} to={href} onClick={onClick}>
      {buttonName}
    </Link>
  );
}
