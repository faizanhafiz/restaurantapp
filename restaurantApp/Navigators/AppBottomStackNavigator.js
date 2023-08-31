import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Checkout from "../Screens/Checkout";
import OrderConfirmPage from "../Screens/OrderConfirmPage";
import Cart from "../Screens/Cart";
import ProductScreen from "../Screens/ProductScreen";
import Order from "../Screens/Order";
import AddAddress from "../Screens/AddAddress";
import Verification from "../Screens/Verification";

const productName = "Home";
const cartName = "Cart";
const checkoutName = "Checkout";
const orderName = "Order"; // Changed to "Order"
const orderConfirm = "OrderConfirmPage";
const addAddress = "addAddressScreen";
const emailverification = "verificationScreen"

const Tab = createBottomTabNavigator();

export const AppBottomStackNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={productName}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        // tabBarStyle:{backgroundColor:'blue'},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          const routeName = route.name;

          if (routeName === productName) {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName === cartName) {
            iconName = focused ? "cart" : "cart-outline";
          } else if (routeName === checkoutName) {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (routeName === orderName) {
            iconName = focused ? "list" : "list-outline"; // Use "list" and "list-outline"
          } else {
            iconName = focused ? "help" : "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={productName}
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={cartName}
        component={Cart}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={checkoutName}
        component={Checkout}
        options={{ headerShown: false, tabBarButton: () => null }}
      />
      <Tab.Screen
        name={addAddress}
        component={AddAddress}
        options={{ headerShown: false, tabBarButton: () => null }}
      />

      <Tab.Screen
        name={orderName}
        component={Order}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={orderConfirm}
        component={OrderConfirmPage}
        options={{ headerShown: false, tabBarButton: () => null }}
      />

      <Tab.Screen
        name={emailverification}
        component={Verification}
        options={{ headerShown: false, tabBarButton: () => null }}
      />    
      
    </Tab.Navigator>
  );
};
