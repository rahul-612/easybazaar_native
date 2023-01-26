import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import React,{useState,useEffect} from "react";
import { globalStyle } from "../../styles/global";
import { useFonts } from "expo-font";
import { myFonts } from "../../styles/myFonts";
import { categories, hotImgs } from '../../styles/images';
import { TouchableOpacity } from "react-native-gesture-handler";
import thin_line from "../../assets/line.png"
import { useSelector,useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const Categories = ({navigation}) => {
  const [fontsLoaded] = useFonts(myFonts);
  const {dark}=useSelector(state=>state.theme);

  return (
    <View style={globalStyle.androidHead}>
    <View style={{flex:1,backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'#fff'}}>
      {/* header */}
      <View style={{
    backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:globalStyle.colors.primary,
    height: 65,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  }}>
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            fontSize: 20,
            marginLeft: 6,
            color: "#fff",
          }}
        >
          All Categories
        </Text>
      </View>

      <ScrollView>
        <SafeAreaView>
          {/* main category */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {categories.map((elem, i) => (
              <TouchableOpacity key={i} onPress={()=>elem.category&&navigation.navigate("Products",{
                title:elem.title,
                category:elem.category
              })}>
                <View style={{ marginVertical: 10,marginHorizontal:10, alignItems: "center" }}>
                  <View
                    style={{
                      borderRadius: 35,
                      shadowColor: dark?"#000000":"#FF6464",
                      shadowOffset: {
                        width: 0,
                        height: 9,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 9.22,
                      elevation: 24,
                      marginBottom:10,

                    }}
                  >
                    <Image
                      source={elem.img}
                      style={{ width: 60, height: 60 } } resizeMode="contain"
                    />
                  </View>
                  <Text style={{ fontFamily: "Roboto_400Regular" ,color:dark?globalStyle.darkTheme.text:null}}>
                    {elem.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* more */}
          <View style={{marginVertical:30,paddingLeft:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-around',}}>
          <Text style={{fontSize:18,fontFamily:'Roboto_500Medium',color:dark?globalStyle.darkTheme.text:null}}>More on Easy Bazaar</Text>
          <Image source={thin_line} style={{height:43,width:210,}} />
          </View>
         
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              
            }}
          >
          {hotImgs.map((elem,i)=>(
            <View style={{ marginHorizontal: 12, alignItems: "center" }} key={i}>
                  <View
                    style={{
                      borderRadius: 35,
                      marginTop: 15,
                      marginBottom: 8,
                      height: 50,
                      shadowColor: dark?"#000000":"#FFD372",
                      shadowOffset: {
                        width: 0,
                        height: 9,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 9.22,
                      elevation: 12,
                      width: 70,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={elem.img}
                      style={{ width: 55, height: 40 }} resizeMode="contain"
                    />
                  </View>
                  <Text style={{ fontFamily: "Roboto_400Regular",color:dark?globalStyle.darkTheme.text:null}}>
                    {elem.name}
                  </Text>
                </View>
          ))}
          </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
});
