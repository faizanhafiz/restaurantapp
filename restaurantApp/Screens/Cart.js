import {
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { BASE_URL } from "../Utility/config";
import { AuthContext } from "../Context/AuthContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
var tmp = 0;
const getCartApi = `${BASE_URL}/user/getCart`;
 
const Cart = () => {
  const [cartlist, setCartList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const { token } = useContext(AuthContext);

  const checkOut = () => {
    console.warn("Checkout pressed");
  };

  const CartItems = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`

      };
      const response = await fetch(`${getCartApi}`, {
        headers: headers,
        method: "GET"
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      if(response.ok)
      {
        console.log("inside success",response.json());
        const data = await response.json();
        return data;
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
    }
  };

  useEffect(() => {
    CartItems()
      .then( (data) => {
          setCartList(data);
        console.log(cartlist);
        getTotal();

        setLoading(false);
      })
      .catch((err) => {
        console.log("error in getCart",err);
        setLoading(false);
      });
  }, []);

  const getTotal = () => {
    cartlist.forEach((item) => {
      tmp += item.quantity * item.price;
      console.log(tmp);
    });

    console.log(tmp);
    setTotal(tmp);
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        </View>

        <View style={styles.itemDetailsContainer}>
          <Text style={styles.cartlisttext}>{item.productName}</Text>
          <Text style={styles.cartlisttext}>
            {"\u20B9"} {item.price}
          </Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <View style={styles.quantityBox}>
            <Text style={styles.quantityText}>
              {item.quantity}
            </Text>
          </View>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return loading ? (
    <Text>Loading.............</Text>
  ) : (
    <View style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.header} onPress={() => console.log("Back button pressed")}>
          <Icon name="arrow-left" size={25} color="#000" />
          <Text style={styles.headingTitle}>Cart</Text>
        </TouchableOpacity>

        <View style={styles.profileImage}>
          <Image
            source={{
              uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={styles.profileImage}
          />
        </View>
      </View> */}

      <Text style={styles.sectionTitle}>My Cart List</Text>


      <FlatList
        data={cartlist}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}

      />


      <View style={styles.totalSection}>
        <View style={styles.totalTextContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>{"\u20B9"} {total}</Text>
        </View>

        <View style={styles.checkoutButtonContainer}>
          <TouchableOpacity onPress={checkOut} style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff9",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    overflow: "hidden",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth * 0.2,
    aspectRatio: 1,
    borderRadius: windowWidth * 0.5,
    borderWidth: 1,
    borderColor: "#FF6200",
  },
  headingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    margin: 10,
  },
  sectionTitle: {
    // fontSize: 24,
    // fontWeight: "bold",
    // color: "#000",
    // marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    margin: 5,
  },
  totalSection: {
    height: windowHeight * 0.15,
    backgroundColor: "#fff1",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  totalTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "600",
  },
  checkoutButtonContainer: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutButton: {
    height: "100%",
    width: "30%",
    backgroundColor: "#FF6200",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemContainer: {
    width: windowWidth * 0.9,
    height: 120,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10
  },
  imageContainer: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  itemDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cartlisttext: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    margin: 5,
  },
  quantityContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButton: {
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 30,
  },
  quantityBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    borderRadius: 5,
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Add more styles as needed
});

export default Cart;
