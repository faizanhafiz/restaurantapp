import { StyleSheet} from 'react-native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { AuthProvider } from './Context/AuthContext';
import AppNav from './Navigators/AppNav';
import { State } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';


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
  },
});
