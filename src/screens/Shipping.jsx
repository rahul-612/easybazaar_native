import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect,useRef } from "react";
import { globalStyle } from "../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, TextInput,Dialog,
  Portal,
  Provider, } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import {
CardField,
CardFieldInput,useStripe,useConfirmPayment,
} from '@stripe/stripe-react-native';
import { createOrder } from "../../redux/actions/orderAction";
import AwesomeAlert from "react-native-awesome-alerts";
import Loader from "../components/Loader";


const CheckoutSteps = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Icon name={props.iconName} size={30} color={props.color} />
        <Text style={{ color: props.color }}>{props.title}</Text>
      </View>
      {props.line && (
        <View
          style={{
            borderTopWidth: 1,
            borderColor: props.lineColor,
            width: 80,
            height: 10,
          }}
        ></View>
      )}
    </View>
  );
};

const Shipping = ({navigation}) => {
  const [paymentDialogVisible, setPaymentDialogVisible] = useState(false);
  const showPaymentDialog = () => setPaymentDialogVisible(true);
    const hidePaymentDialog = () => setPaymentDialogVisible(false);

  const [active, setActive] = useState(0);
// const [alert,setAlert]=useState(false);
// const [alertMsg,setAlertMsg]=useState("");
  const dispatch = useDispatch();
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  const {dark}=useSelector(state=>state.theme);

  // console.log(active)
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [address, setAddress] = useState(
    shippingInfo ? shippingInfo.address : ""
  );
  const [city, setCity] = useState(shippingInfo ? shippingInfo.city : "");
  const [state, setState] = useState(shippingInfo ? shippingInfo.state : "");
  const [country, setCountry] = useState(
    shippingInfo ? shippingInfo.country : ""
  );
  const [pinCode, setPinCode] = useState(
    shippingInfo ? shippingInfo.pinCode : ""
  );
  const [phoneNo, setPhoneNo] = useState(
    shippingInfo ? shippingInfo.phoneNo : ""
  );

  const [countries_state, setCountries_State] = useState([]);
  const [stateData, setStateData] = useState([]);
  let countries = [];
  const [cartItems, setCartItems] = useState([]);
const [nextBtn,setNextBtn]=useState('Continue')
const [backBtn,setBackBtn]=useState('Back')

  
  useEffect(() => {

    const country_fun = async () => {
      const jsonData = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setCountries_State(await jsonData.data.data);
    };

    country_fun();
    // console.log(countries_state)

    if (country) {
      // console.log(country)
      countries_state.map((item) => {
        if (item.name === country) {
          // console.log(item.states)
          // states=item.states;
          setStateData(item.states);
          // console.log(stateData)
        }
      });
    }
    const cartItemStorage = async () => {
      // await AsyncStorage.clear()
      setCartItems(JSON.parse(await AsyncStorage.getItem("cartItems")));
    };
    cartItemStorage();
   
    

  }, [country,dispatch,]);

  const orderHandler = () => {
    if (active == 0) {
      if (phoneNo.length < 10 || phoneNo.length > 10) {
        // setAlert(true)
        // setAlertMsg("Phone Number should be 10 digits Long");
        alert("Phone Number should be 10 digits Long");
        setActive(0);
      } else if (
        address == "" ||
        country == "" ||
        state == "" ||
        city == "" ||
        phoneNo == "" ||
        pinCode == ""
      ) {
        // setAlert(true)
        // setAlertMsg("Fill all the fields!");
        alert("Fill all the fields!");
        setActive(0);
      } else {
        setNextBtn('Proceed To Payment');
        dispatch(
          saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        
        setActive(1);
      }
    }
    if(active==1){
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        AsyncStorage.setItem("orderInfo", JSON.stringify(data));
      setActive(2);
      setPaymentDialogVisible(true)
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;
  let shippingAddress="";
  if(shippingInfo)
  { shippingAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;}

  const [orderInfo,setOrderInfo]=useState()

  // payment
  async function orderInfoFun(){
    let temp=await AsyncStorage.getItem("orderInfo")
    setOrderInfo(JSON.parse(temp))
  }
  orderInfoFun();


  // const [card, setCard] = useState(CardFieldInput.Details | null);
    const {confirmPayment, handleCardAction,} = useStripe()
  
    const [cardDetails,setCardDetails]=useState();

  const [loading, setLoading] = useState(false);


  // const paymentData = {
  //   amount: Math.round(orderInfo&&orderInfo.totalPrice * 100),
  // };
  const paymentData = {
    amount: Math.floor(orderInfo&&orderInfo.totalPrice),
  };
// console.log("paymentData",paymentData)
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo&&orderInfo.subtotal,
    taxPrice: orderInfo&&orderInfo.tax,
    shippingPrice: orderInfo&&orderInfo.shippingCharges,
    totalPrice: orderInfo&&orderInfo.totalPrice,
  };

  const submitPaymentHandler = async () => {
    try {
      console.log('1')
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true)
      console.log('2')
      const { data } = await axios.post("https://easybazaar-api.onrender.com/api/v1/payment/process",
        paymentData,
        config
      );
console.log('3')
      const client_secret = data.client_secret;
console.log(client_secret)
// console.log(cardDetails)

        if(!cardDetails.validNumber){
          setLoading(false)
          // setAlert(true)
          // setAlertMsg('Please Enter Valid Card Number')
          alert('Please Enter Valid Card Number')
        }
        // console.log(cardDetails);
       
      const result = await confirmPayment(client_secret, {
          paymentMethodType: 'Card',
          payment_method: {
            card:cardDetails,
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo&&shippingInfo.address,
                city: shippingInfo&&shippingInfo.city,
                state: shippingInfo&&shippingInfo.state,
                postal_code: shippingInfo&&shippingInfo.pinCode,
                country: shippingInfo&&shippingInfo.country,
              },
            },
          },
          
       
      });
      console.log(result)
      if (result.error) {
        setLoading(false)
        // setAlert(true)
        // setAlertMsg(result.error.message);
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status == "Succeeded") {
          console.log('ss')
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          setLoading(false)
          // setAlert(true)
          // setAlertMsg('Your Order Placed')
          alert('Your Order Placed')
          await AsyncStorage.removeItem('cartItems')
          navigation.navigate('orders')
          
        } else {
          setLoading(false)
          // setAlert(true)
          // setAlertMsg("There's some issue while processing payment ");
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      console.log("error")
      console.log(error)
      setLoading(false)
      // setAlert(true)
      // setAlertMsg(error);
      alert(error)
    }
  };


  return loading?<Loader/>:(
    <View style={globalStyle.androidHead}>
      <View style={{ flex: 1, backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#fff" }}>
        {/* header */}
        <View style={[styles.catHead,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"gray"}]}>
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

        <ScrollView>
          <SafeAreaView>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <CheckoutSteps
                title="Shipping"
                iconName="truck-fast-outline"
                color={active >= 0 ? globalStyle.colors.secondary : "gray"}
                line={true}
                lineColor={active >= 1 ? globalStyle.colors.secondary : "gray"}
              />
              <CheckoutSteps
                title="Confirm Order"
                iconName="check-circle"
                color={active >= 1 ? globalStyle.colors.secondary : "gray"}
                line={true}
                lineColor={active >= 2 ? globalStyle.colors.secondary : "gray"}
              />
              <CheckoutSteps
                title="Payment"
                iconName="bank"
                color={active == 2 ? globalStyle.colors.secondary : "gray"}
                line={false}
              />
            </View>
            <View style={{ flex: 1, padding: 20 }}>
              {/* Shipping Details */}
              {active == 0 ? (
                <View>
                  <Text style={[styles.orderHeading,{color:dark?globalStyle.darkTheme.text:null}]}>Shipping Details</Text>
                  <View>
                    <TextInput
                      mode="flat"
                      label="Address"
                      value={address}
                      onChangeText={(val) => setAddress(val)}
                      style={[styles.orderInput,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeUnderlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                    />
                    <TouchableOpacity style={[styles.orderInput,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff",color:dark?globalStyle.darkTheme.text:null}]}>
                      <Picker
                        ref={pickerRef}
                        selectedValue={country}
                        onValueChange={(itemValue, itemIndex) =>
                          setCountry(itemValue)
                        }
                        mode="dropdown"
                        dropdownIconColor="gray"
                      >
                        {countries_state &&
                          countries_state.map((item) => (
                            <Picker.Item
                              label={item.name}
                              value={item.name}
                              key={item.iso3}
                              color={dark?"gray":"black"}
                              style={{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}}
                            />
                          ))}
                      </Picker>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.orderInput,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff",color:dark?globalStyle.darkTheme.text:null}]}>
                      <Picker
                        ref={pickerRef}
                        selectedValue={state}
                        onValueChange={(itemValue, itemIndex) =>
                          setState(itemValue)
                        }
                        mode="dropdown"
                        dropdownIconColor="gray"
                      >
                        {stateData &&
                          stateData.map((item) => (
                            <Picker.Item
                              label={item.name}
                              value={item.name}
                              key={item.state_code}
                              color={dark?"gray":"black"}
                              style={{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}}
                            />
                          ))}
                      </Picker>
                    </TouchableOpacity>
                    <TextInput
                      mode="flat"
                      label="City"
                      value={city}
                      onChangeText={setCity}
                      style={[styles.orderInput,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeUnderlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                    />
                    <TextInput
                      mode="flat"
                      label="Pincode"
                      value={pinCode}
                      onChangeText={setPinCode}
                      style={[styles.orderInput,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeUnderlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                    />
                    <TextInput
                      mode="flat"
                      label="Phone No."
                      value={phoneNo}
                      onChangeText={setPhoneNo}
                      keyboardType="phone-pad"
                      style={[styles.orderInput,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeUnderlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                    />
                  </View>
                </View>
              ) : null}
              {/* Confirm Order */}
              {active == 1 || active == 2 ? (
                <View>
                  <Text style={[styles.orderHeading,{color:dark?globalStyle.darkTheme.text:null}]}>Confirm Order</Text>
                  {/* shipping Info */}
                  <View style={styles.secondaryContainer}>
                    <Text style={[styles.secondaryHeading,{color:dark?globalStyle.darkTheme.text:null}]}>Shipping Info</Text>
                    <View style={{ paddingVertical: 6, paddingHorizontal: 12 }}>
                      <Text style={[styles.shippingLabel,{color:dark?globalStyle.darkTheme.text:null}]}>
                        Name:{" "}
                        <Text style={[styles.shippingLabelValue,{color:dark?globalStyle.darkTheme.text:null}]}>
                          {user.name}
                        </Text>
                      </Text>
                      <Text style={[styles.shippingLabel,{color:dark?globalStyle.darkTheme.text:null}]}>
                        Email:{" "}
                        <Text style={[styles.shippingLabelValue,{color:dark?globalStyle.darkTheme.text:null}]}>
                          {user.email}
                        </Text>
                      </Text>
                      <Text style={[styles.shippingLabel,,{color:dark?globalStyle.darkTheme.text:null}]}>
                        Phone:{" "}
                        <Text style={[styles.shippingLabelValue,,{color:dark?globalStyle.darkTheme.text:null}]}>
                          {shippingInfo.phoneNo}
                        </Text>
                      </Text>
                      <Text style={[styles.shippingLabel,,{color:dark?globalStyle.darkTheme.text:null}]}>
                        Address:{" "}
                        <Text style={[styles.shippingLabelValue,,{color:dark?globalStyle.darkTheme.text:null}]}>
                          {shippingAddress}
                        </Text>
                      </Text>
                    </View>
                    <Text style={[styles.secondaryHeading,{color:dark?globalStyle.darkTheme.text:null}]}>
                      Your Cart Items:
                    </Text>
                    <View>
                      {cartItems &&
                        cartItems.map((item) => (
                          <View
                            key={item.product}
                            style={{ padding: 10, flexDirection: "row",justifyContent:'space-around' ,alignItems:'center'}}
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={{ width: 40, height: 40 }}
                            />
                            <Text
                              style={{
                                flex: 1,
                                flexWrap: "wrap",
                                marginLeft: 15,
                                color:dark?globalStyle.darkTheme.text:null
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text style={{color:dark?globalStyle.darkTheme.text:null}}>
                              {item.quantity} X {item.price}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                  {/* order summary */}
                  <View style={styles.secondaryContainer}>
                    <Text
                      style={[
                        styles.secondaryHeading,
                        { textAlign: "center", textDecorationLine: "none" ,color:dark?globalStyle.darkTheme.text:null},
                      ]}
                    >
                      Order Summary
                    </Text>
                    <View style={styles.orderSummaryInnerContainer}>
                      <View style={styles.orderSummaryInnerItemContainer}>
                        <Text style={[styles.shippingLabel,{color:dark?globalStyle.darkTheme.text:null}]}>Subtotal:</Text>
                        <Text style={[styles.shippingLabelValue,{color:dark?globalStyle.darkTheme.text:null}]}>
                        ₹{subtotal}
                        </Text>
                      </View>
                      <View style={styles.orderSummaryInnerItemContainer}>
                        <Text style={[styles.shippingLabel,{color:dark?globalStyle.darkTheme.text:null}]}>
                          Shipping Charges:
                        </Text>
                        <Text style={[styles.shippingLabelValue,{color:dark?globalStyle.darkTheme.text:null}]}>
                        ₹{shippingCharges}
                        </Text>
                      </View>
                      <View style={styles.orderSummaryInnerItemContainer}>
                        <Text style={[styles.shippingLabel,{color:dark?globalStyle.darkTheme.text:null}]}>GST:</Text>
                        <Text style={[styles.shippingLabelValue,{color:dark?globalStyle.darkTheme.text:null}]}>₹{tax}</Text>
                      </View>
                    </View>
                    <View style={styles.orderSummaryInnerContainer}><View style={styles.orderSummaryInnerItemContainer}>
                        <Text style={[styles.shippingLabel,{fontFamily:'Roboto_500Medium',color:dark?globalStyle.darkTheme.text:null}]}>Total:</Text>
                        <Text style={[styles.shippingLabelValue,{fontFamily:'Roboto_500Medium',color:dark?globalStyle.darkTheme.text:null}]}>₹{totalPrice}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : null}
              {/* Payment Dialog */}
              <Portal>
            <Dialog
              visible={paymentDialogVisible}
              style={{ backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:"#fff" }}
            >
              <Dialog.Title style={{color:dark?globalStyle.darkTheme.text:null}}>Pay</Dialog.Title>
              <Dialog.Content>
                <View style={{  justifyContent:'center',alignItems: "center" }}>
                <Text style={{textAlign:'left',width:"100%",fontSize:15,color:dark?globalStyle.darkTheme.text:null}}>{`Amount - ₹${orderInfo && orderInfo.totalPrice}`}</Text>
                <CardField
        postalCodeEnabled={false}
        autofocus
        placeholder={{
          number: '4242 4242 4242 4242',
          postalCode: '12345',
          cvc: 'CVC',
          expiration: 'MM|YY',
        }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
          // console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          // console.log('focusField', focusedField);
        }}
        cardStyle={{
  borderWidth: 1,
  backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:'#FFFFFF',
  borderColor: '#000000',
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: '#999999',
  textColor:dark?"#ffffff":"#000000"
}}
        style={ {
   width:'100%',
    height: 50,
    marginVertical: 30,
    color:dark?globalStyle.darkTheme.text:null
  }}
  
      />
     
    </View>
             </Dialog.Content>
              
              <Dialog.Actions>
                <Button
                  onPress={()=>{setActive(1); hidePaymentDialog();}}
                  textColor={dark?"#fff":"#000"}
                >
                  Cancel
                </Button>
                <Button
                  onPress={()=>{submitPaymentHandler();}}
                  textColor={globalStyle.colors.secondary}
                >
                  Pay
                </Button>
              </Dialog.Actions>
            </Dialog>
            </Portal>
              {/* Payment */}
              {/* {
                active==2?(
                  <View style={styles.container}>
                  <Text style={{fontSize:18,textDecorationLine:'underline',textDecorationColor:'gray',textAlign:'center'}}>Card Info</Text>
                  <CardField
        postalCodeEnabled={false}
        autofocus
        placeholder={{
          number: '4242 4242 4242 4242',
          postalCode: '12345',
          cvc: 'CVC',
          expiration: 'MM|YY',
        }}
        onCardChange={(cardDetail) => {
          setCardDetails(cardDetail)
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
        cardStyle={{
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000',
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: '#999999',
}}
        style={ {
    width: '100%',
    height: 50,
    marginVertical: 30,
  }}
      />
    <Button onPress={submitPaymentHandler}>Pay</Button>
    
                  </View>
                ):null
              } */}
            </View>
            {/* Next Back Button */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <Button
                style={{
                  backgroundColor:
                    active >= 1 ? globalStyle.colors.secondary : null,
                  marginRight: 80,
                }}
                textColor="#fff"
                onPress={() => setActive((p) => p - 1)}
                disabled={active <= 0 ? true : false}
              >
                {backBtn}
              </Button>
              <Button
                style={{ backgroundColor: globalStyle.colors.secondary }}
                textColor="#fff"
                onPress={() => {
                  setActive((p) => p + 1);
                  orderHandler();
                }}
                disabled={active >= 2 ? true : false}
              >
                {nextBtn}
              </Button>
              {/* <AwesomeAlert
          show={alert}
          showProgress={false}
          message={alertMsg}
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
          onConfirmPressed={()=>{setAlert(false);}}
        /> */}
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    </View>
  );
};

export default Shipping;

const styles = StyleSheet.create({
  catHead: {
    backgroundColor: "gray",
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  orderHeading: {
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
    textDecorationLine: "underline",
    marginVertical: 20,
  },
  orderInput: {
    backgroundColor: "#fff",
    marginTop: 16,
    borderColor: "gray",
    borderWidth: 0.5,
  },
  shippingLabel: {
    fontSize: 15,
    marginTop: 5,
  },
  shippingLabelValue: {
    fontFamily: "Roboto_300Light",
  },
  secondaryHeading: { fontSize: 17, textDecorationLine: "underline" },
  secondaryContainer: { borderWidth: 0.5, borderColor: "gray", padding: 15 },
  orderSummaryInnerContainer: {
    borderTopColor: "gray",
    borderTopWidth: 1.5,
    marginTop: 10,
  },
  orderSummaryInnerItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

});
