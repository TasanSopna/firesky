
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity, AsyncStorage } from 'react-native';
/* import Container from '../components/Container'; */
import { Navigation } from 'react-native-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import StyleSheets from '../components/StyleSheets';
import { TextInputLayout } from 'rn-textinputlayout';
import AddMembersToProject from './AddMembersToProject';
import Moment from 'moment';
import {BASE_URL,CREATE_BASIC_PROJECT_URL} from '../constants/Constants';

const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
//const PROJECT_KEY = 'PROJECT_ID';

/* var dateFormat = require('dateformat');
var now = new Date(); */

export default class CreateProject extends React.Component {

    constructor(props) {  
      super(props);

    this.state = {
      role: '',
      id: '',
      Project: '',
      desc: '',
      startDate: '',
      endDate: '',
      showAlert: false,
      isDateTimePickerVisible_StartDate: false,
      isDateTimePickerVisible_EndDate: false,
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

  render() {
    const { showAlert } = this.state;
    return (
      <View style={styles.container}>
        <TextInputLayout style={styles.inputLayout}>
          <TextInput style={styles.textInput}
            placeholder="Enter a project name to create"
            onChangeText={(Project) => this.setState({ Project })}
            value={this.state.Project}
          /></TextInputLayout>
        <TextInputLayout style={styles.inputLayout}>
          <TextInput style={styles.textInput}
            placeholder="Description"
            onChangeText={(desc) => this.setState({ desc })}
            value={this.state.desc}
          /></TextInputLayout>

        <TouchableOpacity onPress={this._showDateTimePicker_StartDate}>
          <TextInputLayout style={styles.inputLayout}>
            <TextInput style={styles.textInput}
              editable={false}
              selectTextOnFocus={false}
              placeholder="Start Date"
              onChangeText={(startDate) => this.setState({ startDate })}
              /* value={dateFormat(this.state.startDate, "fullDate")} */
              value={this.state.startDate}
            /></TextInputLayout>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._showDateTimePicker_EndDate}>
          <TextInputLayout style={styles.inputLayout}>
            <TextInput style={styles.textInput}
              editable={false}
              selectTextOnFocus={false}
              placeholder="End Date"
              onChangeText={(endDate) => this.setState({ endDate })}
              //value={dateFormat(this.state.endDate, "fullDate")}
              value={this.state.endDate}
            /></TextInputLayout>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.CreateProjectButton}
          onPress={() => this.CreateProjectAPI(this.state.Project, this.state.desc, this.state.startDate, this.state.id, this.state.endDate)}>
          <Text style={styles.ButtonText}>Create</Text>
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
      </View>
    );

  }
  CreateProjectAPI = (Name, desc, startDate, userid, endDate) => {
    var url = BASE_URL+CREATE_BASIC_PROJECT_URL;
    var data = { Name: Name, desc: desc, startDate: startDate, loggedInUserId: userid, endDate: endDate };
       /* if(!(Name, desc, startDate, userid, endDate)){
		  alert(this.state.desc+this.state.endDate+this.state.startDate+this.state.Project+userid);
	   } */
	  //alert(this.state.desc+this.state.endDate+this.state.startDate+this.state.Project+userid);
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
        if (response.StatusCode != 201 && response.StatusCode != 200) {
          //alert(Name,startDate,endDate)
          alert('failed : ' + response.message)
          //this.handlePress(PROJECT_KEY, JSON.stringify(response))
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
          //this.RemoveText();
          this.props.navigator.push({
            screen: 'AddMembersToProject',
            title: 'Add Members To Project',
          });
        }

      }); 

  }
  /*   RemoveText = () => {
  
      this.setState({
        Project: '',
        desc: '',
        startDate: '',
        endDate: '',
      })
    } */
  /*  clear = () => {
     this.textInputRef.clear();
   } */
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  /*   button: {
      margin: 10,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 5,
      backgroundColor: "#AEDEF4",
    }, */
  CreateProjectButton: {
    alignItems: 'center',
    padding: 8,
	
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  date: {
    fontSize: 14,
    color: 'white',
  },
  textInput: {
    fontSize: 20,
    height: 40,
	color:'white',
  },
  inputLayout: {
    marginTop: 16,
    marginHorizontal: 36
  },
  ButtonText:{
	  color:'red',
	  fontSize:40,
	  fontWeight:'bold',
	  //backgroundColor:'green',
	  /* borderWidth :0,
	  borderStyle :'solid',
	  borderRadius :2,
	  borderColor :'white', */
  }
  });

