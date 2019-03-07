import React, { Component } from "react";
import { Map, HeatMap, InfoWindow, Marker, GoogleApiWrapper, showInfoWindow } from 'google-maps-react';
import { ContsAPI } from "../lib/conts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { Header } from "../components/Headers";
import { ReportAPI } from "../lib/Redux/report";
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
            activated: null,
            type: null
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
        console.log(type, value)


        if (type) {
            console.log(type)
            this.setState({
            type: type,
            })
        } else {
            this.setState({
            type: ["organic", "glass", "plastic", "paper"]
            })
        }

        console.log(this.state.type, value)

        ReportAPI.getReportsType(this.state.type)
            .then(cont => {
                const positions = cont.map(e => ({ lat: e.lat, lng: e.lng }))
                // console.log(positions)
                var counts = {};
                var def = []
                positions.forEach(function(x) {
                    var levelDef = counts[x.lat] = (counts[x.lat] || 0) + 1;
                    var lat = x.lat
                    var lng = x.lng
                    def.push({ lat, lng, levelDef })
                });

                def.sort((a,b) => (a.levelDef > b.levelDef) ? -1 : ((b.levelDef > a.levelDef) ? 1 : 0)); 


                var positionsSearch = []
                
                function getUnique(arr, comp) {
                    // console.log(arr)
                    const unique = arr
                    .map(e => e[comp])
                    .map((e, i, final) => final.indexOf(e) === i && i)
                    .filter(e => arr[e]).map(e => arr[e]);
                    // console.log(unique)
                    return positionsSearch.push(unique);
                }
                getUnique(def, 'lat')
                
            // console.log(positionsSearch[0])

                const b = []
                const c = []
                const d = []
                const e = []
                for (var index = 0; index < positionsSearch[0].length; index++) {
                    if (positionsSearch[0][index].levelDef >= 0 && positionsSearch[0][index].levelDef <= 5) {
                        b.push(positionsSearch[0][index])
                    }
                }
                for (var index = 0; index < positionsSearch[0].length; index++) {
                    if (positionsSearch[0][index].levelDef >= 6 && positionsSearch[0][index].levelDef <= 10) {
                        c.push(positionsSearch[0][index])
                    }
                }
                for (var index = 0; index < positionsSearch[0].length; index++) {
                    if (positionsSearch[0][index].levelDef >= 11 && positionsSearch[0][index].levelDef <= 15) {
                        d.push(positionsSearch[0][index])
                    }
                }
                for (var index = 0; index < positionsSearch[0].length; index++) {
                    if (positionsSearch[0][index].levelDef >= 16) {
                        e.push(positionsSearch[0][index])
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
                // console.log(this.state)
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
                                    //CANILLEJAS
                                    lat: 40.448838,
                                    lng: -3.609025
                                    //MERCAM
                                    // lat: 40.360420,
                                    // lng: -3.665145
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
                        onClick={() => this.handlChange('', 1)}><FontAwesomeIcon icon="trash" style={{ color: "#836a4b", fontSize: "1.5em" }} /> SHOW ALL
                    </button>
                    <button
                        style={{ padding: "15px", borderRadius: "12px", fontSize: "15px" }}
                        className={
                            this.state.activated === 1 ? 'activated' : ('inactive')
                        }
                        onClick={() => this.handlChange('organic', 1)}><FontAwesomeIcon icon="trash" style={{ color: "#836a4b", fontSize: "1.5em" }} /> Organic
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

