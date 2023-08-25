import { View, Text, StyleSheet, Dimensions, Image, TextInput } from "react-native";
import React, { useContext, useEffect } from "react";
import ProductCarousel from "../Components/ProductCarousel";
import { AuthContext } from "../Context/AuthContext";

const deviceWidth = Dimensions.get("window").width;

const ProductScreen = () => {

  const {token}  = useContext(AuthContext);



  useEffect(()=>{
    console.log("token inside product Screen",token);
  },[]);
   
 
  return (
    <View style={styles.container}>
      {/* Header */}
     <View  style={{ paddingHorizontal:20}}>

     <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FF6200" }}>Hi Faizan</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>Order & Eat</Text>
        </View>
        <View style={styles.profileimage}>
          
          <Image
            source={{
              uri:
                "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={{ width: "100%", height: "100%" }}
          />
          </View>

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

      
        
        <ProductCarousel />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
    paddingTop: "10%",
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
