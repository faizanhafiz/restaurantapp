import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../Screens/Login";
import SignUp from "../../Screens/SignUp";
import ForgotPassword from "../../Screens/ForgotPassword";
import Verification from "../../Screens/Verification";
import ResetPassword from "../../Screens/ResetPassword";
import ProductScreen from "../../Screens/ProductScreen";
import Cart from "../../Screens/Cart";
import Checkout from "../../Screens/Checkout";
import OderConfirmPage from '../../Screens/OrderConfirmPage'

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}
    >

      <Stack.Screen name="CheckoutScreen" component={Checkout}/>
      <Stack.Screen name ="orderConfirmScreen"  component={OderConfirmPage}/>

      <Stack.Screen name="CartScreen" component={Cart} />

      <Stack.Screen name="productScreen" component={ProductScreen} />
      <Stack.Screen name="signupScreen" component={SignUp} />

      <Stack.Screen name="loginScreen" component={Login} />

      <Stack.Screen name="forgotpasswdScreen" component={ForgotPassword} />

      <Stack.Screen name="resetPasswordScreen" component={ResetPassword} />

      <Stack.Screen name="verificationScreen" component={Verification} />

      {/* jsnj */}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
