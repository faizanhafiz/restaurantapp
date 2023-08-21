import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import ForgotPassword from "../Screens/ForgotPassword";
import Verification from "../Screens/Verification";
import ResetPassword from "../Screens/ResetPassword";


const Stack = createStackNavigator();

export const  AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}
    >
      <Stack.Screen name="signupScreen" component={SignUp} />
      <Stack.Screen name="loginScreen" component={Login} />
      <Stack.Screen name="forgotpasswdScreen" component={ForgotPassword} />

      <Stack.Screen name="resetPasswordScreen" component={ResetPassword} />

      <Stack.Screen name="verificationScreen" component={Verification} />

      {/* jsnj */}
    </Stack.Navigator>
  );
};

 
 