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
                <form onSubmit={this.handleFormSubmit} style={{ paddingTop: "100px" }}>

                    <div className="field is-horizontal" style={{paddingTop: "40px"}}>
                        <div className="field-label is-normal">
                            <label className="label">Name: </label>
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
                                <input className="input" style={{width: "48%", marginRight:"4%"}} type="text" name="name" value={this.state.marker.location.lat} />
                                <input className="input" style={{width: "48%"}} type="text" name="name" value={this.state.marker.location.lng} />
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



                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <input className="button is-primary" type="submit" value="Submit" />
                        </div>
                        <div className="field-body">
                            <div className="field">

                            </div>
                        </div>
                    </div>

                    
                </form>

<div>
               <Map 
                    google={this.props.google}
                    style={{
                        width: "500px",
                        height: "300px"
                    }}
                    initialCenter={this.state.geoposition.location}
                    center={this.state.geoposition.location}
                    zoom={14}
                    onClick={(t, map, c) =>{ this.addMarker(c.latLng, map)}}
                >
                    <Marker position={this.state.marker.location} />
                </Map>
                {this.state.mapita}
                </div>
            </div>
        )
    }
}

