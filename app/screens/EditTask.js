'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text,TouchableOpacity,ScrollView,Alert,AsyncStorage} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Navigation } from 'react-native-navigation';
import Moment from 'moment';
import {BASE_URL,EDIT_TASK_DETAILS_URL} from '../constants/Constants';

const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';

export default class EditTask extends Component {
	state = {
		name:'',
		userid:'',
		role :'',
		Status:'',
    };
	  loadUserDetails = async () => {
    try {
      const responsejson = await AsyncStorage.getItem(LOGIN_DETAILS_KEY)
      if (responsejson) {
        var response = JSON.parse(responsejson);
        const role = response.result.role;
        const userid = response.result.id;
        if (role != '') {
          this.setState({ role, userid })
        }
      }

    } catch (e) {
      console.error(JSON.stringify(e))
    }
  }
  componentWillMount() {

    this.loadUserDetails();
  } 
  
	
render() {
	return (
		<ScrollView style={styles.container}>
		    <Text style={styles.heading}>Edit TASK</Text>

			<TextInputLayout style={styles.inputLayout}>
				<TextInput
					style={styles.textInput}
					placeholder={this.props.taskName}
					onChangeText={(name) => this.setState({name})}
				/>
			</TextInputLayout>
			<TextInputLayout style={styles.inputLayout}>
				<TextInput
					style={styles.textInput}
					placeholder={this.props.Status}
					onChangeText={(Status) => this.setState({Status})}
				/>
			</TextInputLayout>
		
    <TouchableOpacity
	style={styles.button} 
      onPress={() => this.EditTaskAPI(this.state.name,this.state.userid,this.props.taskId,this.state.Status)}>
	<Text style={styles.buttontext}> Save </Text>
	</TouchableOpacity>
	
		</ScrollView>
	);
}
  EditTaskAPI = (Name,userid,taskId,Status) => {
    var url = BASE_URL+EDIT_TASK_DETAILS_URL;
    var data = { name: Name,loggedInUserId: userid,taskId:taskId,state:Status};
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
		  this.props.navigator.pop({
			animated: true, 
			animationType: 'fade', 
		  }); 
          //this.handlePress(PROJECT_KEY, JSON.stringify(response))
        }
        else {
          alert(JSON.stringify(response))
		   
		  
          //this.RemoveText();
        }

      }); 	

  }
/* save = ()=>{
 
 const { task }  = this.state ;
 const { endDate }  = this.state ;
 const { startDate }  = this.state ;
 
if(task == '' || startDate == ''|| endDate == ''|| hours == ''|| comments == '')
{
  Alert.alert("Please Enter All the Values.");
}
else{

	alert('test'+this.state.project+this.state.task+this.state.hours+this.state.comments);
}
} */
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		paddingVertical: 20
    },
    textInput: {
       fontSize:16,
       height: 40,
	 
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
	datepick:{
		marginTop: 32,
        marginHorizontal: 32,
		
	},
	selecteddate:{
		fontSize:16,
       height: 40,
	   color:'black',
	},
	
});