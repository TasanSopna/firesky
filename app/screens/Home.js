import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage,TouchableOpacity,ImageBackground } from 'react-native';
import Container from '../components/Container';
import ActionButton from 'react-native-action-button';
import GoogleSignIn from 'react-native-google-sign-in';
import { Navigation } from 'react-native-navigation';

const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '',
      active: 'true',
    };
  }
  loadUserDetails = async () => {
    try {
      const responsejson = await AsyncStorage.getItem(LOGIN_DETAILS_KEY)
      if (responsejson) {
        //alert(responsejson)
        var response = JSON.parse(responsejson);
        const role = response.result.role;
        const id = response.result.id;
		
        if (role != '') {
          this.setState({ role, id })
        }
      }

    } catch (e) {
      console.error('Failed')
    }
  }
  componentWillMount() {
    this.loadUserDetails();
  }

  handlePress = () => {
    this.props.navigator.push({
      screen: 'CreateProject',
      title: 'Create Project',
    });
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../images/time.jpg')}>
			<Text style={styles.heading}>
				TIMESHEET MANAGEMENT
          </Text>
		  
       </ImageBackground>
	   
    );
  }

  handlePress = () => {
    this.props.navigator.push({
      screen: 'CreateProject',
      title: 'CreateProject',
    });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    //paddingLeft: 70,
    //paddingRight: 70,
  },
  instructions:{
	textAlign: 'center',
    color: '#f1f1f1',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 30,
	
  },
  heading:{
	textAlign: 'center',
    color: '#f1f1f1',
	fontWeight: 'bold',
    fontSize: 30,


  }
});
