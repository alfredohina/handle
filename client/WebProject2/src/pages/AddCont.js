import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)



export class AddCont extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            tagline: "",
            description: "",
            first_brewed: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            geoposition: {},
            marker: {}
        };
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        const name = this.state.name;
        const tagline = this.state.tagline;
        const description = this.state.description;
        const first_brewed = this.state.first_brewed;
        console.log(this.state.marker.location, tagline)
    }



    // handleChange = (e) => {
    //     this.setState({ name: e.target.value1, tagline: e.target.value2, description: e.target.value3, first_brewed: e.target.value4 });
    // };


    async componentDidMount() {
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
        console.log(this.state.marker.location)
        this.setState(prev => ({
            marker: {
                ...prev.marker,
                location
            }
        }));
    };

    render() {
        const {name} = this.state;
        return (
            <div>

                <form onSubmit={this.handleFormSubmit}>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Location: </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control" style={{width: "70%"}}>
                                <input className="input" type="text" name="name" value={this.state.marker.location} onChange={e => this.setState({name:e.target.value})} />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Tags: </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control" style={{width: "70%"}}>
                                <input className="input" type="text" name="tagline" value={this.state.tagline} onChange={e => this.setState({tagline:e.target.value})} />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Description: </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control" style={{width: "70%"}}>
                                <input className="input" type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Type: </label>
                        </div>
                        <div className="field-body">
                            <div class="control">
                                <label class="radio" style={{marginRight:"15px"}}>
                                    <input type="radio" name="type" value="organic"/>
                                    &nbsp; <FontAwesomeIcon icon="trash" style={{color:"#836a4b", fontSize:"1.5em"}} />  Organic
                                </label>
                                <label class="radio" style={{marginRight:"15px"}}>
                                    <input type="radio" name="type" value="plastic" />
                                    &nbsp; <FontAwesomeIcon icon="trash" style={{color:"#e6f04a", fontSize:"1.5em"}} /> Plastic
                                </label>
                                <label class="radio" style={{marginRight:"15px"}}>
                                    <input type="radio" name="type" value="glass" />
                                    &nbsp; <FontAwesomeIcon icon="trash" style={{color:"#159a24", fontSize:"1.5em"}} /> Glass
                                </label>
                                <label class="radio" style={{marginRight:"15px"}}>
                                    <input type="radio" name="type" value="paper" />
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

<div style={{marginLeft:"405px"}}>
                <Map 
                    google={this.props.google}
                    style={{
                        width: "500px",
                        height: "500px"
                    }}
                    initialCenter={this.state.geoposition.location}
                    center={this.state.geoposition.location}
                    zoom={14}
                    onClick={(t, map, c) => this.addMarker(c.latLng, map)}
                >
                    <Marker position={this.state.marker.location} />
                </Map>
                </div>
            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyAU3EUjvc0pieMBfL77Qd0dHvQN5QUPSSg")
})(AddCont)