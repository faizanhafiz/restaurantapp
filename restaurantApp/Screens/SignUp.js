import {
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import React, { useContext, useState } from "react";
import CustomeInput from "../Components/CustomeInput";
import AppwriterService from "../Service/AppwriterService";
import { EmailVerification } from "../Service/EmailVerification";

import CustomeButton from "../Components/CustomeButton";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signUp, showToastedSuccess, showToastedError, handleConnection } =
    useContext(AuthContext);
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const HandleSignup = async () => {
    setIsLoading(true);
    const isConnected = handleConnection();

    if (isConnected === false) {
      setIsLoading(false);
      showToastedError("No internet connection");
      return;
    }

   
    if (!email || !password || !name || !mobile) {
      setIsLoading(false);
      showToastedError("Please enter all Fields");
    } else if (!isValidEmail(email)) {
      setIsLoading(false);
      showToastedError("Please enter a valid email address.");
    } else if (password.length < 4) {
      setIsLoading(false);
      showToastedError("Password must be at least 4 characters long.");
    }else if(mobile.length!=10)
    {
      setIsLoading(false);
      showToastedError("Please Enter correct number");
    }
    
    else{

      try{
        
      const response = await signUp(email, password, name, mobile);
      if(response.status===200)
      {
        response.json()
        .then((data)=>{
          const message = data.message;
          setIsLoading(false);
          showToastedSuccess(message);
          navigation.navigate('verificationScreen')

        })
      }
      else if (response.status === 500) {
        setIsLoading(false);
        showToastedError("Something went wrong on the server.");
      }else if(response.status === 400)
      {
        setIsLoading(false);
        showToastedError("User Already Exist");
        navigation.navigate('loginScreen')
      }
      else {
        
        setIsLoading(false);
        showToastedError("Network issue");
      }

    

      }catch(error)
      {
          setIsLoading(false);
          showToastedError("Network issue")
      }
    }

   
  };

  return (
   <>
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={[styles.container, { marginTop: "25%" }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior for iOS and Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Offset to account for headers
      >
        <Text style={styles.textTitle}>Create your Acount</Text>
        <CustomeInput placeholder="Name" setValue={setName} />
        <CustomeInput
          placeholder="Email"
          keyBoardType="email-address"
          secureText={false}
          setValue={setEmail}
        />
        <CustomeInput placeholder="Mobile" setValue={setMobile} />
        <CustomeInput
          placeholder="Password"
          secureText={true}
          setValue={setPassword}
        />

        <CustomeButton onPress={HandleSignup} text="Sign up"></CustomeButton>

        {/* <Text style={{ fontSize: 14, marginTop: 40 }}>- Or sign up with -</Text> */}

        {/* <View style={styles.LowerButton}>

          <TouchableOpacity style={styles.button} >
            <Image source={require("../assets/googlelogo.png")} style={[styles.image, { width: 30 }]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Image source={require("../assets/facebooklogo.png")} style={styles.image} />
          </TouchableOpacity>

        </View> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textStyle}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("loginScreen")}>
            <Text style={[styles.textStyle, { color: "blue" }]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    {isLoading?<Loader/>:null}
    </>
  );
};

export default SignUp;

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
    width: "100%",
    alignItems: "center",

    backgroundColor: "#fff",
    height: "100%",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "700",
    flexDirection: "row",
    marginHorizontal: 40,
    marginVertical: 20,

    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#fff", // Customize the button background color
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 50, // Customize the image width
    height: 50, // Customize the image height
    resizeMode: "contain", // Adjust the image resizing mode as needed
  },
  LowerButton: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-evenly",

    width: "60%",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 500,
    marginVertical: 20,
  },
});
