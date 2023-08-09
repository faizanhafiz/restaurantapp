import {
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
const deviceWidth = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/FontAwesome";
var  total =0;
const getCartApi = "http://192.168.199.41:8080/user/getCart";
//    example : http://192.168.199.41:8080/user/getCart/<userId>

const Cart = () => {
  const [cartlist, setCartList] = useState([]);

  const[loading,setLoading] = useState(true);

  

  const CartItems = async (userId) => {
    try {
      const response = await fetch(`${getCartApi}/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to handle it at a higher level
    }
  };

  

   const getTotal = () => {
                 
                  cartlist.forEach((item)=>{
                                    total+=item.quantity*item.price;
                      console.log(total);    
                  })

                  console.log(total);

                };

  useEffect(() => {
    CartItems("64cbef140db1bd4551a25524")
      .then(async (data) => {
        await setCartList(data);
        console.log(cartlist);
        getTotal();

        setLoading(false);
      })
      .catch((err) => {console.log(err);
                  setLoading(false);

      }
      
      );

      
  }, []);

  const renderCartItem = ({ item }) => {
    return (
      <View style={{ width: "95%", height: 100 ,marginTop:20,flexDirection:'row' ,justifyContent:'space-between',flexWrap:'wrap'}}>
         <View             style={{ width: '30%', height: '100%', borderRadius: 10 ,elevation:5}}>
         <Image
            source={{ uri: item.imageUrl }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
         </View>

         <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.cartlisttext}>{item.productName}</Text>
                  <Text style={styles.cartlisttext}> {"\u20B9"} {item.price}</Text>
        </View>

        
                  <View  style={{justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity style={{justifyContent:'center'}}>
                                    <Text style={{fontSize:30}}>+</Text>
                                    </TouchableOpacity>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Text  style={{width:30,height:30,backgroundColor:'#000',color:'#fff',textAlign:'center',borderRadius:5}}>{item.quantity}</Text>

                                    </View>
                                    <TouchableOpacity style={{justifyContent:'center'}}>
                                    <Text style={{fontSize:30}}>-</Text>
                                    </TouchableOpacity>

                  </View>
       
      </View>
    );
  };

  return (
    loading?<Text>Loading.............</Text>:
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Icon name="arrow-left" size={25} color="#000" />
          <Text style={styles.headingTitle}>Cart</Text>
        </TouchableOpacity>

        <View style={styles.profileimage}>
          <Image
            source={{
              uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>

      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000" }}>
        My
      </Text>
      <Text style={{ fontSize: 24, color: "#000" }}>Cart List</Text>

      <FlatList
        data={cartlist}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
      />

      <View style={{height:'10%'}}>
         <View>
         <Text>Total</Text>  
         <Text>{total}</Text>

                  </View>       

      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
  },
  profileimage: {
    overflow: "hidden",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    width: deviceWidth * 0.2,
    aspectRatio: 1,
    borderRadius: deviceWidth * 0.5,
    borderWidth: 1,
    borderColor: "#FF6200",
    
  },
  headingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    margin: 10,
  },
  cartlisttext:{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#000",
                  margin: 5,
  }
});
