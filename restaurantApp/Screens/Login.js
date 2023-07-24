import React from "react";
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>Login</Text>

      <TextInput placeholder="@ Email" style={styles.input} />

      <TextInput placeholder="Password" style={styles.input} />

      <TouchableOpacity
        style={{ width: "80%", margin: 20 }}
        onPress={console.log("signup pressed")}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.text}>New User?</Text>
        <TouchableOpacity  onPress={console.log("login pressed")}><Text style={{color:'blue',fontSize:16}} >SignUp</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderBottomWidth: 1,

    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  headerStyle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#007bff",
  },
  row: {
    marginTop:10,
    flexDirection: 'row', // Aligns children in a row horizontally
    alignItems: 'center', // Aligns children vertically in the center
  },
  text: {
    marginRight: 8, // Add some space between the text and the icon
    fontSize: 16,
  },
});

export default Login;
