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
import { myOrders } from "../../redux/actions/orderAction";
import { Button } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const Order = ({navigation}) => {
    const {isAuthenticated,user}=useSelector(state=>state.user)
  const [alert,setAlert]=useState(true);
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const {dark}=useSelector(state=>state.theme);
// console.log(orders);
  const dispatch = useDispatch();
  const isFocused=useIsFocused()

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
    dispatch({type:'SYSTEM_INFO',payload:{footer:false}})
  }, [dispatch, alert, error,isFocused])

  return (
    <View style={globalStyle.androidHead}>
      <View style={{ flex: 1, backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#fff" }}>
        {/* header */}
        <View style={ {
    backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:globalStyle.colors.primary,
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
        >Your Orders</Text>
          </View>
        </View>
        <ScrollView>
            <SafeAreaView>
                <View>
                {orders&&orders.map((item,index)=>(
                    <View style={{borderBottomWidth:dark?2:.2,
    borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',paddingVertical:10,flexDirection:'row',}}  key={index}>
                <View style={{width:'52%',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                 {item.orderItems.map((val,i)=>(
                 <Image source={{uri:val.image}} style={{width:100,height:100}} resizeMode="contain" key={i}/>))}
                 <TouchableOpacity style={{marginTop:10,width:'100%',alignItems:'center'}} onPress={()=>navigation.navigate("order details",{
                  data:item
                 })}>
                    <Text style={{textAlign:'center',color:globalStyle.colors.primary,borderWidth:1,borderColor:globalStyle.colors.primary,width:'30%',paddingVertical:2,borderRadius:8,fontSize:12}}>View</Text>
                 </TouchableOpacity>
                 </View>
                 <View style={{width:'48%',justifyContent:'space-around'}}>
              <Text style={{fontFamily:'Roboto_300Light',fontSize:12,color:dark?globalStyle.darkTheme.text:null}}>Order ID: {item._id}</Text>
              <Text style={{fontSize:14,color:dark?globalStyle.darkTheme.text:null}}>Status: <Text style={{fontFamily:'Roboto_500Medium',color:item.orderStatus=='Delivered'?'green':'red',}}>{item.orderStatus}</Text></Text>
              <Text style={{fontSize:13,color:dark?globalStyle.darkTheme.text:null}}>Date:{item.createdAt}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <Text style={{color:dark?globalStyle.darkTheme.text:null}}>Amount: ₹{item.totalPrice}</Text>
              <Text style={{color:dark?globalStyle.darkTheme.text:null}}>Qty: {item.orderItems.length}</Text>
              </View>
              </View>
         </View>)).reverse()}
                </View>
            </SafeAreaView>
        </ScrollView>
            </View>
            </View>
  )
}

export default Order
