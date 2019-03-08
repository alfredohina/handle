import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class _Message extends Component {
    constructor() {
        super()
        this.state = {}
    }


    handleFormSubmit = () => {
        const { dispatch } = this.props;
        dispatch({
            type:"NO_MESSAGE"
        })
        };


    render() {
console.log(this.props)
        return (
            <div className={"green-message"}>
                <p>Created</p>
                <p onClick={this.handleFormSubmit}>CLOSE</p>
            </div>
        );

    }
}

export const Message = withRouter(connect(store => ({ message: store.message }))(_Message));
