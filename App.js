import * as firebase from 'firebase';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

// Create an ApiKeys.js file and export the config
import config from './app/constants/ApiKeys';
import LoginScreen from './app/screens/auths/LoginScreen';
import AuthLoadingScreen from './app/screens/auths/AuthLoadingScreen';
import Home from './app/screens/Home';

firebase.initializeApp(config);

const AppStack = createStackNavigator({
  Home,
});
const AuthStack = createStackNavigator(
  {
    SignIn: LoginScreen,
  },
  {
    headerMode: 'none',
  }
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
