import 'react-native-gesture-handler';
import { StyleSheet,ActivityIndicator} from 'react-native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

 import AppNav from './Navigators/AppNav';
 import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './Context/AuthContext';
 

export default function App() {

  
  return (
     
      
   <AuthProvider>
      <AppNav/>
     <Toast/>
        
       
    </AuthProvider>
    
      


     

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
