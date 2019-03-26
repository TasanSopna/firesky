'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text,TouchableOpacity,ScrollView,Alert,AsyncStorage} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import {BASE_URL,EDIT_SAVED_TIMESHEET_URL} from '../constants/Constants';

const extractKey = ({ id }) => id
const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';

export default class EditTimeEntry extends Component {
	state = {
		hours:'',
		comments:'',
		loggedinId:'',
		associateId:''
    };

  loadUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem(LOGIN_DETAILS_KEY)
      var response = JSON.parse(userDetails);
      const associateId = response.result.associateId;
	  const loggedinId = response.result.id;

      this.setState({associateId,loggedinId})
      
    } catch (e) {
      console.error('Failed to load time entry')
    }
  }
  componentWillMount() {

    this.loadUserDetails();
  }
render() {
	return (
		<ScrollView style={styles.container}>
		    <Text style={styles.heading}>Edit TIME LOG</Text>

			<TextInputLayout style={styles.inputLayout}>
				<TextInput
					style={styles.textInput}
					placeholder={this.props.comments}
					onChangeText={(hours) => this.setState({hours})}
				/>
			</TextInputLayout>
			<TextInputLayout style={styles.inputLayout}>

				<TextInput
					style={styles.textInput}
					placeholder={this.props.hours}
					onChangeText={(comments) => this.setState({comments})}
				/>
			</TextInputLayout>
			<TouchableOpacity
				style={styles.button}
          onPress={() => this.EditTimeEntryAPI(this.props.entryid,this.state.loggedinId,this.state.associateId,this.state.comments, this.state.hours)}>
				<Text style={styles.buttontext}> Save </Text>
			</TouchableOpacity>
			
		</ScrollView>
	);
}

EditTimeEntryAPI = (entryId,loggedinId, associateId,comments,hours) => {
    var url = BASE_URL+EDIT_SAVED_TIMESHEET_URL;
    var data = {loggedInUserId:loggedinId, associateId:associateId, entryId:entryId, comments:comments, hours:hours};
 
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
        if (response.StatusCode == 200) {
          alert('success')
        }
		else{
			alert('fail'+JSON.stringify(response))
		}
        
      }); 

  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		paddingVertical: 20
    },
    textInput: {
       fontSize:20,
       height: 40,
	   fontWeight: 'bold',
	   color:'black',
	   
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
	button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding:20,
	margin:30,
	},
	button2: {
    alignItems: 'center',
    backgroundColor: '#d2c8cc',
    padding:20,
	marginLeft:30,
	marginRight:30,
	
	},
	heading:{
		color:'black',
		fontWeight:'bold',
		fontSize:30,
		fontStyle:'normal',
		textAlign:'center',
		marginTop:0
	},
	buttontext:{
		color:'black',
		fontSize:20
	},
	
});
