import React, { Component } from "react";
import { Map, Polygon, HeatMap, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { ContsAPI } from "../lib/conts";


export class Demoshow extends Component {
    constructor() {
        super();
        this.state = {
          locations: []
        };
      }

      getCont(){
          const {locations} = this.state;
          ContsAPI.getCont(locations)
          .then( cont =>{
              this.setState({ locations: cont })
              console.log(this.state.locations);
        })
        .catch( e =>  e);
    }


    render() {
    

        return (
            <div>
              <button onClick={() => this.getCont()}>DO IT</button>

              {this.state.locations.map((c, index) => (
                <div>
                    <h1>{c.name}</h1>
                    <p>{c.lat}</p>
                </div>
            ))}
            </div>
        )
    }

}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyAU3EUjvc0pieMBfL77Qd0dHvQN5QUPSSg"),
    libraries: ['visualization']
})(Demoshow)