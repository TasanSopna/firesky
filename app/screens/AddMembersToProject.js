/* import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from '../components/Container';

class AddMembersToProject extends Component {
  handlePress = () => { */
    /* this.props.navigator.showModal({
      screen: 'Screen4',
      title: 'Screen 4',
    }); */
/*   };

  render() {
    return (
      <Container
        backgroundColor="#F44336"
        //onPress={this.handlePress}
      />
    );
  }
}

export default AddMembersToProject; */


import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text,AsyncStorage} from 'react-native'
import SelectMultiple from 'react-native-select-multiple'
import StyleSheets from '../components/StyleSheets';


const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';
const extractKey = ({id}) => id

var Member = ['Member1', 'Member2' ]
// --- OR ---
// const fruits = [
//   { label: 'Apples', value: 'appls' },
//   { label: 'Oranges', value: 'orngs' },
//   { label: 'Pears', value: 'pears' }
// ]

class AddMembersToProject extends Component {
  
  componentWillMount = async () => {
    const userDetails = await AsyncStorage.getItem(LOGIN_DETAILS_KEY);
    var response = JSON.parse(userDetails);
    const id = response.result.id;
      await this.fetchData(id);
      
      
    }

  state = { selectedMember: [] }

  

  onSelectionsChange = (selectedMember) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedMember })
  }

  render () {
    return (
      <View>
        <SelectMultiple
          items={Member}
          selectedItems={this.state.selectedMember}
          onSelectionsChange={this.onSelectionsChange} />
          <TouchableOpacity
          style={styles.AddMemberButton}
          >
          <Text style={StyleSheets.ButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }

  fetchData = async (id) => {
    
    const response = await fetch('http://192.168.1.3:2238/NuTimeSheetApi/UserProfile/getAllAssociate')
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
  .then(response => {if(response.StatusCode===200){ const posts = response.result;
   // alert(JSON.stringify(response.result[1]))
    Member.push(response.result[1].id)
/* for(var i =0;i<response.result.length;i++){
  //(response.result[i].ProfileId.name)
  alert(response.result[i].ProfileId.name)
} */
//alert(JSON.stringify(Member))
	//this.setState({posts,loading: false, error: false})
	}else{alert("No projects found")}});
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }, 
  AddMemberButton: {
    alignItems: 'center',
    padding: 8
  },
});

export default AddMembersToProject;