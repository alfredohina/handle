import { AsyncStorage } from "react-native";
import { AuthAPI } from "../src/lib/auth";


export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");



export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AuthAPI.currentUser()
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};