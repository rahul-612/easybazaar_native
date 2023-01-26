import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";
// const api="http://easybazaar.tk/api/v1";
// const api="http://192.168.158.69:4000/api/v1"
const api="https://easybazaar-api.onrender.com/api/v1"
  
  // Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${api}/product/${id}`);
  // console.log(data);
    dispatch({
      type: "ADD_TO_CART_SUCCESS",
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });
    const exist=await AsyncStorage.getItem('cartItems');
    
    if(exist){
      // console.log('hey')
      const e=JSON.parse(exist)
      e.push(getState().cart.cartItems)
      // console.log(JSON.stringify(e))
    
      await AsyncStorage.setItem('cartItems', JSON.stringify(e))
    }else{
      // const json=JSON.stringify(getState().cart.cartItems)
      const array=[getState().cart.cartItems]

      await AsyncStorage.setItem('cartItems', JSON.stringify(array))
    }
    // await AsyncStorage.clear()

  };

  // REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: "REMOVE_CART_ITEM_SUCCESS",
      payload: id,
    });
  // console.log(await AsyncStorage.getItem('cartItems'))
  const jsonData=await AsyncStorage.getItem('cartItems')
  const data=await JSON.parse(jsonData)
  // console.log(data);
  if(data.length===1)
  {
    await AsyncStorage.clear();
  }
 
  const filteredItems=await data.filter(item=>id!==item.product)
  // console.log(filteredItems)
  await AsyncStorage.setItem('cartItems',JSON.stringify(filteredItems))
  
  // console.log(res)
  
  
  // await AsyncStorage.removeItem()
    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    // await AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  };
  

  // SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: "SAVE_SHIPPING_INFO_SUCCESS",
      payload: data,
    });
  
    // localStorage.setItem("shippingInfo", JSON.stringify(data));
    await AsyncStorage.setItem('shippingInfo', JSON.stringify(data))
  };
  