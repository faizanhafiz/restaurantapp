import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Screens/Login';
import SignUp from '../../Screens/SignUp';

const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='SignUp'>
       
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}