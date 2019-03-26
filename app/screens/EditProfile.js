import React, { Component } from 'react'
import { AppRegistry,TextInput, View, Text, StyleSheet, TouchableOpacity, AsyncStorage,ScrollView} from 'react-native'
import { Navigation } from 'react-native-navigation';
const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
import { Dropdown } from 'react-native-material-dropdown';
import {BASE_URL,GET_ALL_PROFILE_URL,EDIT_USER_DETAILS_URL} from '../constants/Constants';
import {TextInputLayout} from 'rn-textinputlayout';

const extractKey = ({id}) => id
const extractValue = ({name}) => name
export default class EditProfile extends Component {
	state = {
	 usersArray: [],
	 name:'',
	 role:'',
	 email:'',

 }
    	  loadUserDetails = async () => {
    try {
      const responsejson = await AsyncStorage.getItem(LOGIN_DETAILS_KEY)
      if (responsejson) {
        var response = JSON.parse(responsejson);
        const role = response.result.role;
        const id = response.result.id;
		const associateId = response.result.associateId;
        if (role != '') {
          this.setState({ role, id,associateId})
        }
		await this.fetchData(id);
		
      }

    } catch (e) {
      console.error('Failed')
    }
  }
  componentWillMount() {

    this.loadUserDetails();
  }
 fetchData = async (id) => {
    const response = await fetch(BASE_URL+GET_ALL_PROFILE_URL)
	var data = {loggedInUserId:id};
	
    fetch(response, {
      method: 'POST', 
      body: JSON.stringify(data),   
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic TlVJVDp3ZWxjb21lLTEyMw=='
      })
    }).then(res => res.json())
	.catch(error => alert('Error:'+ error))
	.then(response => {if(response.StatusCode===200){ const usersArray = response.result;
	alert(JSON.stringify(usersArray));
	
	 /* let usersNamesArray = usersArray.map((users, index, usersArray) => {		
    return {
		"name": users.name,
		"id": users.id
		};
	})  */
	//alert(JSON.stringify(usersNamesArray));
	this.setState({usersArray})
	}else{alert("No associates found")}});
    
  } 
  onSelectedItemsChange = selectedItems => {
	  alert(selectedItems);
    this.setState({ selectedItems });
  };
 
  render() {
	  return (
	  		<ScrollView style={styles.container}>

		 <Dropdown
				label='Favorite Fruit'
				data={this.state.usersArray}
				valueExtractor = {extractValue}
		/>

	
		</ScrollView>
	);
  }
  
   EditTaskAPI = (name,email,role,id) => {
    var url = BASE_URL+EDIT_USER_DETAILS_URL;
    var data = { name: name,email: email,designation:role,loggedInUserId:id};
      // alert(projectid);
 	fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic TlVJVDp3ZWxjb21lLTEyMw=='
      })
    }).then(res => res.json())
      .catch(error => alert('Error:' + error))
      .then(response => {
        if (response.StatusCode == 201) {
          //alert(Name,startDate,endDate)
          alert('failed : ' + response.message)
        }
        else {
          alert(JSON.stringify(response))
		   
		  
          
        }

      }); 	

  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
	color:'red',
  },
  post: {
    flexDirection: 'row',
  },
  postNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
/*   postContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingRight: 15,
	paddingLeft: 15,
  }, */
  postBody: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 16,
  },
  row: {
    elevation: 3,
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  background: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 5,
  },  
  titleFont: {
    fontSize: 16,
    color: 'black',
  },
  subHeadings:{
	fontSize: 20,
    color: 'red',
	fontFamily:'bold',
  },
  ImageIconStyle:{
	  width:50,
	  height:50,
	  marginLeft:20,
	  marginBottom:30
  },
  buttontext:{
		color:'black',
		fontSize:20
	},
	button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding:20,
	margin:30,
	},
})







