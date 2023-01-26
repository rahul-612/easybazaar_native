import { NavigationContainer, useIsFocused, } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React,{useEffect,useState} from 'react'
import Footer from "./components/Footer.jsx"
import ProductCatWise from './screens/ProductCatWise';
import { MyDrawer } from './components/Drawer';
import { globalStyle } from '../styles/global';
import View_All from "./screens/View_All.jsx"
import ProductDetails from './screens/ProductDetails';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import EditProfile from './screens/EditProfile.jsx';
import { useDispatch,useSelector } from "react-redux";
import { loadUser } from '../redux/actions/userAction';
import Loader from './components/Loader';
import CameraComponent from "./screens/Camera.jsx";
import UpdatePassword from "./screens/UpdatePassword.jsx";
import Shipping from "./screens/Shipping.jsx";
import Cart from "./screens/Cart.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx"
import Search from './screens/Search';
import Order from "./screens/Order.jsx"
import ForgetPassword from "./screens/ForgetPassword.jsx"
import OrderDetails from './screens/OrderDetails';
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();


const Stack = createNativeStackNavigator();


const Main = () => {
const dispatch=useDispatch()

  const {isAuthenticated,user,loading}=useSelector(state=>state.user)
  const {footer}=useSelector(state=>state.footer);
  const {dark}=useSelector(state=>state.theme);
  // console.log(footer,dark);

  useEffect(() => {
    
  dispatch(loadUser());
  
  }, [dispatch]);
  

  return (
    // <NavigationContainer theme={dark?DarkTheme:DefaultTheme}>
    <NavigationContainer>

     <Stack.Navigator >
      <Stack.Screen
        name="My Drawer"
        component={MyDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="camera"
        component={CameraComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Products"
        component={ProductCatWise}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="View All"
        component={View_All}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="product details"
        component={ProductDetails}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="edit profile"
        component={EditProfile}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="update password"
        component={isAuthenticated?UpdatePassword:ErrorComponent}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="cart"
        component={Cart}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="orders"
        component={Order}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="order details"
        component={OrderDetails}
        options={{  headerShown: false  }}
      />
      <Stack.Screen
        name="shipping"
        component={isAuthenticated?Shipping:ErrorComponent}
        options={{  headerShown: false  }}
      />
      </Stack.Navigator>
      {footer?<Footer/>:null}
    </NavigationContainer>
  )
}

export default Main

{/* <Stack.Screen
        name="India's Smartphone"
        component={Mobile}
        options={{ statusBarColor:globalStyle.colors.primary, headerTintColor:'#fff',  headerStyle: {
         backgroundColor: globalStyle.colors.primary
      }  }}
      /> */}