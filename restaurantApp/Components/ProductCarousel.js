import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
const addTocartApi ="http://192.168.199.41:8080/user/addToCart";
const getProductListApi ="http://192.168.199.41:8080/product/products";

const ProductCarousel = (props) => {
  [product, setProduct] = useState([]);
  const addToCart = async (item) => {

    await axios.post(`${addTocartApi}/${item.id}/64cbef140db1bd4551a25524`)
    .then((response)=>{
      if(response.status==200){
        

        console.warn(item.productName+" id Added");

      }else{
        console.warn("not added");
      }
    }).catch((err)=>{
      console.log("Error in add to cart",err);
    })

   
  };
  
  //   "productName",
  //   "imageUrl",
  //   "price"
  //   "available"
  

  const fetchProductsData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching data: " + error.message);
    }
  };r

  useEffect(() => {
    fetchProductsData(getProductListApi)
      .then((data) => {
        setProduct(data);
        console.log(product);
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

        
          <TouchableOpacity style={styles.addButton} onPress={()=>addToCart(item)} >
            <Text style={styles.buttonText}>Add To Cart</Text>
          </TouchableOpacity>
           
        </View>
      </View>
    );
  };

  const renderCategoryItem = ({ item }) => {
    return (
      <View style={styles.categoryitem}>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
      // <TouchableOpacity>
      //   <Text style={styles.itemText}>{item.title}</Text>
      // </TouchableOpacity>
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
    width: "90%",
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
