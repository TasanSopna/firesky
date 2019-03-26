import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import Moment from 'moment';
import {BASE_URL,GET_PROJECT_BY_PROJECTID_URL} from '../constants/Constants';

//const PROJECT_KEY = 'PROJECT_ID';
//const extractKey = ({id}) => id

export default class Profile extends Component {
  state = {
    name: '',
    desc: '',
    startDate: '',
    endDate:"",
	createdAt: '',
    updatedAt:"",
	
  }
  componentWillMount = async () => {
	
    await this.fetchData();
  }
  fetchData = async () => {
    const response = await fetch(BASE_URL+GET_PROJECT_BY_PROJECTID_URL)
    var data = {projectId:this.props.projectid};
    fetch(response, {
      method: 'POST', 
      body: JSON.stringify(data),   
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic TlVJVDp3ZWxjb21lLTEyMw=='
      })
    }).then(res => res.json())
	.catch(error => alert('Error:'+ error))
	.then(response => {if(response.StatusCode===200){ 
	const name = response.result.Name;
	const desc = response.result.desc;
	const startDate = Moment(response.result.startDate.toString()).format('YYYY-MM-DD');
	Moment.locale('en');
	const endDate = Moment(response.result.endDate.toString()).format('YYYY-MM-DD');
	const createdAt = Moment(response.result.createdAt.toString()).format('YYYY-MM-DD');
	const updatedAt = Moment(response.result.updatedAt.toString()).format('YYYY-MM-DD');
	this.setState({name,desc,startDate,endDate,createdAt,updatedAt})
	}else{alert("fghj")}});
    
  }
 
  render() {
    return (
      <ScrollView style={styles.container}>
       
        <View style={{
          flexDirection: 'column',
          paddingLeft: 20, paddingTop: 30
        }}>
          <Text style={styles.Font}>Name</Text>
          <Text style={styles.Userdetails}>{this.state.name}</Text>
          <Text style={styles.Font}>Description</Text>
          <Text style={styles.Userdetails}>{this.state.desc}</Text>
          <Text style={styles.Font}>StartDate</Text>
          <Text style={styles.Userdetails}>{this.state.startDate}</Text>
		  <Text style={styles.Font}>EndDate</Text>
          <Text style={styles.Userdetails}>{this.state.endDate}</Text>
		  <Text style={styles.Font}>Created At</Text>
          <Text style={styles.Userdetails}>{this.state.createdAt}</Text>
		  <Text style={styles.Font}>Updated At</Text>
          <Text style={styles.Userdetails}>{this.state.updatedAt}</Text>
        </View>
      </ScrollView>

    );
  }
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
  Userdetails: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 15,
    textAlign: 'left',
  },
  Font: {
    fontSize: 13,
    paddingTop: 20,
    paddingLeft: 15,
    textAlign: 'left',
    color: '#b2beb5'
  }
});

