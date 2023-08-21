import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import CustomeButton from '../Components/CustomeButton';

const { width, height } = Dimensions.get('window');

const HandleForgotPassword = (email) => {
  console.warn("forgot password " + email);
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container} behavior="padding">
     
     <View style={{marginTop:height*0.15}}>

     <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Enter the email address associated with your account</Text>

  <KeyboardAvoidingView style={{width:width*0.8,alignItems:'center'}}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

  <CustomeButton onPress={HandleForgotPassword} text="Get OTP"/>
  </KeyboardAvoidingView>
     </View>
      {/* <TouchableOpacity style={styles.button} onPress={() => HandleForgotPassword(email)}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    alignItems: 'center',
    
    backgroundColor: '#fff',
    paddingHorizontal: 20,
     // Responsive vertical padding
  },
  title: {
    
    fontSize: 18,
    fontWeight: "bold",
    
    marginVertical: 20,
    
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ForgotPassword;
