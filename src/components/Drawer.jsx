import Home from "../screens/Home";
import Account from "../screens/Account.jsx";
import Categories from "../screens/Categories.jsx";
import {  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from "@react-navigation/drawer";
import { globalStyle } from "../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Switch, TouchableRipple, } from 'react-native-paper';
import { useState } from "react";
import { useSelector } from "react-redux";
import React from "react";
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {

  const {dark}=useSelector(state=>state.theme);

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}  initialRouteName="Home"
    screenOptions={{
      drawerActiveTintColor: globalStyle.colors.primary,
      drawerStyle: {
        marginTop: 35,
        backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff",
        
      },
      drawerInactiveTintColor:"gray"
    }}>
    
      {/* <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: globalStyle.colors.primary,
        drawerStyle: {
          marginTop: 35,
        },
      }}
    >   */}
  
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="home-outline" size={25} color="gray" />
          ),
          drawerItemStyle: {
            marginTop: -32,
            color:'#ffffff'
          },
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="shape-outline" size={25} color="gray" />
          ),
        }}
      />
      <Drawer.Screen
        name="My Orders"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="order-bool-descending-variant" size={25} color="gray" />
          ),
        }}
      />
      <Drawer.Screen
        name="My Cart"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="cart-outline" size={25} color="gray" />
          ),
        }}
      />
      <Drawer.Screen
        name="My Account"
        component={Account}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="account-outline" size={25} color="gray" />
          ),
        }}
      />
      <Drawer.Screen
        name="My Notifications"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="bell-outline" size={25} color="gray" />
          ),
        }}
      />
      <Drawer.Screen
        name="Help Center"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="chat-question-outline" size={25} color="gray" />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="lock-open-check-outline" size={25} color="gray" />
          ),
        }}
      />
      <Drawer.Screen
        name="Legal"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: (config) => (
            <Icon name="scale-balance" size={25} color="gray" />
          ),
        }}
      />
       
    </Drawer.Navigator>
      
  );
};
