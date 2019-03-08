import React from "react";
import { Platform, StatusBar, Text } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";
import { SignIn } from "./screens/SignInScreen";
import SignUp from "./screens/SignUpScreen";
import Home from "./screens/HomeScreen";
import Mapa from "./screens/MapScreen";
import Cards from "./screens/CardScreen";
import Profile from "./screens/ProfileScreen";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  backgroundColor: "#4c71ae",
};

export const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile",
      headerStyle,
      headerTintColor: 'white',
      headerTitleStyle: { color: 'white' }
    }
  }
});

export const MapaNavigator = createStackNavigator({
  Mapa: {
    screen: Mapa,
    navigationOptions: {
      title: "Map",
      headerStyle,
      headerTintColor: 'white',
      headerTitleStyle: { color: 'white' }
    }
  },
  Cards: {
    screen: Cards,
    navigationOptions: {
      title: "Report",
      headerStyle,
      headerTintColor: 'white',
      headerTitleStyle: { color: 'white' }
    }
  },
});

export const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Report Incidents",
      headerStyle,
      headerTitleStyle: {
        color: 'white'
      }
    }
  }
})

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
  }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
  }
  }
});


export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Mapa: {
      screen: MapaNavigator,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="map" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileNavigator,
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
      activeTintColor: "tomato",
      inactiveTintColor: "white",
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 5,
        backgroundColor: "#4c71ae"
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
      SignedOut: {
        screen: SignedOut
      },
      Cards: {
        screen: Cards,
        navigationOptions: {
          title: "Cards",
          headerStyle
        }
      },
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};