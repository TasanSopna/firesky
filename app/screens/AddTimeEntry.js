'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text,TouchableOpacity,ScrollView,Alert,AsyncStorage} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
const extractKey = ({ id }) => id
const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
import {BASE_URL,SAVE_TIMESHEET_URL} from '../constants/Constants';

export default class AddTimeEntry extends Component {
	state = {
		isDateTimePickerVisible: false,
		date:'',
		//projectId:'',
		//taskId:'',
		//associateId:'',
		hours:'',
		comments:'',
    };
	 _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (dates) => {
		 var date = dates.toString()
	  Moment.locale('en');
    this.setState({
		date : Moment(date).format('YYYY-MM-DD')
    })
    /* this.setState({
      date:dates.toString()
    }) */
    this._hideDateTimePicker();
  };
	/* componentWillMount = async () => {
	alert(JSON.stringify(this.props.taskId));

  } */
  loadUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem(LOGIN_DETAILS_KEY)
      //const imageurl = await AsyncStorage.getItem(IMAGE_URL_KEY)
      //return userid;
	  //alert(userDetails);
       var response = JSON.parse(userDetails);
      const associateId = response.result.associateId;
      this.setState({associateId})
      //alert(imageurl);
      /* if (imageurl) {
        this.setState({ name, email, designation, imageurl })
      }
      else {
        this.setState({ name, email, designation })
      }  */
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
		    <Text style={styles.heading}>ADD TIME LOG</Text>
			<TextInputLayout style={styles.inputLayout}>
				<Text
					style={styles.textInput}
					//placeholder={'Project'}
					//onChangeText={(projectId) => this.setState({projectId})}
				>{this.props.projectname}</Text>
			</TextInputLayout>
			<TextInputLayout style={styles.inputLayout}>
				<Text
					style={styles.textInput}
					//placeholder={'Task'}
					//onChangeText={(taskId) => this.setState({taskId})}
				>{this.props.taskName}</Text>
			</TextInputLayout>
			
		<TouchableOpacity onPress={this._showDateTimePicker} style={styles.datepick}>
       <TextInput
	    style={styles.selecteddate}
        editable={false} 
        selectTextOnFocus={false}
        placeholder={'Date'}
        onChangeText={(date) => this.setState({date})}
        value={this.state.date}
        ref="input"
        />
        </TouchableOpacity>
			<DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
			<TextInputLayout style={styles.inputLayout}>
				<TextInput
					style={styles.textInput}
					placeholder={'Hours'}
					onChangeText={(hours) => this.setState({hours})}
				/>
			</TextInputLayout>
			<TextInputLayout style={styles.inputLayout}>
				<TextInput
					style={styles.textInput}
					placeholder={'Comments'} 
					onChangeText={(comments) => this.setState({comments})}
				/>
			</TextInputLayout>
			<TouchableOpacity
				style={styles.button}
          onPress={() => this.CreateTimeEntryAPI(this.props.projectid, this.props.taskId, this.state.date, this.state.comments, this.state.hours,this.state.associateId)}>
				<Text style={styles.buttontext}> Save </Text>
			</TouchableOpacity>
		
		</ScrollView>
	);
}

CreateTimeEntryAPI = (projectid, taskId, date, comments,hours,associateId,projectName) => {
    var url = BASE_URL+SAVE_TIMESHEET_URL;
    var data = {"timeSheetEntries":{ projectId:projectid, taskId:taskId, dateAndTime:date, comments:comments, associateId:associateId,hours:hours}};
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
		  alert(JSON.stringify(response))
         if (response.StatusCode != 201 && response.StatusCode != 200) {
          
		  alert('fail'+JSON.stringify(response))
        }
        else {
          alert('success')
		  this.props.navigator.switchToTab({
			tabIndex: 1 
		  });
		  this.props.navigator.pop({
			animated: true, 
			animationType: 'fade', 
		  });
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
	datepick:{
		marginTop: 32,
        marginHorizontal: 32,
		
	},
	selecteddate:{
		fontSize:20,
       height: 40,
	   color:'black',
	   fontWeight: 'bold',
	   
	}
});
/* <TextInputLayout style={styles.inputLayout}>
				<TextInput
					style={styles.textInput}
					placeholder={'associateId'}
					//onChangeText={(associateId) => this.setState({associateId})}
				>{this.state.associateId}</TextInput>
			</TextInputLayout> */