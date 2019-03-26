import React, { Component } from 'react'
import { AppRegistry, View, Text,TextInput, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage, FlatList,Image} from 'react-native'
import { Navigation } from 'react-native-navigation';
import {TextInputLayout} from 'rn-textinputlayout';
import {BASE_URL,EDIT_PROJECT_DETAILS_URL} from '../constants/Constants';

const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
const extractKey = ({id}) => id
export default class EditProject extends Component {
	state ={
		name:'',
		desc:'',
		state:'',
		id:'',
		projectId:'',
	}
	componentWillMount() {
		this.loadUserDetails();
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
		  }
		} catch (e) {
		  console.error('Failed')
		}
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.heading}>Edit Project Details</Text>

				<TextInputLayout style={styles.inputLayout}>
					<TextInput
						style={styles.textInput}
						placeholder={this.props.projectName}
						onChangeText={(name) => this.setState({name})}
					/>
				</TextInputLayout>
				<TextInputLayout style={styles.inputLayout}>
					<TextInput
						style={styles.textInput}
						placeholder={this.props.projectDesc}
						onChangeText={(desc) => this.setState({desc})}
					/>
				</TextInputLayout>
				<TextInputLayout style={styles.inputLayout}>
					<TextInput
						style={styles.textInput}
						placeholder={this.props.projectStatus}
						onChangeText={(state) => this.setState({state})}
					/>
				</TextInputLayout>
				<TouchableOpacity
				style={styles.button} 
				  onPress={() => this.EditProjectAPI(this.state.id,this.props.projectId,this.state.name,this.state.desc,this.state.state)}>
				<Text style={styles.buttontext}> Save </Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
	EditProjectAPI = (id,projectId,name,desc,state) => {
		var url = BASE_URL+EDIT_PROJECT_DETAILS_URL;
		var data = { loggedInUserId: id,projectId: projectId,Name:name,desc:desc,state:state};
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
			  alert('failed : ' + response.message)
			  this.props.navigator.pop({
				animated: true, 
				animationType: 'fade', 
			  }); 
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

});
