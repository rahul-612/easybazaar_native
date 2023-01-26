import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView,
    Dimensions,
    
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { globalStyle } from "../../styles/global";
  import Icon from "react-native-vector-icons/MaterialCommunityIcons";
  import { useDispatch, useSelector } from "react-redux";
  import {
    clearErrors,
    getProductDetails,
    newReview
  } from "../../redux/actions/productAction";
  import { addItemsToCart } from "../../redux/actions/cartAction";
  import Carousel from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Rating, } from 'react-native-ratings';
import Loader from "../components/Loader";
import avatar from "../../assets/avatar.png"
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
import AwesomeAlert from 'react-native-awesome-alerts';

const PAGE_WIDTH = Dimensions.get("window").width;

const ProductDetails = ({route,navigation}) => {
  const [alert,setAlert]=useState(false)
const [alertMsg,setAlertMsg]=useState('Currently Outstock!')
const {isAuthenticated,}=useSelector(state=>state.user)
const {dark}=useSelector(state=>state.theme);

  const dispatch=useDispatch()
const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
    const progressValue = useSharedValue(0);
    
    
    const [reviewDialogVisible, setReviewDialogVisible] = React.useState(false);
const showReviewDialog = () => setReviewDialogVisible(true);
  const hideReviewDialog = () => setReviewDialogVisible(false);

  const { success, error: reviewError } = useSelector(
          (state) => state.newReview
        );
  
  const id = route.params.id;

      const [quantity, setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment,setComment]=useState("");

           const addToCartHandler = async () => {
        if(product.Stock < 1){
          // console.log('a')
          setAlert(true)
          setAlertMsg("Sorry Currently this item is out of stock!")
        }else{
          // console.log('b')
        dispatch(addItemsToCart(route.params.id, quantity));
        setAlert(true)
        setAlertMsg("Item Added To Cart");
        }
      };
    
    //   const submitReviewToggle = () => {
    //     open ? setOpen(false) : setOpen(true);
    //   };
    
      const reviewSubmitHandler = () => {
        // const myForm = new FormData();
    
        // myForm.append("rating", rating);
        // myForm.append("comment", comment);
        // myForm.append("productId", route.params.id);
    const productId=route.params.id
        dispatch(newReview(rating,comment,productId));
        
      };
    
    useEffect(() => {
      if (error) {
        setAlert(true)
        setAlertMsg(error)
        dispatch(clearErrors());
      }
    
        if (reviewError) {
          setAlert(true)
        setAlertMsg(reviewError)
          dispatch(clearErrors());
        }
    
        if (success) {
          setAlert(true)
        setAlertMsg("Review Submitted Successfully")
          setComment("")
          dispatch({ type: "NEW_REVIEW_RESET" });
        }

        dispatch(getProductDetails(id));
       
      }, [dispatch, id, error, alert,reviewError,success]);
    

  return loading ? <Loader /> : (
    <View style={globalStyle.androidHead}>
    
    <View style={{ backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#fff" }}>
      {/* header */}
      <View style={{
        backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary: globalStyle.colors.primary,
        height: 65,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
      }}>
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
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("cart")}
        >
          <Icon name="cart-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        <SafeAreaView>
 {/* carousel */}
 <View style={{shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 3,
},
shadowOpacity:  0.17,
shadowRadius: 3.05,
elevation: 4,borderTopWidth:1,
borderTopColor:'#D8D9CF',margin:-5}}>
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
                data={product&&product.images}
                renderItem={({ item }) => (
                  <Image source={{uri:item.url}} style={{ flex: 1, width: null }} resizeMode="contain"/>
                //   console.log(item)
                )}
              />
            </View>
            {/* 2nd container */}
            <View style={{padding:15,borderBottomWidth:dark?1:.2,
borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',}}>
                <Text style={{fontFamily:'Roboto_400Regular',fontSize:18,color:dark?globalStyle.darkTheme.text:null}}>{product&&product.name} <Text style={{fontFamily:'Roboto_300Light',fontSize:12}}>{`#${product&&product._id}`}</Text></Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Rating
      startingValue={product&&product.ratings}
      readonly={true}
  style={{ paddingVertical: 8,color:"#066163",}}
  imageSize={20}
  type='custom'
  ratingColor="#066163"
  tintColor={dark?globalStyle.darkTheme.backgroundPrimary:null}
/>
<Text style={{fontSize:12,color:dark?globalStyle.darkTheme.text:null}}>({product&&product.numOfReviews} Reviews)</Text>
<Text style={{fontSize:18,marginLeft:110,color:product&&product.Stock < 1 ?globalStyle.colors.secondary:"#379237"}}>{product&&product.Stock < 1 ?"OutOfStock" : "InStock"}</Text>
</View>
<View style={{flexDirection:'row',alignItems:'center',marginVertical:10,backgroundColor:dark?"#e15555":'#b8f1b085',paddingHorizontal:10,paddingVertical:18,borderRadius:4}}>
<Text style={{ fontFamily: "Roboto_500Medium", flexWrap: 'wrap',color:'#379237',marginHorizontal:8,fontSize:18,}}>
{`50% Off`}</Text>
<Text style={{color:dark?globalStyle.darkTheme.text:"gray",fontFamily: "Roboto_300Light",textDecorationLine:'line-through',fontSize:18,}}>{product&&product.price}</Text>
<Text style={{color:"black",fontFamily: "Roboto_500Medium",marginHorizontal:5,fontSize:20,}}> {`₹${product&&product.price}`}</Text> 
       
</View>
<Text style={{color:dark?globalStyle.darkTheme.text:"black",fontFamily: "Roboto_400Regular",fontSize:13,}}> EMI from ₹500/month.</Text>
     </View>
     {/* description */}
     <View style={{padding:15,borderBottomWidth:dark?1:.2,
borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',}}>
<Text style={{color:dark?globalStyle.darkTheme.text:"black",fontFamily: "Roboto_500Medium",fontSize:18,}}>Description</Text>
<Text style={{color:dark?globalStyle.darkTheme.text:"black",fontFamily: "Roboto_400Regular",fontSize:14,}}>{product&&product.description}</Text>
<TouchableOpacity style={{marginHorizontal:110,marginTop:8}} onPress={()=>{isAuthenticated?addToCartHandler():console.log('2')}}><Text style={{textAlign:'center',fontSize:18,marginVertical:5,backgroundColor:globalStyle.colors.secondary,padding:10,color:"#fff",fontFamily: "Roboto_400Regular",borderRadius:18}}>Add to cart</Text></TouchableOpacity>
</View>
{/* reviews */}
     <View style={{padding:15,borderBottomWidth:dark?1:.2,
borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',marginBottom:60}}>
<Text style={{color:dark?globalStyle.darkTheme.text:"black",fontFamily: "Roboto_500Medium",fontSize:18,}}>{product&&product.reviews&&product.reviews[0]?"Reviews":"No Reviews"}</Text>
{product&&product.reviews &&
                product.reviews.map((review,i) => (
                  <View style={{flexDirection:'row'}} key={i}>
                <Image source={avatar} style={{width:50,height:50}} resizeMode="contain"/>
                <View style={{alignItems:'flex-start'}}>
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>{review.name}</Text>
                  <Rating
      startingValue={review.rating}
      readonly={true}
  imageSize={14}
  tintColor={dark?globalStyle.darkTheme.backgroundPrimary:null}
/>
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>{review.comment}</Text>
                </View>
                </View>
                ))}
                
                {/* give review */}
                <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
           marginTop:12
          }}
        >
          <Button
            onPress={showReviewDialog}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color:dark?globalStyle.darkTheme.text: "#413F42" }}>Give Review</Text>
            <Icon name="chevron-up" size={16} color="gray" />
          </Button>
          <Portal>
          {/* price */}
            <Dialog
              visible={reviewDialogVisible}
              onDismiss={hideReviewDialog}
              style={{ backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:"#fff" }}
            >
              <Dialog.Title style={{color:dark?globalStyle.darkTheme.text:null}}>Submit Review</Dialog.Title>
              <Dialog.Content
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <View style={{  alignItems: "center" }}>
                <Rating
                startingValue={0}
  onFinishRating={(rating)=>setRating(rating)}
  style={{ paddingVertical: 10 }}
  imageSize={25}
  tintColor={dark?globalStyle.darkTheme.backgroundPrimary:null}
/>
                <TextInput
      value={comment}
      onChangeText={setComment}
      style={{width:290,backgroundColor:'#d723234f',}}
      textColor={dark?globalStyle.darkTheme.text:"#342e2ef7"}
     activeUnderlineColor="#ff7d7df7"
    />
    </View>
             </Dialog.Content>
              
              <Dialog.Actions>
                <Button
                  onPress={hideReviewDialog}
                  textColor={dark?globalStyle.darkTheme.text:"#000"}
                >
                  Cancel
                </Button>
                <Button
                  onPress={()=>{reviewSubmitHandler();hideReviewDialog()}}
                  textColor={globalStyle.colors.secondary}
                >
                  Submit
                </Button>
              </Dialog.Actions>
            </Dialog>
            </Portal>
            <AwesomeAlert
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
          onConfirmPressed={()=>setAlert(false)}
        />
          </View>
                
<View>
</View>
</View>
        </SafeAreaView>
        </ScrollView>
        </View>
      </View>
    )
  
}

export default ProductDetails

const styles = StyleSheet.create({
   
})