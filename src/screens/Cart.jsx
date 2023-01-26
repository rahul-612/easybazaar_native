import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyle } from "../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromCart } from "../../redux/actions/cartAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useIsFocused } from "@react-navigation/native";

const Cart = ({ navigation }) => {
  const {isAuthenticated,user,loading}=useSelector(state=>state.user)
  const [alert,setAlert]=useState(true);

  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useState("");

  const isFocused=useIsFocused()
  const {dark}=useSelector(state=>state.theme);

  const cart = async () => {
    const c = await AsyncStorage.getItem("cartItems");
    const data = JSON.parse(c);
    setCartItem(data);
    
  };

  useEffect(() => {
    cart();
    dispatch({type:'FOOTER_INFO',payload:false})
  }, [cartItem,isFocused]);

  const deleteCartItems = (id) => {
    // console.log(id)
    dispatch(removeItemsFromCart(id));
    cart();
  };

  return (
    <View style={globalStyle.androidHead}>
      <View style={{ flex: 1, backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#fff" }}>
        {/* header */}
        <View style={{
    backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:globalStyle.colors.primary,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left-thin" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

       {isAuthenticated? <ScrollView>
          <SafeAreaView>
            {cartItem != 0 && cartItem!= null ? (
              <View>
                {cartItem &&
                  cartItem.map((item, index) => (
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 10,
                        borderTopColor: dark?globalStyle.darkTheme.border:"#D8D9CF",
                        borderTopWidth: 0.8,
                        marginVertical: 4,
                        justifyContent: "space-around",
                      }}
                      key={index}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 60, height: 60 }}
                        resizeMode="contain"
                      />
                      <View>
                        <Text style={{ width: 200, flexWrap: "wrap" ,color:dark?globalStyle.darkTheme.text:null}}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => deleteCartItems(item.product)}
                        >
                          <Text style={{ color: globalStyle.colors.secondary }}>
                            Remove
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <Text style={{color:dark?globalStyle.darkTheme.text:null}}>₹{item.price}</Text>
                    </View>
                  ))}
                <View
                  style={{
                    borderTopColor: globalStyle.colors.secondary,
                    borderTopWidth: 4,
                    marginTop: 15,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>Gross Total</Text>
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>{`₹${
                    cartItem &&
                    cartItem.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )
                  }`}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    backgroundColor: globalStyle.colors.secondary,
                    marginHorizontal: 100,
                    height: 40,
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                  onPress={() => navigation.navigate("shipping")}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Roboto_500Medium",
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 650,
                }}
              >
                <Icon
                  name="cart-off"
                  size={60}
                  color={globalStyle.colors.secondary}
                />
                <Text
                  style={{
                    marginTop: 5,
                    fontFamily: "Roboto_500Medium",
                    fontSize: 18,
                  }}
                >
                  No Products In Your Cart
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    backgroundColor: "gray",
                    padding: 15,
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                  onPress={() => navigation.navigate("Categories")}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Roboto_500Medium",
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    View Products
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </SafeAreaView>
        </ScrollView>: <AwesomeAlert
          show={alert}
          showProgress={false}
          message="Login First"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonStyle={{width:90}}
          confirmButtonTextStyle={{textAlign:'center',fontSize:15}}
          confirmButtonColor="#DD6B55"
          onCancelPressed={()=>setAlert(false)}
          onConfirmPressed={()=>{setAlert(false); navigation.goBack()}}
          contentContainerStyle={{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}}
          messageStyle={{color:dark?globalStyle.darkTheme.text:"gray"}}
        />}
      </View>
    </View>
  );
};

export default Cart;


