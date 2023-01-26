import { StyleSheet, Text, View,TouchableOpacity,ScrollView,FlatList,Image,
    SafeAreaView,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react';
import { globalStyle } from '../../styles/global';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    brandBanner,
    sponsImgs,
    laptopBrands,
    mobileBrands,
    laptopBrandBanners,
    mobileBrandBanners,
    clothBrands,
    clothBrandBanners,
    footwearBrands,
    footwearBrandBanners,
    cameraBrands,
    cameraBrandBanners
} from '../../styles/images';
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/actions/productAction";
import SmallCard from '../components/SmallCard';
import thin_line from "../../assets/line.png"
import Loader from '../components/Loader';
import { useIsFocused } from '@react-navigation/native';

const PAGE_WIDTH = Dimensions.get("window").width;

const ProductCatWise = ({navigation,route}) => {
   
 const progressValue = useSharedValue(0);
 const {dark}=useSelector(state=>state.theme);

 const dispatch = useDispatch();
const [brands,setBrands]=useState();
const [brandBanner,setBrandBanner]=useState();


 const [currentPage, setCurrentPage] = useState(1);
 const [price, setPrice] = useState([0, 250000]);
 const [category, setCategory] = useState(route.params.category);

 const [ratings, setRatings] = useState(0);

 const {
   products,
   loading,error,
   productsCount,
   resultPerPage,
   filteredProductsCount,
 } = useSelector((state) => state.products);

const isFocused=useIsFocused()

 useEffect(() => {
  if(route.params.category=='Laptop'){
    setBrands(laptopBrands);
    setBrandBanner(laptopBrandBanners)
  }
  else if(route.params.category=='SmartPhones')
  { 
    setBrands(mobileBrands)
    setBrandBanner(mobileBrandBanners)
  }
  else if(route.params.category=="Attire" || route.params.category=="Tops" || route.params.category=="Bottom"){
    setBrands(clothBrands)
    setBrandBanner(clothBrandBanners)
  }
  else if(route.params.category=="Footwear"){
    setBrands(footwearBrands)
    setBrandBanner(footwearBrandBanners)
  }
  else if(route.params.category=="Camera"){
    setBrands(cameraBrands)
    setBrandBanner(cameraBrandBanners)
  }


    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    
    dispatch(getProduct("", currentPage, price, category, ratings));
    dispatch({type:'FOOTER_INFO',payload:false})
  }, [dispatch, currentPage, price, category, ratings, error,isFocused,route.params.category]);

  // console.log(route.params.category)

  return loading?<Loader/>:(
    <View style={globalStyle.androidHead}>
    <View style={{flex:1,backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'#fff'}}>
     {/* header */}
     <View style={{
    backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:globalStyle.colors.primary,
    height: 65,
    flexDirection:'row',
    justifyContent: "space-between",
    alignItems:'center',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    }}}>
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
         {route.params.title}
        </Text>
        </View>
        <TouchableOpacity style={{marginRight:8}} onPress={()=>navigation.navigate("View All")}>
                        <Text style={{fontFamily:'Roboto_500Medium',color:"#fff"}}>View All</Text>
                    </TouchableOpacity>
      </View>
      <ScrollView>
        <SafeAreaView>
      {/* brands */}
        <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={brands}
              renderItem={({ item }) => (
                <View style={{ marginHorizontal: 12, alignItems: "center",marginVertical:10 }}>
                <TouchableOpacity>
                  <View
                    style={{
                      marginTop: 15,
                      marginBottom: 12,
                      height: 50,
                      width: 70,
                      alignItems: "center",
                      justifyContent: "center",
                      
                    }}
                  >
                    <Image
                      source={item.img}
                      style={{ width: 60, height: 60 ,borderRadius:100}} resizeMode="contain"
                    />
                  </View>
                  </TouchableOpacity>
                  <Text style={{ fontFamily: "Roboto_400Regular" ,color:dark?globalStyle.darkTheme.text:null}}>
                    {item.title}
                  </Text>
                </View>
              )}
              keyExtractor={(key) => {
                return key.title;
              }}
            />
            {/* carousel */}
            <View style={{ flex: 1 }}>
              <Carousel
                vertical={false}
                width={PAGE_WIDTH}
                height={PAGE_WIDTH * 0.6}
                loop
                pagingEnabled={true}
                snapEnabled={true}
                autoPlay={true}
                autoPlayInterval={1500}
                onProgressChange={(_, absoluteProgress) =>
                  (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 50,
                }}
                data={brandBanner}
                renderItem={({ item }) => (
                  <Image source={item} style={{ flex: 1, width: null }} resizeMode="contain"/>
                //   console.log(item)
                )}
              />
            </View>
            {/* all mobiles */}
            <View
              style={{
                marginTop: 20,
                paddingVertical: 10,
                borderTopWidth: dark?1:0.4,
                borderColor: dark?globalStyle.darkTheme.border:"#ededed",
                backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'#fff'
              }}
            >
             <View style={{flexDirection:'row',justifyContent:'space-around',}}>
          <Text style={{fontSize:18,fontFamily:'Roboto_500Medium',color:dark?globalStyle.darkTheme.text:null}}>All-Time Best</Text>
          <Image source={thin_line} style={{height:43,width:240,}}/>
          </View>
              
              <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
              {
                products&&products.map((elem,index)=>(
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

export default ProductCatWise

const styles = StyleSheet.create({
})