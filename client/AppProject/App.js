import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { isSignedIn } from "./auth/auth";
import { createAppContainer } from "react-navigation";
import { createRootNavigator } from "./router";
import { Provider, connect } from "react-redux";
import { store } from "./src/lib/redux/store";


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(e => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createAppContainer(createRootNavigator());
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}