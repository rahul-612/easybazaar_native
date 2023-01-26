import Home from "../screens/Home";
import Account from "../screens/Account.jsx";
import Categories from "../screens/Categories.jsx";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { globalStyle } from "../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Switch } from "react-native-paper";
import { useState } from "react";
import { Text, View } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CustomDrawer = (props) => {
  const dispatch=useDispatch()
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [iconName, setIconName] = useState("weather-night");
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (iconName == "weather-night") {
      setIconName("weather-sunny");
    } else {
      setIconName("weather-night");
    }
  };

  useEffect(()=>{
    if(isSwitchOn){
      dispatch({type:'THEME_INFO',payload:false})
    }
    else{
      dispatch({type:'THEME_INFO',payload:true})
    }
  },[isSwitchOn])

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight:10
          }}
        >
          <Icon name={iconName} size={25} color="gray" />
          <Switch
            color={globalStyle.colors.primary}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
