import { StyleSheet, Text, View ,StatusBar} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import CustomeInput from './Components/CustomeInput';

import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import AuthStackNavigator from './Navigators/AuthNavigator/AuthStackNavigator';


export default function App() {
  return (
     
      
   
      <NavigationContainer>
        
        <AuthStackNavigator/>

      </NavigationContainer>
    
      


     

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
