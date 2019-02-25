import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ContsAPI } from "../lib/conts";
import { Header } from "../components/Headers";

library.add(faTrash)

const LoadingContainer = (props) => (
    <div>Loading map!</div>
  )


export default class AddCont extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            lat: "",
            lng: "",
            type: "",
            level: 0,
            error: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            geoposition: {},
            marker: {
                location: {
                    lat: "",
                    lng: ""
                }
            },
        };
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { name, lat, lng, type, level } = this.state;
        console.log(name, lat, lng, type, level)

        ContsAPI.addCont(name, lat, lng, type, level)
            // .then(data => {
            //     dispatch(login(data))
            // });
            // history.push("/");
        };


    async componentDidMount() {
        console.log(this.state.geoposition.location)
        const { lat, lng } = await this.getcurrentLocation();
        this.setState(prev => ({
            geoposition: {
                ...prev.geoposition,
                location: {
                    lat,
                    lng
                }
            },
            marker: {
                ...prev.geoposition,
                location: {
                    lat,
                    lng
                }
            },
            currentLocation: {
                lat,
                lng
            }
        }));
    }


    getcurrentLocation() {
        if (navigator && navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    resolve({
                        lat: coords.latitude,
                        lng: coords.longitude
                    });
                });
            });
        }
        return {
            lat: 0,
            lng: 0
        };
    }


    addMarker = (location, map, c) => {
        this.setState( {
            marker: {
                location:{
                lat:location.lat(),
                lng:location.lng()}
            },
            lat:location.lat(),
            lng:location.lng()
        });
    };

    render() {

        return (
            <div>
                <Header title={"Add New Container"} />

                <div style={{ display:"block", paddingTop: "100px" }}>
               <Map 
                    disableDefaultUI= "false"
                    google={this.props.google}
                    style={{
                        marginTop: "-40px",
                        marginLeft: "-20px",
                        width: "74%",
                        height: "400px",
                        borderBottomRightRadius: "40px"
                    }}
                    // initialCenter={this.state.geoposition.location}
                    initialCenter={{
                        lat: 40.4475031,
                        lng: -3.6119417
                    }}
                    center={this.state.geoposition.location}
                    zoom={14}
                    onClick={(t, map, c) =>{ this.addMarker(c.latLng, map)
                    console.log(c)}}
                >
                    <Marker position={this.state.marker.location} />
                </Map>
                {/* {this.state.mapita} */}
                </div>

                    <div style={{ display:"block"}}>
                <form onSubmit={this.handleFormSubmit} style={{ paddingTop: "350px" }}>

                    <div className="field is-horizontal" style={{paddingTop: "40px"}}>
                        <div className="field-label is-normal">
                            <label className="label">Name / Street: </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control" style={{width: "70%"}}>
                                <input className="input" type="text" onChange={e => this.setState({name:e.target.value})} />
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Location: </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control" style={{width: "70%"}}>
                                <input className="input" style={{opacity: "0.2", width: "48%", marginRight:"4%"}} type="text" name="name" value={this.state.marker.location.lat} />
                                <input className="input" style={{opacity: "0.2", width: "48%"}} type="text" name="name" value={this.state.marker.location.lng} />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Type: </label>
                        </div>
                        <div className="field-body">
                            <div className="control">
                                <label className="radio" style={{marginRight:"15px"}}>
                                    <input type="radio" name="type" value="organic" onChange={e => this.setState({type:e.target.value})} />
                                    &nbsp; <FontAwesomeIcon icon="trash" style={{color:"#836a4b", fontSize:"1.5em"}} />  Organic
                                </label>
                                <label className="radio" style={{marginRight:"15px"}}>
                                    <input type="radio" name="type" value="plastic" onChange={e => this.setState({type:e.target.value})} />
                                    &nbsp; <FontAwesomeIcon icon="trash" style={{color:"#e6f04a", fontSize:"1.5em"}} /> Plastic
                                </label>
                                <label className="radio" style={{marginRight:"15px"}}>
                                    <input type="radio" name="type" value="glass" onChange={e => this.setState({type:e.target.value})} />
                                    &nbsp; <FontAwesomeIcon icon="trash" style={{color:"#159a24", fontSize:"1.5em"}} /> Glass
                                </label>
                                <label className="radio" style={{marginRight:"15px"}}>
                                    <input type="radio" name="type" value="paper" onChange={e => this.setState({type:e.target.value})} />
                                    &nbsp; <FontAwesomeIcon icon="trash" style={{color:"#3f84ae", fontSize:"1.5em"}} /> Paper
                                </label>
                            </div>
                        </div>


                    </div>
                        <div style={{marginTop:"30px"}}>
                            <button className="button is-info" style={{color: "#fff", margin: "auto", display:"block", backgroundColor: "#4c71ae"}} type="submit" value="Submit">Create Container</button>
                        </div>


                    
                </form>
                </div>
            </div>
        )
    }
}

