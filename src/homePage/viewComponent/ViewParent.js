import { Component } from "react";
import { useParams } from "react-router-dom";
import ViewComponent from "./ViewComponent";

const ViewParent=()=>{
    const param=useParams()
    return(
        <ViewComponent id={param.id}/>
    )
}

export default ViewParent