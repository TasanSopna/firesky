import React, { Component } from 'react'
import { AppRegistry, View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage, FlatList,Image} from 'react-native'
import RenderIf from './RenderIf';
import ActionButton from 'react-native-action-button';
import { Navigation } from 'react-native-navigation';
import StyleSheets from '../components/StyleSheets';
import {BASE_URL,GET_APPROVED_TIMESHEET_URL} from '../constants/Constants';

const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
const extractKey = ({id}) => id
export default class RejectedTimesheet extends Component {

  state = {
    posts: [],
	role :'',
  }
   constructor(props) {
    super(props);
  }
  componentWillMount = async () => {
	const userDetails = await AsyncStorage.getItem(LOGIN_DETAILS_KEY);
	var response = JSON.parse(userDetails);
	const id = response.result.id;
	const role = response.result.role;
	const associateId = response.result.associateId;
	 if (role != '') {
          this.setState({ role, id })
        }
    await this.fetchData(id);
  }

  renderPost = ({item}) => {
    return (
      <ScrollView style={styles.row}>
	 <TouchableOpacity>
        <View>
				<Text style={styles.titleFont}>
					<Text style={styles.subHeadings}>Comments :</Text>{item.hours}
				</Text>
				<Text style={styles.postBody}>
					<Text style={styles.subHeadings}>RejectedDate :</Text>{item.DateAndTime}
				</Text>
			
        </View>
	  </TouchableOpacity>  
	   </ScrollView>
	 
	  
    )
  }

  render() {
    const {posts} = this.state
    return (
      <View style={styles.background}>
	  <FlatList
        style={styles.container}
        data={this.state.posts}
        renderItem={this.renderPost}
        keyExtractor={extractKey}
      />
      </View>
    )
  }

  fetchData = async (id) => {
    var url = BASE_URL+GET_APPROVED_TIMESHEET_URL+id;
		fetch(url, {
		  method: 'Get',
		  headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'Basic TlVJVDp3ZWxjb21lLTEyMw=='
		  })
		}).then(res => res.json())
      .catch(error => alert('Error:' + error))
      .then(response => {
        if (response.StatusCode == 200) {
		const posts = response.result;
			this.setState({posts})
          //alert('success')
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
    backgroundColor: '#f9f9f9',
  },
  post: {
    flexDirection: 'row',
  },
  postNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  }
})







