import React, { Component } from 'react'
import { AppRegistry,View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage, FlatList,Image} from 'react-native'
import Timesheet from './Timesheet';
import Info from './Info';
import Tasks from './Tasks';
import RenderIf from './RenderIf';
import {BASE_URL,GET_PROJECT_BY_USERID_URL} from '../constants/Constants';

import ActionButton from 'react-native-action-button';
import { Navigation } from 'react-native-navigation';
/* import Container from '../components/Container'; */
import StyleSheets from '../components/StyleSheets';
const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
const extractKey = ({id}) => id
export default class Projects extends Component {

  state = {
    loading: true,
    error: false,
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
	 if (role != '') {
          this.setState({ role, id })
        }
    await this.fetchData(id);
  }
	  
	pushScreen = (item) => {
		this.props.navigator.push(
		{
			label: 'Project',
			screen: 'Tasks',
			title: 'Top Tabs',
			topTabs: [
				{
					screenId: 'Tasks',
					title: 'Task',
					passProps: {id:item}
				},
				{
					screenId: 'SubmittedTimesheet',
					title: 'Submitted',
		  
				},
				{
					screenId: 'RejectedTimesheet',
					title: 'Rejected',
			  
				},
				{
					screenId: 'ApprovedTimesheet',
					title: 'Approved',
			  
				}
			]
		});
	  
	}
    pushScreenChanges = (item) => {
		this.props.navigator.push(
		{
			label: 'Project',
			screen: 'Projects',
			title: 'Top Tabs',
			topTabs: [
				{
					screenId: 'Associate',
					title: 'Add Members to Project',
					passProps : {projectId : item.id}
				},
				{
					screenId: 'RemoveProjectMembers',
					title: 'Remove Members from project',
					passProps : {projectId : item.id}
				},
				{
					screenId: 'EditProject',
					title: 'Edit Project Details',
					passProps : {projectId : item.id,projectName : item.Name,projectDesc : item.desc,projectStatus : item.state}
				}
			]
		});
	  
	}
 renderItem = ({item}) => {
    return (
      <Text>
        {item.text}
      </Text>
    )
  }
	renderPost = ({item}) => {
		return (
			<View style={styles.row}>
			<TouchableOpacity  onPress={() => this.projectInfo(item)} style={styles.projectInfo}>
					<Image source={require('../images/project_info.jpg')}
						style={styles.ImageIconStyle3}/>
				</TouchableOpacity>
				<View style={styles.row}>
					<View style={{flex: 1,flexDirection: 'row',}}>
						
						<View style={styles.container1}>
							<TouchableOpacity onPress={() => this.pushScreen(item)}>
								<View>
									<Text style={styles.titleFont}>
										<Text style={styles.subHeadings}>{item.Name}</Text>
									</Text>
									<Text style={styles.titleFont}>
										<Text style={styles.subHeadings}>{item.desc}</Text>
									</Text>
									<Text style={styles.titleFont}>
									{RenderIf(item.state == 1, 
										<Text style={styles.subHeadings}>New</Text>
									)}
									</Text>
									<Text style={styles.titleFont}>
									{RenderIf(item.state == 2, 
										<Text style={styles.subHeadings}>In Progress</Text>
									)}
									</Text>
									<Text style={styles.titleFont}>
									{RenderIf(item.state == 3, 
										<Text style={styles.subHeadings}>Closed</Text>
									)}
									</Text>
									<Text style={styles.titleFont}>
									{RenderIf(item.state == 4, 
										<Text style={styles.subHeadings}>Deleted</Text>
									)}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
						<View style={styles.container1}>
							<TouchableOpacity
							style={styles.button}
							onPress={() => this.pushScreenChanges(item)}>
							{RenderIf(this.state.role == 2,
								<Image source={require('../images/editproject.png')}
								style={styles.ImageIconStyle}/>
							)}
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
	 
	  
		)
	}

 buttonPressed() {  
    this.props.navigation.navigate('NewCase', {});
  }

  render() {
    const {posts, loading, error} = this.state

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Failed to load posts!
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.background}>
	  <FlatList
        style={styles.container}
        data={this.state.posts}
        renderItem={this.renderPost}
        keyExtractor={extractKey}
      />
		{RenderIf(this.state.role == 2, 
                    <ActionButton buttonColor="#1E73C1" onPress={this.handlePress}/>
                )}
      </View>
    )
  }
  handlePress = () => {
    this.props.navigator.push({
      screen: 'CreateProject',
      title: 'CreateProject',
    });
  };
	projectInfo = (item) => {
		this.props.navigator.push({
		  screen: 'Info',
		  title: 'Project Information',
		  passProps : {projectid :item.id}
		});
	};
  fetchData = async (id) => {
    const response = await fetch(BASE_URL+GET_PROJECT_BY_USERID_URL)
    var data = {id:id};
    fetch(response, {
      method: 'POST', 
      body: JSON.stringify(data),   
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic TlVJVDp3ZWxjb21lLTEyMw=='
      })
    }).then(res => res.json())
	.catch(error => alert('Error:'+ error))
	.then(response => {if(response.StatusCode===200){ const posts = response.result;
	this.setState({posts,loading: false, error: false})
	}else{alert("No projects found")}});
    
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
    color: 'black',
	fontFamily:'bold',
  },
  ImageIconStyle:{
	  width:50,
	  height:50,
	  
  },
   buttonText: {
    color: '#c95e0c',
    fontSize: 12,
  },
   button: {
    alignItems: 'center',
    padding: 8
  },
	container1: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 5,
		flexDirection: 'column',
		paddingLeft: 10,
	},
	row: {
		elevation: 3,
		flex: 1,
		margin: 5,
		padding: 10,
		backgroundColor: '#ffffff',
	},
	ImageIconStyle3:{
	  alignItems:'center',
	  width:25,
	  height:25,
	  
	 
  },
})







