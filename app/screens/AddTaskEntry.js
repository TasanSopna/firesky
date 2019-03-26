'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text,TouchableOpacity,ScrollView,Alert,AsyncStorage} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Navigation } from 'react-native-navigation';
import Moment from 'moment';
import {BASE_URL,CREATE_TASK_URL} from '../constants/Constants';
const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';

export default class AddTaskEntry extends Component {
	state = {
		isDateTimePickerVisible_StartDate: false,
      isDateTimePickerVisible_EndDate: false,
		startDate: '',
		endDate: '',
		name:'',
		userid:'',
		role :'',
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
  _showDateTimePicker_StartDate = () => this.setState({ isDateTimePickerVisible_StartDate: true });

  _showDateTimePicker_EndDate = () => this.setState({ isDateTimePickerVisible_EndDate: true });

  _hideDateTimePicker_StartDate = () => this.setState({ isDateTimePickerVisible_StartDate: false });

  _hideDateTimePicker_EndDate = () => this.setState({ isDateTimePickerVisible_EndDate: false });

  _handleDatePicked_StartDate = (date) => {
	  var sDate = date.toString()
	  Moment.locale('en');
    this.setState({
		startDate : Moment(sDate).format('YYYY-MM-DD')
    })
    this._hideDateTimePicker_StartDate();
  };
  _handleDatePicked_EndDate = (date) => {
	   var eDate = date.toString()
	   Moment.locale('en');
    this.setState({
      endDate: Moment(eDate).format('YYYY-MM-DD')
    })
    this._hideDateTimePicker_EndDate();
  };
	
render() {
	return (
		<ScrollView style={styles.container}>
		    <Text style={styles.heading}>ADD TASK</Text>

			<TextInputLayout style={styles.inputLayout}>
				<TextInput
					style={styles.textInput}
					placeholder={'Name'}
					onChangeText={(name) => this.setState({name})}
				/>
			</TextInputLayout>
		<TouchableOpacity onPress={this._showDateTimePicker_StartDate} style={styles.datepick}>
       <TextInput
	    style={styles.selecteddate}
        editable={false} 
        selectTextOnFocus={false}
        placeholder={'Start Date'}
        onChangeText={(startDate) => this.setState({startDate})}
        value={this.state.startDate}
        ref="input"
        />
        </TouchableOpacity>
		<TouchableOpacity onPress={this._showDateTimePicker_EndDate} style={styles.datepick}>
       <TextInput
	    style={styles.selecteddate}
        editable={false} 
        selectTextOnFocus={false}
        placeholder={'End Date'}
        onChangeText={(endDate) => this.setState({endDate})}
        value={this.state.endDate}
        ref="input"
        />
        </TouchableOpacity>
		<DateTimePicker
          isVisible={this.state.isDateTimePickerVisible_StartDate}
          onConfirm={this._handleDatePicked_StartDate}
          onCancel={this._hideDateTimePicker_StartDate}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible_EndDate}
          onConfirm={this._handleDatePicked_EndDate}
          onCancel={this._hideDateTimePicker_EndDate}

        />
    <TouchableOpacity
	style={styles.button} 
      onPress={() => this.CreateTaskAPI(this.state.name,this.state.startDate, this.state.endDate)}>
	<Text style={styles.buttontext}> Save </Text>
	</TouchableOpacity>
	
		</ScrollView>
	);
}
  CreateTaskAPI = (Name,startDate,endDate) => {
    var url = BASE_URL + CREATE_TASK_URL;
    var data = { name: Name,projectId:this.props.projectid, loggedInUserId: this.state.userid, startDate: startDate, endDate: endDate };
	alert(JSON.stringify(data));
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
		 // alert(JSON.stringify(response))
        if (response.StatusCode == 201) {
          //alert(Name,startDate,endDate)
          //alert('failed : ' + response.message)
		      alert('success')  
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