// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.asdjs to start working on your app!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from "react";
// import { createRootNavigator } from "./navigation/AppNavigator";
// import { createAppContainer } from "react-navigation";
// import { Provider, connect } from "react-redux";
// import { store } from "./lib/redux/store";
// import { isSignedIn } from "./auth/auth";

class App extends React.Component {
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
    // const { checkedSignIn, signedIn } = this.state;

    // // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // if (!checkedSignIn) {
    //   return (<Provider store={store}>
    //     <Layout />
    //   </Provider>)
    // }

    // const Layout = createAppContainer(createRootNavigator(signedIn));
    // return (
    //   <Provider store={store}>
    //     <Layout />
    //   </Provider>
    // );
    return (
            <View style={styles.container}>
              <Text>Open up App.asdjs to start working on your app!</Text>
            </View>
          );
  }
}

export default App;