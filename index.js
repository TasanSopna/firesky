import { Navigation } from 'react-native-navigation';

import Login from './app/screens/Login';
import Projects from './app/screens/Projects';
import Timesheet from './app/screens/Timesheet';
import Info from './app/screens/Info';
import Tasks from './app/screens/Tasks';
import Profile from './app/screens/Profile';
import Home from './app/screens/Home';
import CreateProject from './app/screens/CreateProject';
import AddTimeEntry from './app/screens/AddTimeEntry';
import AddTaskEntry from './app/screens/AddTaskEntry';
import EditTimeEntry from './app/screens/EditTimeEntry';
import Associate from './app/screens/Associate';
import AssignTask from './app/screens/AssignTask';
import EditTask from './app/screens/EditTask';
import EditProject from './app/screens/EditProject';
import EditProfile from './app/screens/EditProfile';
import RenderIf from './app/screens/RenderIf';
import RemoveProjectMembers from './app/screens/RemoveProjectMembers';
import RemoveTaskMembers from './app/screens/RemoveTaskMembers';
import SubmittedTimesheet from './app/screens/SubmittedTimesheet';
import RejectedTimesheet from './app/screens/RejectedTimesheet';
import ApprovedTimesheet from './app/screens/ApprovedTimesheet';
import GetAllTimesheets from './app/screens/GetAllTimesheets';



  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Projects', () => Projects);
  Navigation.registerComponent('Timesheet', () => Timesheet);
  Navigation.registerComponent('Tasks', () => Tasks);
  Navigation.registerComponent('Info', () => Info);
  Navigation.registerComponent('Profile', () => Profile);
  Navigation.registerComponent('CreateProject', () => CreateProject);
  Navigation.registerComponent('AddTimeEntry', () => AddTimeEntry);
  Navigation.registerComponent('AddTaskEntry', () => AddTaskEntry);
  Navigation.registerComponent('EditTimeEntry', () => EditTimeEntry);
  Navigation.registerComponent('Associate', () => Associate);
  Navigation.registerComponent('AssignTask', () => AssignTask);
  Navigation.registerComponent('EditTask', () => EditTask);
  Navigation.registerComponent('EditProject', () => EditProject);
  Navigation.registerComponent('EditProfile', () => EditProfile);
  Navigation.registerComponent('RenderIf', () => RenderIf);
  Navigation.registerComponent('RemoveProjectMembers', () => RemoveProjectMembers);
  Navigation.registerComponent('RemoveTaskMembers', () => RemoveTaskMembers);
  Navigation.registerComponent('SubmittedTimesheet', () => SubmittedTimesheet);
  Navigation.registerComponent('RejectedTimesheet', () => RejectedTimesheet);
  Navigation.registerComponent('ApprovedTimesheet', () => ApprovedTimesheet);
  Navigation.registerComponent('GetAllTimesheets', () => GetAllTimesheets);

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Login',
      title: 'NU Time Sheet',
      navigatorStyle: {}, 
	}	  
  });
  console.disableYellowBox = true;


