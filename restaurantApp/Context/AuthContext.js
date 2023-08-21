import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Toast } from "react-native-toast-message/lib/src/Toast";
 
import { BASE_URL } from "../Utility/config";
 
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoading,setIsLoading] = useState("true");
  const [token,setToken] = useState(null);




  const showToastOnSuccessAddToCart=()=>{


    Toast.show({
      type:'success',
      text1:'product is added',
      autoHide:true,
      visibilityTime:2500,
      position: 'bottom',
      

      
    })


  }


  const  showToastOnErrorAddToCart =()=>{
    Toast.show({
      type:'error',
      text1:'something went wrong',
      autoHide:true,
      visibilityTime:2500,
       
    })

  }


  const login = async (email, password) => {
    const url = `${BASE_URL}/user/login`;
    console.log("URL  ", url);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log("Token inside main login fun==>", data.token);
        return data.token;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};



  
   
  const logout = () => {
  
    AsyncStorage.removeItem('token');
     
  };

  const isLoggedIn = async () => {
    try {

       
      let  token =  await AsyncStorage.getItem('token');
      
      console.log("token  in AuthContext isLoggedIn",token);
      
      if(token!=null)
      {
        setToken(token);
      }
     
     
    
      
    } catch (e) {
      console.log(`loggedIn error ${e}`);
      
    }
  };














  useEffect(() => {
     
    isLoggedIn();
   
   
   
  },[]);

  return (
    <AuthContext.Provider value={{isLoading,setIsLoading,token,login,setToken,showToastOnSuccessAddToCart,showToastOnErrorAddToCart}}>
      {children}
    </AuthContext.Provider>
  );
};
