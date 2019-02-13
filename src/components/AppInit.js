import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '@firebase/app';
import '@firebase/auth';
import { alreadyLogin, notLoginYet } from '../actions'
import Main from './Main';



class AppInit extends Component {

  componentDidMount() {
    // Initialize Firebase
    var config = {
        apiKey: 'AIzaSyDx1b1G2xaZJeCv-RV_wBnE616Hxuosdy4',
        authDomain: 'manager-mobiledevjc7.firebaseapp.com',
        databaseURL: 'https://manager-mobiledevjc7.firebaseio.com',
        projectId: 'manager-mobiledevjc7',
        storageBucket: 'manager-mobiledevjc7.appspot.com',
        messagingSenderId: '828499052659'
    };
    firebase.initializeApp(config);
      
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            this.props.alreadyLogin(user);
        }
        else {
            this.props.notLoginYet();
        }
    });
  }

  render() {
    return(
          <Main />
    );
  }
}



export default connect(null, { alreadyLogin, notLoginYet })(AppInit);
