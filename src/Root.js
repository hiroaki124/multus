import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from './Screens/LoginScreen';
import ScannerScreen from './Screens/ScannerScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ReportScreen from './Screens/ReportScreen';
import CameraScreen from './Screens/CameraScreen';
import ScannerScreenSecond from './Screens/ScannerScreenSecond';

const drawerScreens = createStackNavigator({
    // Main  : MainStack,
 
    Login: {
        screen: LoginScreen,
        navigationOptions: { header: null }
    },
    Scanner: {
        screen: ScannerScreen,
        navigationOptions: { header: null }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: { header: null }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: { header: null }
    },
    Report : {
        screen: ReportScreen,
        navigationOptions: { header: null }
    },
    Camera : {
        screen: CameraScreen,
        navigationOptions: { header: null }
    },
    SecondScanner : {
        screen: ScannerScreenSecond,
        navigationOptions: { header: null }
    }

}, {
    initialRouteName: 'Login'
}) 

class Root extends React.Component {
    render() {
        const Navigation = createAppContainer(drawerScreens);
        return (<Navigation/>);
    }
}

export default Root;