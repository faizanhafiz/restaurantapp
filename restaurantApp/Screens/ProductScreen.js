import { View, Text, StyleSheet, Dimensions, Image, TextInput ,ActivityIndicator} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProductCarousel from "../Components/ProductCarousel";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

const deviceWidth = Dimensions.get("window").width;

const ProductScreen = () => {

  const [isLoading ,setisLoading] = useState(false);

  const {token,userData,getUserData}  = useContext(AuthContext);

   const [userName ,setUserName]  = useState('');

  




  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      console.log("token inside product Screen", token);
      
      await getUserData();
      
  
     
     
        setisLoading(false);
      
      
    };
  
    fetchData();
  }, []);

  useEffect(()=>{
    console.log("user ==",userData)
    if (userData && userData.userName) {
      const name = userData.userName;
      const firstName = name.split(' ')[0];
      const formattedFirstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        setUserName(formattedFirstName);
    } else {
      // Handle the case where userData or userName is undefined
    }

  },[userData])
  

  
  
 
  return (
    // isLoading ? (
    //   <ActivityIndicator size="large" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} color="#E85F5C"  />
       
    // ) : 
    <>
    <View style={styles.container}>
      {/* Header */}
     <View  style={{ paddingHorizontal:20}}>

     <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FF6200" }}>Hi {userName}</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>Order & Eat</Text>
        </View>
        {/* <View style={styles.profileimage}>
          
          <Image
            source={{
              uri:
                "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={{ width: "100%", height: "100%" }}
          />
          </View> */}

      </View>



      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={require("../assets/freedelivery.png")}
          style={styles.bannerImage}
        />
      </View>

      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
          Food Available
        </Text>
     </View>

      
      {/* Carousel */}
      <View style={styles.carouselContainer}>

      
        
        <ProductCarousel  setisLoading={setisLoading} />
      </View>
    </View>
    {isLoading ?<Loader/>:null}

    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
    paddingTop: "10%",
  },
  activityIndicator: {
    
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "7%",
    marginBottom: 20
  },
  search: {
    marginBottom: "3%",
  },
  searchInput: {
    borderColor: "#f5f5f5",
    borderWidth: 1,
    padding: 5,
    borderRadius: 15,
    backgroundColor: "#e9e9e9",
  },
  banner: {
    aspectRatio: 2.5, // Maintain a 2.5:1 aspect ratio
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    overflow: "hidden",
   
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  carouselContainer: {
    flex: 1,
    paddingTop:'3%',
    
  },
  profileimage: {
    overflow: "hidden",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    width: deviceWidth * 0.2,
    aspectRatio: 1,
    borderRadius: deviceWidth * 0.1,
    borderWidth: 2,
    borderColor: "#FF6200",
    
  },
});

export default ProductScreen;
