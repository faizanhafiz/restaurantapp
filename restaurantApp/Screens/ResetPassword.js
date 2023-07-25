import { StyleSheet,Keyboard, Text, View,TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import CustomeInput from '../Components/CustomeInput'
import CustomeButton from '../Components/CustomeButton'
import { ToastAndroid } from 'react-native/'
 
const HandleChangePassword=()=>{
              if(password!==confirmpassword)
              {
                  console.warn("password not matched")

              }  else{
                  Keyboard.dismiss();
                  ToastAndroid.showWithGravity("Successfully password changed !!",ToastAndroid.LONG,ToastAndroid.TOP)
              }

}
const ResetPassword = () => {
[password , setPassword]=useState();
[confirmpassword , setconfirmPassword]=useState();
  return (
                  <TouchableWithoutFeedback onPressOut={()=>Keyboard.dismiss()} >
    <View style={styles.container}>
                  <Text style={{fontSize:25,marginVertical:10}}>Reset  Password</Text>
                  <CustomeInput  placeholder="Enter new password" keyBoardType="email-address" secureText={false} setValue={setPassword} />
                  <CustomeInput  placeholder="Confirm new password" keyBoardType="email-address" secureText={false} setValue={setconfirmPassword} />
                  <CustomeButton onPress={HandleChangePassword} text="Change Password"></CustomeButton>

      
    </View>
    </TouchableWithoutFeedback>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
                  container:{
                                    flex: 1,
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    
                                   
                                    backgroundColor: '#fff',
                                    paddingHorizontal:20                
                                    
                                
                                    }

})