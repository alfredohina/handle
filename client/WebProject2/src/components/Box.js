import React from "react";


export const Box = ({ title, subtitle, img, page  }) => {

        return (
            <div style={{ display:"inline-block", boxShadow:"5px 10px 20px 0px rgba(0,0,0,.1)", borderRadius: "10px", width:"30%", margin:"10px"}} >

                <a href={page}>

                    <img
                    style={{display:"block", margin:"auto", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", width:"100%" }}
                    src={img}/>
                            
                    <div class="card-content">

                        <div class="title">{title}</div>
                        <div class="description" style={{overflow:"hidden", color:"#4c71ae", marginTop:"-10px"}}>{subtitle}</div>
                    </div>
                </a>

            </div>

        );
    
}
