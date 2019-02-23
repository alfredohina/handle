import React, { Component } from "react";


class Input extends Component {
  render() {
    return (
      <div>
       <input
       style={{margin:"5px", width:"80%"}}
       className='input'
       onChange={this.props.onChange}
       placeholder={this.props.placeholder}
       type={this.props.type}
     />
     </div>
     
    );
  }
}
export default Input;
