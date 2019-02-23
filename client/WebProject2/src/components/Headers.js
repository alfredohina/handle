import React from "react";


export const Header = ({ title }) => {

        return (
            <div style={{ right:"0", position:"fixed", zIndex:"1", marginLeft:"-15px", height:"100px", backgroundColor:"#4c71ae", borderBottomRightRadius:"50px", width:"100%"}} >

                <p style={{ padding:"15px", color:"white", fontSize:"50px", textAlign:"center" }} >{title}</p>

            </div>

        );
    
}