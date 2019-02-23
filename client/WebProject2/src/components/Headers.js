import React from "react";


export const Header = ({ title }) => {

        return (
            <div style={{position:"fixed", zIndex:"1"}}>
                <div style={{ right:"0", position:"fixed", zIndex:"1", marginLeft:"-15px", height:"100px", backgroundColor:"#4c71ae", borderBottomRightRadius:"50px", width:"100%"}} >
                    <p style={{ padding:"15px", color:"white", fontSize:"50px", textAlign:"center" }}>{title}</p>
                </div>
                <div style={{ paddingTop: "100px" }}>
                    <div><img src="../images/backHeader.png" style={{ marginLeft:"-15px"}} /></div>
                </div>
            </div>
        );
    
}