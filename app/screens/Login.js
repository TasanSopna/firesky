import React, { Component } from 'react';
import { StyleSheet, Text, AsyncStorage, View, TouchableOpacity, Image, ActivityIndicator,TouchableHighlight,ImageBackground } from 'react-native';
import Container from '../components/Container';
import Home from './Home';
import { Navigation } from 'react-native-navigation';
import GoogleSignIn from 'react-native-google-sign-in';
import {BASE_URL,LOGIN_URL} from '../constants/Constants';

const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
const IMAGE_URL_KEY = 'IMAGE_URL';

export default class Login extends Component {
  state = {
    email: '',
    loading: false,
    error: false,
    loginApiCall: '',
    showProgress: true,
  }

  handlePress = async (key, responseJson) => {
    this.save(key, responseJson);
    this.startTabBasedMyApp();
  };
  save = async (key, json) => {
    try {
      await AsyncStorage.setItem(key, json)
    } catch (e) {
      console.error('Failed to save name.')
    }
  }
  startTabBasedMyApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Home',
          screen: 'Home',
          icon: require('../images/icon1.png'),
          selectedIcon: require('../images/icon1_selected.png'),
          title: 'Home'
        },
        {
          label: 'Projects',
          screen: 'Projects',
          icon: require('../images/icon3.png'),
          selectedIcon: require('../images/icon3_selected.png'),
          title: 'List Of Projects'
        },
        {
          label: 'Profile',
          screen: 'Profile',
          icon: require('../images/icon2.png'),
          selectedIcon: require('../images/icon2_selected.png'),
          title: 'Profile'
        },
		{
          label: 'Timesheet',
          screen: 'GetAllTimesheets',
          icon: require('../images/icon4.png'),
          selectedIcon: require('../images/icon4_selected.png'),
          title: 'Timesheet'
        }
      ]
    });
  }

  render() {
    const { loginApiCall, loading, error } = this.state

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={this.state.showProgress} size="large" />
        </View>
      )
    }
    return (
      <ImageBackground style={styles.container} source={require('../images/bg2.jpg')}>
        <TouchableOpacity activeOpacity={0.6} onPress={async () => {
          await GoogleSignIn.configure({
            clientID: '454877270238-b72162g0082dipg1ckhjib3m19ff0fei.apps.googleusercontent.com',
            scopes: ['openid', 'email', 'profile'],
            shouldFetchBasicProfile: true,
          });
          this.setState({ loading: true })
          const user = await GoogleSignIn.signInPromise();
          //alert(JSON.stringify(user));
          this.save(IMAGE_URL_KEY, user.photoUrlTiny);
          this.loginApiCall(user.email);

        }}>
          <Image
            source={require('../images/btn_google_signin.png')}
            style={styles.ImageIconStyle}
          />
        </TouchableOpacity>
	 </ImageBackground>
    );

    if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Failed to load posts!
          </Text>
        </View>
      )
    }
  }

  loginApiCall = (emailid) => {
    var url = BASE_URL + LOGIN_URL ;
    var data = { email: emailid };

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic TlVJVDp3ZWxjb21lLTEyMw=='
      })
    }).then(res => res.json())
      .catch(error => alert('Error:' + error))
      /* alert('Login success : '+response.result.id) */
      .then(response => {
        if (response.StatusCode === 200) {
          this.setState({ loading: false })
          this.handlePress(LOGIN_DETAILS_KEY, JSON.stringify(response))
        }
        else { alert(emailid + response.StatusInfo.message) }
      });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 30,

  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageIconStyle:{
	  marginTop:100,
	    }
});


load = async () => {
  try {
    const email = await AsyncStorage.getItem(EMAIL_STORAGE_KEY);

    if (email !== null) {
      this.setState({ email })
      startTabBasedMyApp();
    }
    else {

    }
  } catch (e) {
    console.error(e)
  }
}


