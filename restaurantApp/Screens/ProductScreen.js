import { View, Text, StyleSheet, Dimensions, Image, TextInput } from "react-native";
import React from "react";
import ProductCarousel from "../Components/ProductCarousel";

const deviceWidth = Dimensions.get("window").width;

const ProductScreen = () => {
  const data2 = [
    "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Search */}
      {/* <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
        />
      </View> */}

      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={require("../assets/freedelivery.png")}
          style={styles.bannerImage}
        />
      </View>

      
      {/* Carousel */}
      <View style={styles.carouselContainer}>

      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
          Food Available
        </Text>
        
        <ProductCarousel />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
    paddingTop: "10%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",
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
    paddingTop:'3%'
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
