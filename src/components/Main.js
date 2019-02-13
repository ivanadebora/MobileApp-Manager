import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';
import MainMenu from './MainMenu';

export default createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        MainMenu: {
            screen: ({ navigation }) => <MainMenu screenProps={{ rootNavigation: navigation }} />
            //utk rootNavigation nama bebas diganti
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)