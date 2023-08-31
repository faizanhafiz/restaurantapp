import {
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
 
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { BASE_URL } from "../Utility/config";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";
 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
var tmp = 0;
const getCartApi = `${BASE_URL}/user/getCart`;

const Cart = ({ navigation }) => {
  const [cartlist, setCartList] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [total, setTotal] = useState(0);

  const {
    token,
    cart,
    getCart,
    userData,
    showToastedError,
    showToastedSuccess,
  } = useContext(AuthContext);

  // const checkOut = async () => {
  //   try {
  //     setIsloading(true);
  //     await fetch(`${BASE_URL}/order/placeOrder`, {
  //       method: "POST",
  //       headers:{
  //         "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`,
  //       }
  //     }).then((response) => {
  //       if (response.status === 200) {
  //         setIsloading(false);
  //         showToastedSuccess("order placed");
  //       } else if (response.status === 400) {
  //         setIsloading(false);
  //         console.log("bad request");
  //       } else if (response.status === 500) {
  //         setIsloading(false);
  //         showToastedError("server error");
  //         console.log("server error");
  //       }else{
  //         setIsloading(false);
  //         console.log("seomething went wrong",response.status);
  //       }
  //     });
  //   } catch (err) {
  //     setIsloading(false);
  //     console.log("error inside checkout", err);
  //   }
  // };

  useEffect(() => {
    // const fetchData = async () => {
    //   setIsloading(true);
    //   await getCart();
    //   setIsloading(false);
    // };
    // fetchData();
  }, []);

  const increaseCartProductQuantity = async (productId) => {
    await fetch(`${BASE_URL}/user/incrCartItem/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          getCart();
        }
      })
      .catch((error) => {
        console.log("error in increasecartProduct", error);
      });
  };

  const decreaseCartProductQuantity = async (productId) => {
    await fetch(`${BASE_URL}/user/decCartItem/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          getCart();
        }
      })
      .catch((error) => {
        console.log("error in decreasecartProduct", error);
      });
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </View>

        <View style={styles.itemDetailsContainer}>
          <Text style={styles.cartlisttext}>{item.productName}</Text>
          <Text style={styles.cartlisttext}>
            {"\u20B9"} {item.price}
          </Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => {
              increaseCartProductQuantity(item.id);
            }}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <View style={styles.quantityBox}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => {
              decreaseCartProductQuantity(item.id);
            }}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {userData.cart.length == 0 ? (
          <View style={styles.emptycart}>
            <Image source={require("../assets/emptycart.jpg")} />
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Oops..</Text>
            <Text style={{ fontSize: 14, fontWeight: 400 }}>
              Your cart is empty
            </Text>

            <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 400 }}>
              Add foods you like
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <FlatList
              data={userData.cart}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={renderCartItem}
              ListHeaderComponent={() => (
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: 24,
                    fontWeight: "bold",
                    backgroundColor: "#fff",
                    flex: 2,
                  }}
                >
                  Your Cart
                </Text>
              )}
            />

            <View style={styles.totalSection}>
              <View style={styles.totalTextContainer}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalAmount}>
                  {"\u20B9"} {userData.cartTotal}
                </Text>
              </View>

              <View style={styles.checkoutButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Checkout");
                  }}
                  style={
                    userData.cart.length == 0
                      ? styles.disabledButton
                      : styles.checkoutButton
                  }
                  disabled={userData.cart.length == 0 ? true : false}
                >
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
      {isloading ? <Loader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 5,
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff5',
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptycart: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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

    marginBottom: 10,
  },
  disabledButton: {
    height: "100%",
    width: "30%",

    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,

    backgroundColor: "gray", // Change this to your desired disabled button color
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemContainer: {
    width: windowWidth * 0.9,
    height: 120,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    
    backgroundColor: "#fff",
    
    padding: 10,
    marginTop:2
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
