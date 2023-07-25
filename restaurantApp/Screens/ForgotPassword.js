import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomeInput from '../Components/CustomeInput'
import CustomeButton from '../Components/CustomeButton'
const HandleForgotPassword=()=>{
                  console.warn("forgot password "+email);
}
const ForgotPassword = () => {
  [email,setEmail]=useState();
  return (
                  
    <View style={styles.container}>
      <Text style={{fontSize:25,marginVertical:10}}>Forgot Password?</Text>
      <Text style={{fontSize:16,fontWeight:300 ,marginBottom:40}}>Enter the email address associated with your account</Text>

      <CustomeInput  placeholder="Email" keyBoardType="email-address" secureText={false} setValue={setEmail} />
      <CustomeButton onPress={HandleForgotPassword} text="Get OTP"></CustomeButton>

    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({

                  container:{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  
                 
                  backgroundColor: '#fff',
                  paddingHorizontal:20                
                  
              
                  }
                }
)