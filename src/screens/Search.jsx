import { StyleSheet, Text, View,TouchableOpacity,ScrollView,FlatList,Image,
    SafeAreaView,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react';
import { globalStyle } from '../../styles/global';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import thin_line from "../../assets/line.png"
import SmallCard from '../components/SmallCard';

const Search = ({navigation,route}) => {
  return (
    <View style={globalStyle.androidHead}>
    <View style={{flex:1,backgroundColor:'#fff'}}>
     {/* header */}
     <View style={styles.catHead}>
     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
     <TouchableOpacity onPress={()=>navigation.goBack()}>
     <Icon name="arrow-left-thin" size={40} color="#fff" />
     </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            fontSize: 20,
            marginLeft: 6,
            color: "#fff",
          }}
        >
         {route.params.keyword}
        </Text>
        </View>
        <TouchableOpacity style={{marginRight:8}} onPress={()=>navigation.navigate("View All")}>
                        <Text style={{fontFamily:'Roboto_500Medium',color:"#fff"}}>View All</Text>
                    </TouchableOpacity>
      </View>
      <ScrollView>
        <SafeAreaView>
        <View
              style={{
                
                paddingVertical: 10,
                borderTopWidth: 0.4,
                borderColor: "#ededed",
                backgroundColor:'#fff'
              }}
            >
             <View style={{flexDirection:'row',justifyContent:'space-around',}}>
          <Text style={{fontSize:18,fontFamily:'Roboto_500Medium',marginHorizontal:10}}>Your Search Result</Text>
          <Image source={thin_line} style={{height:43,width:240,}}/>
          </View>
              
              <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
              {
                route.params.data&&route.params.data.map((elem,index)=>(
              <SmallCard data={elem} small={false} serverData={true} key={index}/>
             )) 
              }

              </View>
            </View>
        </SafeAreaView>
        </ScrollView>
        </View>
        </View>
        
  )
}

export default Search

const styles = StyleSheet.create({
    catHead: {
        backgroundColor: globalStyle.colors.primary,
        height: 65,
        flexDirection:'row',
        justifyContent: "space-between",
        alignItems:'center',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 4,
        }},
})