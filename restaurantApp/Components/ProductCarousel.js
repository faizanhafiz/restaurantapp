import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  
  Dimensions
} from "react-native";


import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../Utility/config";
import { Toast } from "react-native-toast-message/lib/src/Toast";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const ProductCarousel = (props) => {
  const {token,showToastOnErrorAddToCart,showToastOnSuccessAddToCart} = useContext(AuthContext);
  [product, setProduct] = useState([]);




  




  //addToCart
  const addToCart = async (productId) => {

    console.log("token inside addToCart",token);
    const headers = {
       'Authorization': `Bearer ${token}`
        
   };


     const url = `${BASE_URL}/user/addToCart/${productId}`;
     console.log("addTocart url =>",url);
    try{
       

      const response = await fetch(url,{
        headers:headers,
        method:"POST"
      })

      if(response.status==200)
      {
        
        showToastOnSuccessAddToCart();

      }else{
        showToastOnErrorAddToCart();
        console.log(response.status);
      }

    }catch(error)
    {
      throw new Error("Error while adding product to cart  : " + error.message);
    }

  };
  
  
  


  //  fetch Product
  const fetchProductsData = async () => {

    const url = `${BASE_URL}/product/products`
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch(url,{headers});
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching data: " + error.message);
    }
  };

  useEffect(() => {
    

    console.log("token insode Carousel",token);
    
    fetchProductsData()
      .then((data) => {
        setProduct(data);
        
        
      })
      .catch((err) => {
        console.log("error while fetching product ", err);
       
      });
  }, []);

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
            justifyContent:'space-between',
            width: "50%",
            height: "100%",
            paddingTop:10,
            paddingBottom:20
          }}
        >
         <View style={{justifyContent:'center',alignItems:'center'}}>
         <Text style={styles.productName}>{item.productName}</Text>
          <Text style={styles.productPrice}>
            {"\u20B9"} {item.price}
          </Text>
         </View>

        
          <TouchableOpacity style={styles.addButton} onPress={()=>addToCart(item.id)} >
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
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center', // Position the button at the end of the card
    marginTop: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  items: {
    backgroundColor: "#fff",
    width: windowWidth*0.9,
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
    marginBottom: 8,
  },
});

export default ProductCarousel;
