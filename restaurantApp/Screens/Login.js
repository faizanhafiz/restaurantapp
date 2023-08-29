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
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    login,
    setToken,
    showToastedSuccess,
    showToastedError,
    handleConnection,
     
    
  } = useContext(AuthContext);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
  
    const isConnected = handleConnection();
  
    if (isConnected === false) {
      showToastedError("No internet connection");
      return;
    }
  
    if (!email || !password) {
      setIsLoading(false);
      showToastedError("Please enter both email and password.");
      
    } else if (!isValidEmail(email)) {
      setIsLoading(false);
      showToastedError("Please enter a valid email address.");
    } else if (password.length < 4) {
      setIsLoading(false);
      showToastedError("Password must be at least 4 characters long.");
    } else {
      try {
        const response = await login(email, password);
  
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              const token = data.token;
              console.log("Token", token);
  
              if (token != null) {
                setToken(token);
                AsyncStorage.setItem("token", token);
                showToastedSuccess("Login Success");
                 
              }
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              showToastedSuccess("Something went wrong on the server.");
            });
        } else if (response.status === 400) {
          setIsLoading(false);
          showToastedError("Please enter correct email and password");
        } else if (response.status === 500) {
          setIsLoading(false);
          showToastedError("Something went wrong on the server.");
        } else {
        
          setIsLoading(false);
          showToastedError("Network issue");
        }
      } catch (err) {
        setIsLoading(false);
        showToastedError("Network issue");
      }
    }
  };
  
  

  return isLoading ? (
    <ActivityIndicator  size='large' color='blue' animating={isLoading} style={styles.activityIndicator} />
  ) : (
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

        <CustomeButton
          onPress={() => handleLogin(email, password)}
          text="Login"
        />

        <View style={{ marginVertical: 20 }}>
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

      {/* <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: "#fff",
  },
  keyboardContainer: {
    flex: 1,
    marginTop: "10%",
    alignItems: "center",

    width: "100%",
    marginTop: "25%",
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
