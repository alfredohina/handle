import React, { Component } from "react";
import { Map, HeatMap, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { ContsAPI } from "../lib/conts";



const LoadingContainer = (props) => (
    <div>Loading map!</div>
  )

  
  export default class ShowCont extends Component {
      constructor() {
          super();
          this.state = {
              locations: [],
              state: false,
              positions: [
                  { lat: 37.78259481194291, lng: -122.43306307946779 },
                ],
              positions2: [],
              positions3: [],
            };
        }
        
        
        componentDidMount(){
            const type = "plastic"
        ContsAPI.getCont(type)
        .then( cont =>{
            const a= cont.map(e=>({lat:e.lat,lng:e.lng,level:e.level}))
            console.log(a)
            this.setState({ 
                locations: cont,
                positions: a,
                state: true
            })
        })
        .catch( e =>  e);
    }
    


      handlChange(type) {
          console.log(type)
          ContsAPI.getCont(type)
              .then(cont => {
                  const a = cont.map(e => ({ lat: e.lat, lng: e.lng, level: e.level }))
                  console.log(a)
                  const b = []
                  const c = []
                  for (var index = 0; index < a.length; index++) {
                      if (a[index].level === 2) {
                          b.push(a[index])
                      }
                  }
                  this.setState({
                      locations: cont,
                      positions2: b,
                      state: false
                  })
                  for (var index = 0; index < a.length; index++) {
                    if (a[index].level === 3) {
                        c.push(a[index])
                    }
                }
                this.setState({
                    positions3: c
                })
              }).then(() => {
                  this.setState({
                      state: true
                  })
              })

      }


    render() {
        console.log(this.state.positions)

        
        const gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ];
        

        
        const {state, positions2, positions3, positions} = this.state

        return (
            <div>
                <button onClick={() => this.handlChange("organic")}>Organic</button>
                <button onClick={() => this.handlChange("plastic")}>Plastic</button>
                <button onClick={() => this.handlChange("paper")}>Paper</button>
                <button onClick={() => this.handlChange("glass")}>Glass</button>

                
            {!state ? ('a') : (
                <React.Fragment>
    <Map
        style={{
            width: "500px",
            height: "500px"
        }}
        className='map'
        google={this.props.google}
        zoom={11}
        onClick={this.onMapClicked}
        initialCenter={{
            lat: 40.365774408723254,
            lng: -3.662289775146519
        }}
    >

            <HeatMap
            gradient={gradient}
            opacity={1000}
            positions={positions2}
            radius={50}
            />

<HeatMap
            gradient={gradient}
            opacity={1000}
            positions={positions3}
            radius={50}
            />
        
        <HeatMap
            gradient={gradient}
            opacity={1000}
            positions={positions}
            radius={50}
        />
       
    </Map>

</React.Fragment>
    )
}     
</div>
        )
}}

