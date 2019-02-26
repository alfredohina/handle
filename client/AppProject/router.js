import React from "react";
import { Platform, StatusBar, Text } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";
import { SignIn } from "./screens/SignInScreen";
import SignUp from "./screens/SignUpScreen";
import Home from "./screens/HomeScreen";
import Mapa from "./screens/MapScreen";
import Cards from "./screens/CardScreen";

import { Profile } from "./screens/ProfileScreen";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

// const navigationCard = {
//   headerTitle: 'Home',
//   headerLeft: <Text onPress={() => navigation.navigate('Mapa')}>AA</Text>,
//   headerStyle: headerStyle
// }

export const CardsNavigator = createStackNavigator({
  Home: {
    screen: Cards,
    // navigationOptions: () => (navigationCard)
  }
});

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Mapa: {
      screen: Mapa,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="map" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      Cards: {
        screen: Cards,
        navigationOptions: {
          tabBarLabel: "Cards",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="user" size={30} color={tintColor} />
            )
          }
        },
      SignedOut: {
        screen: SignedOut
      },
      },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};