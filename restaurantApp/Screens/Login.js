import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  
} from "react-native";

import { useContext } from "react";
import CustomeInput from "../Components/CustomeInput";
import CustomeButton from "../Components/CustomeButton";
import AppwriterService from "../Service/AppwriterService";
import { AuthContext } from "../Context/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  

  const {login,setToken } = useContext(AuthContext);

  const handleLogin = async(email,password) => {

       

       login(email,password).then((response)=>{
        

        
       
        console.log("inside   LoginToken ==>",response);
         
        AsyncStorage.setItem('token',response);
        setToken(response);
        
        
    
        
      }).catch((err) => {
        console.log("error inside login",err);
        
      })
     
    
   
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <Text style={styles.textTitle}>Login To your Account</Text>

        <CustomeInput
          placeholder="Email"
          keyBoardType="email-address"
          secureText={false}
          setValue={setEmail}
          
        />

        <CustomeInput
          placeholder="Password"
          secureText={true}
          setValue={setPassword}
        />

        <CustomeButton onPress={()=>handleLogin(email,password)} text="Login" />

        <View  style={{marginVertical:20}}>
        <TouchableOpacity
          onPress={() => navigation.navigate("forgotpasswdScreen")}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
        </View>

        {/* <Text style={styles.orText}>- Or sign in with -</Text> */}

        {/* <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/googlelogo.png")}
              style={styles.socialImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/facebooklogo.png")}
              style={styles.socialImage}
            />
          </TouchableOpacity>
        </View> */}

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signupScreen")}>
            <Text style={[styles.signupText, styles.signupLink]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    
    backgroundColor: "#fff",
    
    
    
  },
  keyboardContainer: {
    flex: 1,
    marginTop: "10%",
    alignItems: "center",
   
    width:'100%',
    marginTop:"25%",
    
 
   
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 40,
    marginVertical: 20,
    alignSelf: "flex-start",
  },
  forgotPassword: {
    alignSelf: "flex-start",
    marginHorizontal: 40,
  },
  forgotPasswordText: {
    color: "blue",
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    marginTop: 40,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-evenly",
    width: "60%",
  },
  socialButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  socialImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  signupContainer: {
    flexDirection: "row",
  },
  signupText: {
    fontSize: 15,
    fontWeight: "500",
  },
  signupLink: {
    color: "blue",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default Login;
