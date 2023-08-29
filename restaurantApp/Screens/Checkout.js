
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../Utility/config";
import Loader from "./Loader";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Checkout = ({navigation}) => {
  const [isSelected, setSelection] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const {
    token,
    userData,
    showToastedError,
    showToastedSuccess,
    getUserData
     
  
  }  = useContext(AuthContext);

 
  

  const handleAddAddress = async() => {

    try{

       if (address.length <= 0)
       {

        showToastedError("please enter address")
        return;
         
      }
      else if(landmark.length<=0)
      {
        showToastedError("please enter landmark");
        return;
  
      }

      setIsLoading(true);
  
      await  fetch(`${BASE_URL}/user/addAddress`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({
          address:address,
          landmark:landmark,
          newMobile:newMobile
        })
      }).then((response)=>{
        
         console.log(response.json());
        if(response.status===200)
        {
          setModalVisible(false)
          console.log(response.status);
           setIsLoading(false);
           showToastedSuccess("address added");
           getUserData();
        }else if(response.status===400)
        {
            console.log(response.status)
            console.log(response.json().message)
            setIsLoading(false);
            showToastedError(response.json().message);
        }
        else if(response.status==500)
        {
          console.log(response.status)
          console.log(response.json().message)
            setIsLoading(false);
            showToastedError(response.json().message);

        }else { 

          console.log(response.status)
          setIsLoading(false);
          showToastedError("Something went wrong");


        }

      })
      

    }catch(error)
    {

      setIsLoading(false);
      console.log("Error inside handleAddAddress ",error);

    }
  };



  const placeOrderHandler = async() => {
  // console.warn("Order Placed");
  try{

    setIsLoading(true);

    if(selectedAddressId==null)
    {
      showToastedError("Please select Address");
      return;
    }

    await fetch(`${BASE_URL}/order/placeOrder/${selectedAddressId}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`

      }
    }).then((response)=>{
      if(response.status===200)
      {
        setIsLoading(false);
        
        navigation.navigate("OrderConfirmPage");
        getUserData();


      }else if(response.status==400)
      {
        setIsLoading(false);
        showToastedError("")

      }else if(response.status===500)
      {

        setIsLoading(false);
        showToastedError("Server error");
      }else {
        setIsLoading(false);
        showToastedError("something went wrong please try again")

      }
    })

  }catch(error)
  {
    setIsLoading(false);
    console.log("Error inside placeOrderHandler",error);
  }
    
  };

  const renderAddress = ({ item }) => {
    const isSelected = selectedAddressId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.addressContainer,
          isSelected && styles.selectedAddressContainer,
        ]}
        onPress={() => {
          setSelectedAddressId(item.id);
        }}
      >
      
        <Text>{item.address}</Text>
        <Text>{item.landmark}</Text>
        <Text>{item.newMobile}</Text>
        <Text >{item.mobile}</Text>
      </TouchableOpacity>
    );
  };

   return (
   <>
    <SafeAreaView style={styles.container}>

     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
         <KeyboardAvoidingView
          behavior="padding"
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.addressTitle}>Add New Address</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter address"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Enter landmark"
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new mobile number (optional)"
              value={newMobile}
              onChangeText={(text) => setNewMobile(text)}
            />
            <Pressable
              style={[
                styles.addAddressButton,
                (!address || !landmark) && styles.disabledButton,
              ]}
              disabled={!address || !landmark}
              onPress={handleAddAddress}
            >
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    

      
       
      {/* <View style={{flexDirection:'row' ,alignItems:'center'}}>
      <TouchableOpacity style={styles.header}>
        <Icon name="arrow-left" size={26} color="#000" />
        
      </TouchableOpacity>
      <Text style={styles.headingTitle}>Check Out</Text>
      </View> */}
     

      <View style={styles.addressSection}>
        <View style={styles.addressHeading}>
          <Text style={styles.subheading}>Address</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={[styles.subheading, { fontSize: 14, color: "#FF6200" }]}
            >
              Add Address
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={userData.address}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id} // Convert to string
          renderItem={renderAddress}
        />
      </View>

      {/* ... Payment and Total sections */}
      <View style={styles.paymentSection}>
        <Text style={styles.subheading}>Payment</Text>

        <View style={styles.paymentStyle}>
          <Text style={styles.cashondelivery}>Cash on Delivery</Text>
          <Text style={styles.cashondeliveryprice}>{"\u20B9"} {userData.cartTotal}</Text>
        </View>

        <View style={styles.paymentStyle}>
          <Text style={styles.cashondelivery}>UPI Payment</Text>
          <Text style={styles.cashondeliveryprice}>comming Soon</Text>
        </View>
      </View>

      <View style={styles.totalSection}>
        <View>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>{"\u20B9"} {userData.cartTotal}</Text>
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={placeOrderHandler}
        >
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    
    </SafeAreaView>
        {isLoading?<Loader/>:null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9",
    padding: 10,
    paddingTop:40
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: windowWidth * 0.2,
    height: windowHeight * 0.08,
  },
  headingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    margin: 10,
  },
  cashondelivery: {
    fontSize: 16,
    fontWeight: "600",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    margin: 5,
  },
  addressSection: {
    height: windowHeight * 0.4,
  },
  addressContainer: {
    width: windowWidth * 0.9,
    elevation: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  paymentSection: {
    height: windowHeight * 0.37,
  },
  totalSection: {
    height: windowHeight * 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: windowWidth * 0.05,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "400",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
  },
  placeOrderButton: {
    backgroundColor: "#FF6200",
    height: windowHeight * 0.07,
    width: windowWidth * 0.4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  paymentStyle: {
    width: windowWidth * 0.9,
    elevation: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  cashondeliveryprice: {
    fontSize: 16,
    fontWeight: "800",
    margin: 5,
  },
  selectedAddressContainer: {
    borderColor: "#FF6200",
    borderWidth: 2,
  },
  addressHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  modalInput: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    marginVertical: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    justifyContent:'center',
    alignItems:'center',
    width: "90%",
    margin: 10,
    
    
    
    // #FF6200
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  addAddressButton: {
    backgroundColor: "#000",
    height: windowHeight * 0.07,
    width: windowWidth * 0.4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  modalHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
    margin:5
  }
});

export default Checkout;

