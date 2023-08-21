import { StyleSheet,Platform, Text,SafeAreaView, View,TouchableOpacity,Image,KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomeInput from '../Components/CustomeInput'
import AppwriterService from '../Service/AppwriterService' 
import { EmailVerification } from '../Service/EmailVerification'

 
 
import CustomeButton from '../Components/CustomeButton'
import { AuthContext } from '../Context/AuthContext'





const SignUp = ({navigation}) => {
  
  [email ,setEmail] = useState();
  [password,setPassword] = useState();
  [loading ,setLoading] = useState(false);


  const HandleSignup= ()=>{

    

 
}




  return (
     
   
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={[styles.container,{marginTop:'25%'}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS and Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Offset to account for headers
      >

              <Text style={styles.textTitle}>Create your Acount</Text>
              <CustomeInput placeholder="Email" keyBoardType="email-address" secureText={false}  setValue={setEmail}/>
              <CustomeInput placeholder="Password" secureText={true} setValue={setPassword} />
              <CustomeInput placeholder="Confirm Password" secureText={true}  setValue={setPassword}/>
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
        <View style={{ flexDirection: 'row' }}>
        <Text style={styles.textStyle} >Already have an  account? </Text><TouchableOpacity onPress={()=>navigation.navigate("loginScreen")} ><Text style={[styles.textStyle, { color: 'blue' }]} >Sign in</Text></TouchableOpacity>

     

      </View>
      
      </KeyboardAvoidingView>

    </SafeAreaView>
     
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    
    
    
    backgroundColor: '#fff',
    height:'100%',
    
    
    


  },
  textTitle: {
    fontSize: 18,
    fontWeight: '700',
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
    fontWeight: 500,
    marginVertical:20
  }
});
