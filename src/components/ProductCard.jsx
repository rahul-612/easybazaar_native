import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { sponsImgs } from '../../styles/images'
import { Rating, } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import { globalStyle } from '../../styles/global';
const ProductCard = ({data,index,navigation}) => {
  const {dark}=useSelector(state=>state.theme);
    
  return (
    <TouchableOpacity style={{flexDirection:'row',borderBottomWidth:.2,
    borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',paddingVertical:4}} key={index} onPress={()=>navigation.navigate(`product details`,{id:data._id})}>
   <Image source={{uri:data.images[0].url}} style={{width:120,height:120}} resizeMode="contain"/>
   <View style={{justifyContent:'center',alignItems:'flex-start',marginHorizontal:5,flex:1}}>
   <View style={{flexDirection:'row',}}>
      <Text style={{fontSize:15,flex:1,flexWrap:'wrap',color:dark?globalStyle.darkTheme.text:null}}>{data.name}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Rating
      startingValue={data.ratings}
      readonly={true}
  style={{ paddingVertical: 10, marginHorizontal:8,}}
  imageSize={16}
  type="custom"
  tintColor={dark?globalStyle.darkTheme.backgroundPrimary:null}
/>
<Text style={{fontSize:11,color:dark?globalStyle.darkTheme.text:null}}>({data.numOfReviews})</Text>
</View>
      <Text style={{ fontFamily: "Roboto_500Medium", flexWrap: 'wrap',color:'#379237',marginLeft:4,}}>{sponsImgs[0].price&&<Text style={{color:"black",fontFamily: "Roboto_300Light",textDecorationLine:'line-through',fontSize:12,color:dark?globalStyle.darkTheme.text:null}}>{data.price}</Text>}{data.price&&<Text style={{color:dark?globalStyle.darkTheme.text:"black",fontFamily: "Roboto_400Regular",marginHorizontal:5}}> {data.price}</Text>} {`₹${data.price}`}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({})