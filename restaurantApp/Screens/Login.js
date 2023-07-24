import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import CustomeInput from "../Components/CustomeInput";
import CustomeButton from "../Components/CustomeButton";


const HandleLogin = () => {
  console.warn("Login pressed");
}

const pressOn = () => {
  console.warn("Presss on");
}
const Login = () => {

  return (
    <View style={styles.container}>
            <Image source={require('../assets/favicon.png')} style={[styles.image,{ width: 120,height:80 ,marginVertical:20}]} />

 
      <>
        <Text style={styles.textTitle}>Login To your Account</Text>



        <CustomeInput placeholder="Email" keyBoardType="email-address" secureText={false} />

        <CustomeInput placeholder="Password" secureText={true} />


        <CustomeButton onPress={HandleLogin} text="Login"></CustomeButton>






        <Text style={{ fontSize: 14, marginTop: 40 }}>- Or sign in with -</Text>

        <View style={styles.LowerButton}>

          <TouchableOpacity style={styles.button} >
            <Image source={require("../assets/googlelogo.png")} style={[styles.image, { width: 30 }]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Image source={require("../assets/facebooklogo.png")} style={styles.image} />
          </TouchableOpacity>

        </View>

      </>


      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.textStyle} >Don't have  an account? </Text><TouchableOpacity  ><Text style={[styles.textStyle, { color: 'blue' }]} >Sign up</Text></TouchableOpacity>

    

      </View>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    


  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: "row",
    marginHorizontal: 40,
    marginVertical: 20,




    alignSelf: 'flex-start'



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
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-evenly',

    width: '60%'
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 500
  }
});
