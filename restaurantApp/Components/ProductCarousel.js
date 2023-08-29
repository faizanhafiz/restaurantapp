import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../Utility/config";
 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductCarousel = (props) => {
  const { product, handleConnection,showToastedError ,showToastedSuccess,token,getCart } =
    useContext(AuthContext);

  

  useEffect(() => {
     
  }, []);

  

  
  const addToCart = async (productId) => {
    
    
    props.setisLoading(true);

    await fetch(`${BASE_URL}/user/addToCart/${productId}`, {
      method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(async (response) => {
        if (response.status === 200) {
          console.log("add to cart success===============>");
          props.setisLoading(false);
          showToastedSuccess("Product added");
          getCart();
          
        } else if (response.status === 400) {
          props.setisLoading(false);
            const errorResponse = await response.json(); // Parse the response body as JSON
            const errorMessage = errorResponse.message || "Bad request"; // Use default message if no message in response
            showToastedError(errorMessage);
             
        } else if (response.status === 404) {
          props.setisLoading(false);
            showToastedError("Product not found");
            
        } else if (response.status >= 500) {
          props.setisLoading(false);
            showToastedError("Server error");
            console.log("Error in add to cart - Server error");
        }
    })
    .catch((err) => {
      props.setisLoading(false);
        showToastedError("Something went wrong");
        console.log("Error in add to cart", err);
    })
     
};


  const renderItem = ({ item }) => {
    return (
      
      <View style={styles.items}>
        {/* <Text style={styles.itemText}>{item.title}</Text> */}
        <View style={{ width: "50%", height: "100%" }}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: "90%", height: "90%", margin: 10 }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%",
            height: "100%",
            paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.productPrice}>
              {"\u20B9"} {item.price}
              
            </Text>
            <Text>
            {item.available?"Available":"Not Available"}
            </Text>
          </View>

          <TouchableOpacity
            style={item.available?styles.addButton:styles.disabledButton}
            onPress={item.available?() => addToCart(item.id):null}
            disabled={item.available?false:true}
          >
            <Text style={styles.buttonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", // This ensures the container takes 100% width of its parent
  },
  
  addButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center", // Position the button at the end of the card
    marginTop: 8,
  },
  disabledButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'gray', // Change this to your desired disabled button color
    opacity: 0.6, 
    marginTop: 8,           // Adjust opacity to indicate disabled state
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    backgroundColor: "#fff",
    width: windowWidth * 0.9,
    height: 150,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  image: {
    maxWidth: "100%", // Ensure the image fits within the parent's width
    maxHeight: "100%", // Ensure the image fits within the parent's height
    resizeMode: "contain",
    width: 50,
    height: "100%", // Maintain aspect ratio and fit within the bounds
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryitem: {
    width: 150,
    height: "50%",
    margin: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 4,
  },
});

export default ProductCarousel;
