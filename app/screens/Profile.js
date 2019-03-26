import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, AsyncStorage,TouchableHighlight,TouchableOpacity } from 'react-native';
import GoogleSignIn from 'react-native-google-sign-in';
import { Navigation } from 'react-native-navigation';
import RenderIf from './RenderIf';

const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
const IMAGE_URL_KEY = 'IMAGE_URL';

export default class Profile extends Component {
  state = {
    name: '',
    designation: '',
    email: '',
	role:'',
    imageurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_isWgOJHA7YNXAhKDE5h12SW2l91gIYU9YfZTisz4KItXN18U'
  }
  loadUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem(LOGIN_DETAILS_KEY)
      const imageurl = await AsyncStorage.getItem(IMAGE_URL_KEY)
      //return userid;
      var response = JSON.parse(userDetails);
      const name = response.result.name;
      const email = response.result.email;
	  const role = response.result.role;
      const designation = response.result.designation;
      //alert(imageurl);
      if (imageurl) {
        this.setState({ name, email, designation, imageurl,role})
      }
      else {
        this.setState({ name, email, designation,role })
      }
      //this.setState({name,email,designation})
    } catch (e) {
      console.error('Failed to load name')
    }
  }
  componentWillMount() {

    this.loadUserDetails();
  }
  render() {
    return (
		
      <ScrollView style={styles.container}>
        <Image
          style={styles.ProfileImg}
          source={{ uri: this.state.imageurl }}
        />
		<TouchableOpacity
                onPress={() => this.editProfile()}>
		{RenderIf(this.state.role == 1, 
                    <Image style={styles.editprofile} source={require('../images/editprofile.jpg')}/>
                )}
		</TouchableOpacity>
        <View style={{
          flexDirection: 'column',
          paddingLeft: 20, paddingTop: 30
        }}>
          <Text style={styles.Font}>Name : <Text style={styles.Userdetails}>{this.state.name}</Text></Text>
          
          <Text style={styles.Font}>Role : <Text style={styles.Userdetails}>{this.state.designation}</Text></Text>
          
          <Text style={styles.Font}>Email ID: <Text style={styles.Userdetails}>{this.state.email}</Text></Text>
          
        </View>
		<TouchableHighlight onPress={async () => {
          GoogleSignIn.signOutPromise().then((res) => {
            console.log('signOutPromise resolved', res);
            setTimeout(() => {
              alert('signed out');
			  this.props.navigator.push({
				screen: 'Login',
				title: 'Login',
    });
            }, 100);
         }, (e) => {
            console.log('signOutPromise rejected', e);
            setTimeout(() => {
              alert(`signOutPromise error: ${JSON.stringify(e)}`);
            }, 100);
          });
        }}>
          <Text style={styles.instructions}>
            Google Sign-Out
          </Text>
		  
        </TouchableHighlight>
      </ScrollView>

    );
  }
   editProfile = () => {
    this.props.navigator.push({
      screen: 'EditProfile',
      title: 'Edit Profile',
	 passProps : {name :this.state.name ,email :this.state.email, role:this.state.designation}
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 25,
  },
  ProfileImg: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 150,
  },
  editprofile: {
	height: 50,
    width: 50, 
  },
  Userdetails: {
    fontSize: 20,
    color:'black',
    paddingTop: 10,
    paddingLeft: 15,
    textAlign: 'left',
  },
  Font: {
    fontSize: 20,
	fontWeight:'bold',
    paddingTop: 20,
    paddingLeft: 15,
    textAlign: 'left',
    color: 'red'
  },
  instructions:{
	textAlign: 'center',
    color: 'black',
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 30,
	marginTop:75,
  },
});

