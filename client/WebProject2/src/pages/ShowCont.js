import React, { Component } from "react";
import { Map, HeatMap, InfoWindow, Marker, GoogleApiWrapper, showInfoWindow } from 'google-maps-react';
import { ContsAPI } from "../lib/conts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { Header } from "../components/Headers";
library.add(faTrash)
library.add(faSun)
library.add(faMoon)



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
            positions4: [],
            positions5: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            activated: null
        };
    }


    componentDidMount() {
        ContsAPI.getCont()
            .then(cont => {
                const a = cont.map(e => ({ lat: e.lat, lng: e.lng, level: e.level }))
                // console.log(a)
                this.setState({
                    locations: cont,
                    positions: a,
                    state: true
                })
                console.log(this.state.locations)
            })
            .catch(e => e);
    }


    handlChange(type, value) {
        console.log(type)
        ContsAPI.getContSearch(type)
            .then(cont => {
                const a = cont.map(e => ({ lat: e.lat, lng: e.lng, level: e.level }))
                console.log(a)
                const b = []
                const c = []
                const d = []
                const e = []
                for (var index = 0; index < a.length; index++) {
                    if (a[index].level >= 0 && a[index].level <= 5) {
                        b.push(a[index])
                    }
                }
                for (var index = 0; index < a.length; index++) {
                    if (a[index].level >= 6 && a[index].level <= 10) {
                        c.push(a[index])
                    }
                }
                for (var index = 0; index < a.length; index++) {
                    if (a[index].level >= 11 && a[index].level <= 15) {
                        d.push(a[index])
                    }
                }
                for (var index = 0; index < a.length; index++) {
                    if (a[index].level >= 16) {
                        e.push(a[index])
                    }
                }
                this.setState({
                    locations: cont,
                    positions2: b,
                    positions3: c,
                    positions4: d,
                    positions5: e,
                    state: false
                })
            }).then(() => {
                console.log(this.state.activated)
                this.setState({
                    state: true,
                    activated: value
                })
            })
    }

    handlChangeAll(type, value) {
        console.log(type)
        ContsAPI.getCont()
            .then(cont => {
                const a = cont.map(e => ({ lat: e.lat, lng: e.lng, level: e.level }))
                console.log(a)
                const b = []
                const c = []
                const d = []
                const e = []
                for (var index = 0; index < a.length; index++) {
                    if (a[index].level >= 0 && a[index].level <= 5) {
                        b.push(a[index])
                    }
                }
                for (var index = 0; index < a.length; index++) {
                    if (a[index].level >= 6 && a[index].level <= 10) {
                        c.push(a[index])
                    }
                }
                for (var index = 0; index < a.length; index++) {
                    if (a[index].level >= 11 && a[index].level <= 15) {
                        d.push(a[index])
                    }
                }
                for (var index = 0; index < a.length; index++) {
                    if (a[index].level >= 16) {
                        e.push(a[index])
                    }
                }
                this.setState({
                    locations: cont,
                    positions2: b,
                    positions3: c,
                    positions4: d,
                    positions5: e,
                    state: false
                })
            }).then(() => {
                console.log(this.state.activated)
                this.setState({
                    state: true,
                    activated: value
                })
            })
    }



    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        }
        );

    renderMarkers() {
        return this.state.locations.map((location, i) => {
            return <Marker
                key={i}
                onClick={this.onMarkerClick}
                title={location.name}
                position={{ lat: location.lat, lng: location.lng }}
                icon={{
                    url: "../images/icon.png"
                }}
                name={location.name} />
        })
    }

    renderInfowindow() {
        return this.state.locations.map(() => {
            return <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
                <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        })
    }
    
    pruebas() {
        console.log(this.props.google.maps)
    }
    
    

    render() {
        const { google } = this.props;
        console.log(google)

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

        const { state, positions, positions2, positions3, positions4, positions5 } = this.state

        return (
            <div>
                <Header title={"HeatMap Urban Waste"} />
                <div style={{ paddingTop: "100px", display: "block" }}>




                    {!state ? ('a') : (
                        <React.Fragment>
                            <Map
                                disableDefaultUI="false"
                                containerStyle={{
                                    marginTop: "-40px",
                                    marginLeft: "-20px",
                                    width: "74%",
                                    height: "400px",
                                    borderRadius: "40px"
                                }}
                                className='map'
                                google={this.props.google}
                                zoom={14}
                                onClick={this.onMapClicked}
                                initialCenter={{
                                    lat: 40.360420,
                                    lng: -3.665145
                                }}
                                >
                                <HeatMap
                                    gradient={gradient}
                                    opacity={1000}
                                    positions={positions}
                                    radius={2}
                                />

                                <HeatMap
                                    gradient={gradient}
                                    opacity={1000}
                                    positions={positions2}
                                    radius={5}
                                />

                                <HeatMap
                                    gradient={gradient}
                                    opacity={1000}
                                    positions={positions3}
                                    radius={8}
                                />

                                <HeatMap
                                    gradient={gradient}
                                    opacity={1000}
                                    positions={positions4}
                                    radius={10}
                                />

                                <HeatMap
                                    gradient={gradient}
                                    opacity={1000}
                                    positions={positions5}
                                    radius={12}
                                />

                                { this.renderMarkers() }
                                { this.renderInfowindow() }

                            </Map>

                        </React.Fragment>
                    )
                    }

                </div>

                <div style={{ display: "block", marginTop: "400px" }}>
                    <button
                        style={{ padding: "15px", borderRadius: "12px", fontSize: "15px" }}
                        className={
                            this.state.activated === 1 ? 'activated' : ('inactive')
                        }
                        onClick={() => this.handlChangeAll()}><FontAwesomeIcon icon="trash" style={{ color: "#836a4b", fontSize: "1.5em" }} /> SHOW ALL
                    </button>
                    <button
                        style={{ padding: "15px", borderRadius: "12px", fontSize: "15px" }}
                        className={
                            this.state.activated === 1 ? 'activated' : ('inactive')
                        }
                        onClick={() => this.handlChange("organic", 1)}><FontAwesomeIcon icon="trash" style={{ color: "#836a4b", fontSize: "1.5em" }} /> Organic
                    </button>
                    <button
                        style={{ padding: "15px", borderRadius: "12px" }}
                        className={
                            this.state.activated === 2 ? 'activated' : 'inactive'
                        }
                        onClick={() => this.handlChange("plastic", 2)}><FontAwesomeIcon icon="trash" style={{ color: "#e6f04a", fontSize: "1.5em" }} /> Plastic
                    </button>
                    <button
                        style={{ padding: "15px", borderRadius: "12px" }}
                        className={
                            this.state.activated === 3 ? 'activated' : 'inactive'
                        }
                        onClick={() => this.handlChange("paper", 3)}><FontAwesomeIcon icon="trash" style={{ color: "#3f84ae", fontSize: "1.5em" }} /> Paper
                    </button>
                    <button
                        style={{ padding: "15px", borderRadius: "12px" }}
                        className={
                            this.state.activated === 4 ? 'activated' : 'inactive'
                        }
                        onClick={() => this.handlChange("glass", 4)}><FontAwesomeIcon icon="trash" style={{ color: "#159a24", fontSize: "1.5em" }} /> Glass
                    </button>
                </div>

<button onClick={() => console.log(this.props.google.maps.LatLngBounds())}>PRUEBAS</button>
                {/*                 <div style={{ display: "block", marginTop: "00px" }}>
                    <button
                        style={{ padding: "15px", borderRadius:"12px" }}
                        className={
                        this.state.activated===1 ? 'activated' : ('inactive')
                        }
                        onClick={() => this.handlChange("organic", 1)}><FontAwesomeIcon icon="sun" style={{ color: "#ff7733", fontSize: "1.5em" }} /> Mañana
                    </button>
                    <button 
                        style={{ padding: "15px", borderRadius:"12px" }}
                        className={
                        this.state.activated===2 ? 'activated' : 'inactive'
                        }
                        onClick={() => this.handlChange("plastic", 2)}><FontAwesomeIcon icon="sun" style={{ color: "#cc4400", fontSize: "1.5em" }} /> Tarde
                    </button>
                    <button
                        style={{ padding: "15px", borderRadius:"12px" }}
                        className={
                        this.state.activated===3 ? 'activated' : 'inactive'
                        }
                        onClick={() => this.handlChange("paper", 3)}><FontAwesomeIcon icon="moon" style={{ color: "#4d1a00", fontSize: "1.5em" }} /> Noche
                    </button>
                </div> */}


            </div>
        )
    }
}

