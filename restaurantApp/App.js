import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AuthStackNavigator from './Navigators/AuthNavigator/AuthStackNavigator'

import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <View style={styles.container}>
      
   
   
   <NavigationContainer>
    <AuthStackNavigator/>
   </NavigationContainer>
      


    </View>

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
