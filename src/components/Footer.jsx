import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
// import Icon from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "../../styles/global";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigation = useNavigation();
  const {dark}=useSelector(state=>state.theme);

  const [active, setActive] = useState({
    home: globalStyle.colors.primary,
    category: "gray",
    notification: "gray",
    account: "gray",
    cart: "gray",
  });

  return (
    <View
      style={{
        padding: 14,
        backgroundColor: dark?"rgb(1, 1, 1)":"#fff",
        flexDirection: "row",
        justifyContent: "space-around",
borderTopWidth:.2,
borderTopColor:dark?globalStyle.darkTheme.borderColor:'#D8D9CF',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
          setActive({
            home: globalStyle.colors.primary,
            category: "gray",
            notification: "gray",
            account: "gray",
            cart: "gray",
          });
        }}
      >
        <Icon name="home-outline" size={25} color={active.home} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Categories");
          setActive({
            home: "gray",
            category: globalStyle.colors.primary,
            notification: "gray",
            account: "gray",
            cart: "gray",
          });
        }}
      >
        <Icon name="shape-outline" size={25} color={active.category} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setActive({
            home: "gray",
            category: "gray",
            notification: globalStyle.colors.primary,
            account: "gray",
            cart: "gray",
          });
        }}
      >
        <Icon name="bell-outline" size={25} color={active.notification} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("My Account");
          setActive({
            home: "gray",
            category: "gray",
            notification: "gray",
            account: globalStyle.colors.primary,
            cart: "gray",
          });
        }}
      >
        <Icon name="account-circle-outline" size={25} color={active.account} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("cart");
          setActive({
            home: "gray",
            category: "gray",
            notification: "gray",
            account: "gray",
            cart: globalStyle.colors.primary,
          });
        }}
      >
        <Icon name="cart-outline" size={25} color={active.cart} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
