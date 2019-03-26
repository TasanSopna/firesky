import React, { Component } from 'react'
import { AppRegistry, View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage, FlatList,Image} from 'react-native'
import { Navigation } from 'react-native-navigation';
import MultiSelect from 'react-native-multiple-select';
import {BASE_URL,GET_ALL_ASSOCIATES_URL,ASSIGN_TASK_TO_PROJECT_MEMBER_URL} from '../constants/Constants';

const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
const extractKey = ({id}) => id
export default class AssignTask extends Component {
	state = {
	 selectedItems:[],
	 associatesArray: [],

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
    const response = await fetch(BASE_URL+GET_ALL_ASSOCIATES_URL)
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
	.then(response => {if(response.StatusCode===200){ const associatesArray = response.result;
	
	 let associatesNewArray = associatesArray.map((associate, index, associatesArray) => {		
    return {
		"name": associate.profileId.name,
		"id": associate.id
		};
	}) 
	//alert(JSON.stringify(associatesNewArray));
	this.setState({associatesArray,associatesNewArray})
	}else{alert("No associates found")}});
    
  } 
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
 
  render() {
	  return (
    <ScrollView style={{ flex: 1 }}>
      <MultiSelect
        items={this.state.associatesNewArray}
        uniqueKey="id"
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={this.state.selectedItems}
        selectText="Pick Items"
        searchInputPlaceholderText="Search Items..."
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
	  <TouchableOpacity
		style={styles.button}
       onPress={() => this.addSelectedMembersToTask()}>
				<Text style={styles.buttontext}> Add Member </Text>
			</TouchableOpacity>
    </ScrollView>
	
	);
  }
  async addSelectedMembersToTask(){
	  //alert(this.state.selectedItems[0].id)
	   for(let i=0; i<this.state.selectedItems.length;i++){
		await this.assignTaskToMemberAPI(this.state.id,this.props.taskId,this.state.selectedItems[i])
	  } 
  }
 assignTaskToMemberAPI = (id,taskId,associateId) => {
    var url = BASE_URL+ASSIGN_TASK_TO_PROJECT_MEMBER_URL;
    var data = { taskId:taskId,associateId:associateId,loggedInUserId:id};
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
			 this.props.navigator.switchToTab({
			tabIndex: 1 
		  });
		  this.props.navigator.pop({
			animated: true, 
			animationType: 'fade', 
		  });
        }
        else {
          alert('failed : ' + response.message)		  
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







