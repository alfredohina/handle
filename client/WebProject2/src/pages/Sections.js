import React, { Component } from "react";
import {Box} from "../components/Box";
import { Header } from "../components/Headers";

  
export default class Sections extends Component {

    render() {
    
        return (
            <div>
               <Header title={"Urban Waste"} />
               <div style={{ paddingTop: "130px" }}>
                <Box
                        title={"Urban Waste"}
                        subtitle={"Notify any problem related to urban waste collection"}
                        img={"../images/service1.jpg"}
                        page={"navigation/cont"}
                    />
                    <Box
                        title={"Public Transport"}
                        subtitle={"Indicates problems related to Metro, EMT and Cercanías"}
                        img={"../images/service2.jpg"}
                        page={"/navigation/cont"}
                    />
                    <Box
                        title={"Lighting"}
                        subtitle={"Notify problems related to street lighting"}
                        img={"../images/service3.jpg"}
                        page={"/navigation/cont"}
                    />
                </div>
            </div>
        )
}}
