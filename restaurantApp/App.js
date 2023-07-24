import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

 
import CustomeInput from './Components/CustomeInput';

import SignUp from './Screens/SignUp';
import Login from './Screens/Login';


export default function App() {
  return (
    <View style={styles.container}>
      
   
      <Login/>
    
      


    </View>

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
