import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import NetInfo from "@react-native-community/netinfo"; // Import NetInfo for network status
import { BASE_URL } from "../Utility/config";
import {StyleSheet,ActivityIndicator} from 'react-native'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [product,setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [userData ,setUserData]  = useState([]);

  

  const getCart=async ()=>{

    try{

        await fetch(`${BASE_URL}/user/getUser`,{
          method:"GET",
          headers:{
            "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
          }
        })
        .then((response)=>{
           
          if(response.status===200)
          {
             
            return response.json();
          }
        }).then((data)=>{
           
          
          setUserData(data);
        }).catch((err) => {
          if(err.response){
            if(err.response.status=404)
            {
  
              console.log("cart not found");
            }else if(err.response.status=400){

              console.log("User  not found");            }
            else if(err.response.status=500)
            {
              showToastedError("something went  wrong in server")
            }else{
              showToastedError("Network issue");
            }
          }
        });
    }catch(err)
    {
      console.log(err);    }

  }

  const handleConnection = async () => {
    const netInfoState = await NetInfo.fetch();

    if (!netInfoState.isConnected) {
      return false;
    }
  };

   
  const getUserData = async()=>{
    try
    {

      

     await  fetch(`${BASE_URL}/user/getUser`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }
      }).then((response)=>{
         
        if(response.status===200)
        {
         return  response.json();
        }
      }).then(data=>{
        
        setUserData(data);
         
        

      })
      .catch((err) => {
        if(err.response){
          if(err.response.status=404)
          {

            showToastedError("User not found");
          }else if(err.response.status=400){
            showToastedError("token must not be null");
          }
          else if(err.response.status=500)
          {
            showToastedError("something went  wrong in server")
          }else{
            showToastedError("Network issue");
          }
        }
      });
    }catch(err){
      console.log(err);
    } 
  }


  const getProducts = async () => {
   try{
     console.log("product url ==>",`${BASE_URL}/product/products`);

    const isConnected = handleConnection();
    if (isConnected == false) {
      showToastedError("No internet connection");
      return;
    }
    await fetch(`${BASE_URL}/product/products`)
      .then((response) => {
        if (response.status === 200) {
         
          return response.json();
        }
      }).then((data)=>{
        
         
         
         setProducts(data);
        
     
      })
      .catch((err) => {
        if(err.response){
          if(err.response.status=404)
          {

            showToastedError("product not found");
          }
          else if(err.response.status=500)
          {
            showToastedError("something went  wrong in server")
          }else{
            showToastedError("Network issue");
          }
        }
      });

   }catch(error)
   {
    showToastedError("An error occurred while fetching products");
   }
  };
 
  const login = async (email, password) => {
    try {
      return  await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  
 const signUp=async(email,password,name,mobile)=>{
    try{
      return await fetch(`${BASE_URL}/user/addUser`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          userName:name,
          email:email,
          password:password,
          mobile:mobile
        })

      })

    }catch(err)
    {
      console.log(err);
    }

  }

  const showToastedError = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      autoHide: true,
      position: "top", // Display at the top
      visibilityTime:2500
    });
  };

  const showToastedSuccess = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      autoHide: true,
      position: "top", // Display at the top
      visibilityTime:2500
    });
  };

  const logout = () => {
    AsyncStorage.removeItem("token");
  };


 

  const isLoggedIn = async () => {
    try {
     
     
      let token = await AsyncStorage.getItem("token");

      console.log("token  in AuthContext isLoggedIn", token);

      if (token != null) {
       
          setToken(token);
           
                  
      }
    } catch (e) {
      console.log(`loggedIn error ${e}`);
    }
  };


   
  useEffect(() => {
      //  AsyncStorage.removeItem('token');
    isLoggedIn();
    getProducts();
    
    
     
    
  }, []);

  

  

  


   

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        token,
        login,
        setToken,
        showToastedError,
        showToastedSuccess,
        product,
        setProducts,
        handleConnection,
        signUp,
        cart,
        userData,
        getUserData,
        getCart,
        setCart
        
      }}
    >
    

      {children}
    </AuthContext.Provider>
  );
};

const styles= StyleSheet.create({
  
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
