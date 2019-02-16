import React, { Component } from "react";
import { Map, HeatMap, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { ContsAPI } from "../lib/conts";



const LoadingContainer = (props) => (
    <div>Loading map!</div>
  )

  
  export default class AddCont extends Component {
      constructor() {
          super();
          this.state = {
              locations: [],
              positions: [
                  { lat: 37.78259481194291, lng: -122.43306307946779 },
                ],
                state: false,
                state2: false,
            };
        }
        
        
        componentDidMount(){
        const {locations} = this.state;
        let that = this
        ContsAPI.getCont(locations)
        .then( cont =>{
            const a= cont.map(e=>({lat:e.lat,lng:e.lng}))
            console.log(a)
            that.setState({ 
                locations: cont,
                positions: a,
                state: true
            })
        })
        .catch( e =>  e);
    }
    


    handleChange = (e) => {
        this.setState({ 
            state: true,
            state2: false,
            positions: [
                { lat: 40.365774408723254, lng: -3.662289775146519 },
            ],
        })
      };

      handleClose = (e) => {
        this.setState({
            state: false,
            state2: true,
            positions: [
                { lat: 41.365774408723254, lng: -3.662289775146519 },
            ]
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
        

        
        const {state, state2, positions} = this.state

        return (
            <div>
            {!state ? ('a') : (
                <React.Fragment>
    <Map
        style={{height: '100%', width: '100%', position: 'relative'}}
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

