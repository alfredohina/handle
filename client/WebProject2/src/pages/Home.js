import React from "react";
import { connect } from 'react-redux';

const _Home = ({user})=>{

  return (
      <React.Fragment>
        {user ? <p>Welcome {user.username}</p> : <p> Not logged</p>}
      </React.Fragment>   
  )
}

export const Home = connect(store=>({user:store.user}))(_Home)