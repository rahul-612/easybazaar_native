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
import { useSelector } from "react-redux";

const OrderDetails = ({navigation,route}) => {
    // console.log(route.params.data)
    const orderData=route.params.data;
    const { user } = useSelector((state) => state.user);
    const {dark}=useSelector(state=>state.theme);

  return (
    <View style={globalStyle.androidHead}>
      <View style={{ flex: 1, backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#fff" }}>
        {/* header */}
        <View style={{
  backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:"gray",
  height: 65,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 4,
  }}}>
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
            <Text
          style={{
            fontFamily: "Roboto_500Medium",
            fontSize: 20,
            marginLeft: 6,
            color: "#fff",
            textAlign:'center',
            width:'80%'
          }}
        >Order Details</Text>
          </View>
        </View>
        <ScrollView>
            <SafeAreaView>
            {/* Order Items Container */}
            <View style={{borderWidth:.2,borderColor:'gray',marginVertical:20,marginHorizontal:10,padding:10,}}>
            {/* Order Id */}
            <View>
              <Text style={{color:dark?globalStyle.darkTheme.text:null}}>Order ID: {orderData._id}</Text>
              <Text style={{color:dark?globalStyle.darkTheme.text:null}}>Date: {orderData.createdAt}</Text>
            </View>
            {/* Order Items */}
            <View style={{marginVertical:10,}}>
              {orderData.orderItems.map((val,index)=>(
                <View key={index} style={{flexDirection:'row',alignItems:'center'}}>
                  <Image source={{uri:val.image}} style={{width:80,height:80}} resizeMode="contain"/>
                  <Text style={{flexWrap:'wrap',width:'40%',marginLeft:5,color:dark?globalStyle.darkTheme.text:null}}>{val.name}</Text>
                  <Text style={{textAlign:'center',flex:1,flexWrap:'wrap',color:dark?globalStyle.darkTheme.text:null}}>{val.quantity} X ₹{val.price} = ₹{val.quantity*val.price}</Text>
                </View>
              ))}
            </View>
            </View>
            {/* Payment Container */}
            <View style={{borderWidth:.2,borderColor:'gray',marginBottom:20,marginHorizontal:10,padding:10,}}>
              <Text style={{fontFamily:'Roboto_500Medium',fontSize:15,color:dark?globalStyle.darkTheme.text:null}}>Payment</Text>
              <Text style={{marginTop:5,color:dark?globalStyle.darkTheme.text:null}}>Status: <Text style={{color:'green'}}>{orderData.paymentInfo?'Paid':'Not Paid'}</Text></Text>
              <Text style={{marginTop:2,color:dark?globalStyle.darkTheme.text:null}}>Payment ID: {orderData.paymentInfo.id}</Text>
              <Text style={{marginTop:2,color:dark?globalStyle.darkTheme.text:null}}>Amount: ₹{orderData.totalPrice}</Text>
              <Text style={{marginTop:2,color:dark?globalStyle.darkTheme.text:null}}>Order Status: <Text style={{color:orderData.orderStatus=='Delivered'?'green':globalStyle.colors.secondary}}>{orderData.orderStatus}</Text></Text>
            </View>
            {/* Shipping Info Container */}
            <View style={{borderWidth:.2,borderColor:'gray',marginBottom:20,marginHorizontal:10,padding:10,}}>
              <Text style={{fontFamily:'Roboto_500Medium',fontSize:15,color:dark?globalStyle.darkTheme.text:null}}>Shipping Info</Text>
              <Text style={{marginTop:5,color:dark?globalStyle.darkTheme.text:null}}>Name: {user.name}</Text>
              <Text style={{marginTop:2,color:dark?globalStyle.darkTheme.text:null}}>Phone no.: {orderData.shippingInfo.phoneNo}</Text>
              <Text style={{marginTop:2,color:dark?globalStyle.darkTheme.text:null}}>Address: {orderData.shippingInfo.address}, {orderData.shippingInfo.city}, {orderData.shippingInfo.country}</Text>
              <Text style={{marginTop:2,color:dark?globalStyle.darkTheme.text:null}}>Pincode: {orderData.shippingInfo.pinCode}</Text>
              </View>
            </SafeAreaView>
            </ScrollView>
            </View>
            </View>
  )
}

export default OrderDetails
