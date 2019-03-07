import React, { Component } from "react";
import { Map, HeatMap, InfoWindow, Marker, GoogleApiWrapper, showInfoWindow } from 'google-maps-react';
import { ContsAPI } from "../lib/conts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'
import { faFemale } from '@fortawesome/free-solid-svg-icons'
import { faMale } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faCity } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { faDumpster } from '@fortawesome/free-solid-svg-icons'
import { Header } from "../components/Headers";
import { ReportAPI } from "../lib/Redux/report";
library.add(faTrash)
library.add(faSun)
library.add(faMoon)
library.add(faMars)
library.add(faVenus)
library.add(faFemale)
library.add(faMale)
library.add(faBuilding)
library.add(faCity)
library.add(faCalendar)
library.add(faCalendarAlt)
library.add(faCalendarDay)
library.add(faCalendarWeek)
library.add(faDumpster)



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
            activatedType: 0,
            activatedDay: 0,
            activatedDistrict: 0,
            activatedGender: 0,
            type: ["organic", "glass", "plastic", "paper"],
            hour: 0,
            gender: ["male", "female"],
            initialCenter: {lat: 40.436811, lng: -3.693741},
            zoom: 12,
            zoomMap: 12
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


    handlState (type, value) {

        if (type) {
            console.log(type)
            this.setState({
            type: type,
            activatedType: value
            })
        } else {
            this.setState({
            type: ["organic", "glass", "plastic", "paper"],
            activatedType: value
            })
        }

    }


    handlHour (type, value) {

        const time = Date.now()
        const dayTs = 86400000

        if (type === 24) {
            console.log(type)
            this.setState({
            hour: time - dayTs,
            activatedDay: value
            })
        } else if (type === 72) {
            this.setState({
            hour: time - (dayTs * 3),
            activatedDay: value
            })
        } else {
            this.setState({
            hour: time - (dayTs * 7),
            activatedDay: value
            })
        }

        console.log(this.state.hour)
    }


    handlDistrict(type, value, zoom) {
        console.log(this.state)
        if (type === "legazpi") {
            this.setState({
            initialCenter: {lat: 40.391534, lng: -3.695268},
            activatedDistrict: value,
            zoom: 14
            })
        } else if (type === "canillejas") {
            this.setState({
            initialCenter: {lat: 40.448838, lng: -3.609025},
            activatedDistrict: value,
            zoom: 14
            })
        } else {
            this.setState({
            initialCenter: {lat: 40.436811, lng: -3.693741},
            activatedDistrict: value,
            zoom: 12
            })
        }
    }


    handlGender (type, value) {

        if (type === "male") {
            this.setState({
            gender: "male",
            activatedGender: value
            })
        } else if (type === "female") {
            this.setState({
            gender: "female",
            activatedGender: value
            })
        } else {
            this.setState({
            gender: ["male", "female"],
            activatedGender: value
            })
        }

    }




    handlChange() {
        
        console.log(this.state.gender)

        ReportAPI.getReportsType(this.state.type, this.state.hour, this.state.gender)
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
                    zoomMap: this.state.zoom,
                    state: false,
                })
            }).then(() => {
                // console.log(this.state)
                this.setState({
                    state: true
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
    

    render() {
        const { google } = this.props;

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

        const { state, positions, positions2, positions3, positions4, positions5, initialCenter, zoomMap } = this.state

        return (
            <div>
                <Header title={"HeatMap Urban Waste"} />
                <div style={{ paddingTop: "100px", display: "block" }}>




                    {!state ? ('') : (
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
                                zoom={zoomMap}
                                onClick={this.onMapClicked}
                                initialCenter={
                                    initialCenter
                                    //CANILLEJAS
                                    //lat: 40.448838,
                                    //</React.Fragment>lng: -3.609025
                                    //MERCAM
                                    // lat: 40.360420,
                                    // lng: -3.665145
                                }
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



                    <div style={{ marginTop: "400px" }} className={'filters-container'}>

                        <p className={'filters-name'}>Type</p>

                        <button
                            className={
                                this.state.activatedType === 0 ? 'filterBtn activated' : ('filterBtn')
                            }
                            onClick={() => this.handlState('', 0)}><FontAwesomeIcon icon="dumpster" style={{ color: "#ff7733", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> All conts
                        </button>
                        <button
                            className={
                                this.state.activatedType === 1 ? 'filterBtn activated' : ('filterBtn')
                            }
                            onClick={() => this.handlState('organic', 1)}><FontAwesomeIcon icon="trash" style={{ color: "#836a4b", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Organic
                        </button>
                        <button
                            className={
                                this.state.activatedType === 2 ? 'filterBtn activated' : 'filterBtn'
                            }
                            onClick={() => this.handlState("plastic", 2)}><FontAwesomeIcon icon="trash" style={{ color: "#e6f04a", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Plastic
                        </button>
                        <button
                            className={
                                this.state.activatedType === 3 ? 'filterBtn activated' : 'filterBtn'
                            }
                            onClick={() => this.handlState("paper", 3)}><FontAwesomeIcon icon="trash" style={{ color: "#3f84ae", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Paper
                        </button>
                        <button
                            className={
                                this.state.activatedType === 4 ? 'filterBtn activated' : 'filterBtn'
                            }
                            onClick={() => this.handlState("glass", 4)}><FontAwesomeIcon icon="trash" style={{ color: "#159a24", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Glass
                        </button>

                    </div>







                    <div className={'filters-container'}>

                    <p className={'filters-name'}>Time</p>

                        <button
                            className={
                            this.state.activatedDay===0 ? 'filterBtn activated' : ('filterBtn')
                            }
                            onClick={() => this.handlHour(0, 0)}><FontAwesomeIcon icon="calendar-alt" style={{ color: "#ff7733", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> All time
                        </button>
                        <button
                            className={
                            this.state.activatedDay===1 ? 'filterBtn activated' : ('filterBtn')
                            }
                            onClick={() => this.handlHour(24, 1)}><FontAwesomeIcon icon="calendar" style={{ color: "#cc4400", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Last 24h
                        </button>
                        <button 
                            className={
                            this.state.activatedDay===2 ? 'filterBtn activated' : 'filterBtn'
                            }
                            onClick={() => this.handlHour(72, 2)}><FontAwesomeIcon icon="calendar-day" style={{ color: "#cc4400", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Last 72h
                        </button>
                        <button
                            className={
                            this.state.activatedDay===3 ? 'filterBtn activated' : 'filterBtn'
                            }
                            onClick={() => this.handlHour(168, 3)}><FontAwesomeIcon icon="calendar-week" style={{ color: "#cc4400", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Last Week
                        </button>

                    </div>





                    <div className={'filters-container'}>

                        <p className={'filters-name'}>District</p>

                        <button
                            className={
                            this.state.activatedDistrict===0 ? 'filterBtn activated' : ('filterBtn')
                            }
                            onClick={() => this.handlDistrict('all', 0)}><FontAwesomeIcon icon="city" style={{ color: "#ff7733", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> All City
                        </button>
                        <button
                            className={
                            this.state.activatedDistrict===1 ? 'filterBtn activated' : ('filterBtn')
                            }
                            onClick={() => this.handlDistrict('canillejas', 1)}><FontAwesomeIcon icon="building" style={{ color: "#4d1a00", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Canillejas
                        </button>
                        <button
                            className={
                            this.state.activatedDistrict===2 ? 'filterBtn activated' : ('filterBtn')
                            }
                            onClick={() => this.handlDistrict('legazpi', 2)}><FontAwesomeIcon icon="building" style={{ color: "#4d1a00", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Legazpi
                        </button>

                    </div>



                    <div className={'filters-container'}>

                        <p className={'filters-name'}>Gender</p>

                        <button
                        className={
                        this.state.activatedGender===0 ? 'filterBtn activated' : ('filterBtn')
                        }
                        onClick={() => this.handlGender('', 0)}><FontAwesomeIcon icon="female" style={{ color: "#ff7733", fontSize: "1.5em", marginBottom: "2px" }} />
                        <FontAwesomeIcon icon="male" style={{ color: "#ff7733", fontSize: "1.5em", marginBottom: "2px" }} />
                        <br></br> All citizens
                    </button>
                    <button
                        className={
                        this.state.activatedGender===1 ? 'filterBtn activated' : ('filterBtn')
                        }
                        onClick={() => this.handlGender('male', 1)}><FontAwesomeIcon icon="mars" style={{ color: "#3399ff", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Male
                    </button>
                    <button
                        className={
                        this.state.activatedGender===2 ? 'filterBtn activated' : ('filterBtn')
                        }
                        onClick={() => this.handlGender('female', 2)}><FontAwesomeIcon icon="venus" style={{ color: "#ff6699", fontSize: "1.5em", marginBottom: "2px" }} /> <br></br> Female
                    </button>

                    </div>

                    <button
                        className={'filterBtn send-btn'}
                        onClick={() => this.handlChange() }> SUBMIT
                    </button>

                </div>

            </div>
        )
    }
}