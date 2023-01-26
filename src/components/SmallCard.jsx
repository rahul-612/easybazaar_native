import { View, Text,FlatList,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyle } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const SmallCard = ({data,serverData,small,}) => {
  const navigation=useNavigation()
  const {dark}=useSelector(state=>state.theme);
  // console.log(serverData&&data.images[0].url)
  return (
   
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          paddingBottom: 4,
          alignItems: small?"center":'flex-start',
          shadowColor: dark?"#ffffff":"#000000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 1.51,
          elevation: 2,
          backgroundColor: serverData?dark?globalStyle.darkTheme.backgroundPrimary:"#EEEEEE":dark?globalStyle.darkTheme.backgroundPrimary:"#fff",
          borderRadius:2
        }}
      >
     <TouchableOpacity onPress={()=>serverData?navigation.navigate(`product details`,{id:data._id}):data.category&&navigation.navigate("Products",{
       title:data.title,
                category:data.category
     })}>
      { serverData?<Image 
          source={{uri:data.images[0].url}}
          style={{ width: small?110:170, height: small?110:170 }} resizeMode="contain"
        />: <Image 
          source={data.img}
          style={{ width: small?110:170, height: small?110:170 }}
        />}
        </TouchableOpacity>
        <View style={{flexDirection:'row',backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:null}}>
        <Text style={{ flex:1,flexWrap:'wrap',color:dark?globalStyle.darkTheme.text:null,fontFamily: "Roboto_300Light",fontSize: 13,marginLeft:small?null:5,textAlign:small?'center':null}}>
        {serverData?data.name:data.title}
        </Text>
       </View>
        <Text style={{ fontFamily: "Roboto_500Medium",flex: 1, flexWrap: 'wrap',color:small?dark?globalStyle.darkTheme.text:'black':dark?"#379237":'#379237',marginLeft:small?null:4,}}>{data.price&&<Text style={{color:dark?globalStyle.darkTheme.text:"black",fontFamily: "Roboto_300Light",textDecorationLine:'line-through',fontSize:12,}}>{serverData?"5000":data.price}</Text>}{serverData||data.salePrice&&<Text style={{color:dark?globalStyle.darkTheme.text:"black",fontFamily: "Roboto_400Regular",marginHorizontal:5}}> {data.salePrice}</Text>} {serverData?`₹${data.price}`:data.offer}
        </Text>
      </View>
   
  )
}

export default SmallCard