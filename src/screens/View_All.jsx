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
import { getProduct } from "../../redux/actions/productAction";
import { Checkbox } from "react-native-paper";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import ProductCard from "../components/ProductCard.jsx"
import Loader from '../components/Loader';


const View_All = ({ navigation }) => {
  const [priceVisible, setPriceVisible] = React.useState(false);
  const [ratingVisible, setRatingVisible] = React.useState(false);
  const {dark}=useSelector(state=>state.theme);
  const showPriceDialog = () => setPriceVisible(true);
  const hidePriceDialog = () => setPriceVisible(false);
  
  const showRatingDialog = () => setRatingVisible(true);
  const hideRatingDialog = () => setRatingVisible(false);

  const [priceChecked, setPriceChecked] = useState({
    10000: false,
    15000: false,
    20000: false,
    25000: false,
    30000: false,
    above: false,
  });
  const [ratingChecked, setRatingChecked] = useState({
    4: false,
    3: false,
  });
  
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(false);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("SmartPhones");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const priceHandler=()=>{
    if(priceChecked[10000]) setPrice([0,10000])
    else if(priceChecked[15000]) setPrice([10000,15000])
    else if(priceChecked[20000]) setPrice([15000,20000])
    else if(priceChecked[25000]) setPrice([20000,25000])
    else if(priceChecked[30000]) setPrice([25000,30000])
    else if(priceChecked.above) setPrice([30000,100000])
  }
  
  const resetPriceHandler=()=>{
    setPrice([0,250000])
    setPriceChecked({
      10000: false,
      15000: false,
      20000: false,
      25000: false,
      30000: false,
      above: false,
    })
  }

  const ratingHandler=()=>{
    if(ratingChecked[3]) setRatings(3)
    else if(ratingChecked[4]) setRatings(4)
  }

  const resetRating=()=>{
    setRatings(0);
    setRatingChecked({
      4: false,
      3: false,
    })
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct("", currentPage, price, category, ratings));
  }, [dispatch, currentPage, price, category, ratings, error]);

  return loading?<Loader/>:(
    <View style={globalStyle.androidHead}>
      <View style={{ flex: 1, backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#fff" }}>
        {/* header */}
        <View style={{
    backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:globalStyle.colors.primary,
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
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 20,
                marginLeft: 6,
                color: "#fff",
              }}
            >
              Mobile
            </Text>
          </View>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("cart")}
          >
            <Icon name="cart-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* filter */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottomColor: dark?globalStyle.darkTheme.border:"#D8D9CF",
            borderBottomWidth: 0.2,
          }}
        >
          <Button
            onPress={showPriceDialog}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: dark?globalStyle.darkTheme.text:"#413F42" }}>Price</Text>
            <Icon name="chevron-down" size={16} color="gray" />
          </Button>
          <Button
            onPress={showRatingDialog}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: dark?globalStyle.darkTheme.text:"#413F42" }}>Rating</Text>
            <Icon name="chevron-down" size={16} color="gray" />
          </Button>
          <Portal>
          {/* price */}
            <Dialog
              visible={priceVisible}
              onDismiss={hidePriceDialog}
              style={{ backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:"#F2F2F2" }}
            >
              <Dialog.Title style={{color:dark?globalStyle.darkTheme.text:null}}>Filter</Dialog.Title>
              <Dialog.Content
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={priceChecked[10000] ? "checked" : "unchecked"}
                    onPress={() =>
                      setPriceChecked({
                        10000: !priceChecked[10000],
                        15000: false,
                        20000: false,
                        25000: false,
                        30000: false,
                        above: false,
                      })
                    }
                    color={globalStyle.colors.primary}
                    
                  />
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>₹10000 and Below</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={priceChecked[15000] ? "checked" : "unchecked"}
                    onPress={() =>
                      setPriceChecked({
                        10000: false,
                        15000: !priceChecked[15000],
                        20000: false,
                        25000: false,
                        30000: false,
                        above: false,
                      })
                    }
                    color={globalStyle.colors.primary}
                  />
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>₹10000 - ₹15000</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={priceChecked[20000] ? "checked" : "unchecked"}
                    onPress={() =>
                      setPriceChecked({
                        10000: false,
                        15000: false,
                        20000: !priceChecked[20000],
                        25000: false,
                        30000: false,
                        above: false,
                      })
                    }
                    color={globalStyle.colors.primary}
                  />
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>₹15000 - ₹20000</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={priceChecked[25000] ? "checked" : "unchecked"}
                    onPress={() =>
                      setPriceChecked({
                        10000: false,
                        15000: false,
                        20000: false,
                        25000: !priceChecked[25000],
                        30000: false,
                        above: false,
                      })
                    }
                    color={globalStyle.colors.primary}
                  />
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>₹20000 - ₹25000</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={priceChecked[30000] ? "checked" : "unchecked"}
                    onPress={() =>
                      setPriceChecked({
                        10000: false,
                        15000: false,
                        20000: false,
                        25000: false,
                        30000: !priceChecked[30000],
                        above: false,
                      })
                    }
                    color={globalStyle.colors.primary}
                  />
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>₹25000 - ₹30000</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={priceChecked.above ? "checked" : "unchecked"}
                    onPress={() =>
                      setPriceChecked({
                        10000: false,
                        15000: false,
                        20000: false,
                        25000: false,
                        30000: false,
                        above: !priceChecked.above,
                      })
                    }
                    color={globalStyle.colors.primary}
                  />
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>₹30000 and Above</Text>
                </View>
                
              </Dialog.Content>
              
              <Dialog.Actions>
              <Button
                  onPress={()=>{resetPriceHandler();hidePriceDialog()}}
                  textColor={globalStyle.colors.secondary}
                >
                  Reset
                </Button>
                <Button
                  onPress={()=>{priceHandler(); hidePriceDialog()}}
                  textColor={globalStyle.colors.secondary}
                >
                  Apply
                </Button>
                
              </Dialog.Actions>
            </Dialog>
            {/* ratings */}
            <Dialog
              visible={ratingVisible}
              onDismiss={hideRatingDialog}
              style={{ backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:"#F2F2F2" }}
            >
              <Dialog.Title style={{color:dark?globalStyle.darkTheme.text:null}}>Filter</Dialog.Title>
              <Dialog.Content
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={ratingChecked[4] ? "checked" : "unchecked"}
                    onPress={() =>
                      setRatingChecked({
                        4: !ratingChecked[4],
                        3: ratingChecked[3],
                      })
                    }
                    color={globalStyle.colors.primary}
                  />
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>4 and Above</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={ratingChecked[3] ? "checked" : "unchecked"}
                    onPress={() =>
                        setRatingChecked({
                        4: ratingChecked[4],
                        3: !ratingChecked[3],
                      })
                    }
                    color={globalStyle.colors.primary}
                  />
                  <Text style={{color:dark?globalStyle.darkTheme.text:null}}>3 and Above</Text>
                </View>
             </Dialog.Content>
             <Dialog.Actions>
                <Button
                  onPress={()=>{resetRating();hideRatingDialog()}}
                  textColor={globalStyle.colors.secondary}
                >
                  Reset
                </Button>
                <Button
                  onPress={()=>{ratingHandler();hideRatingDialog()}}
                  textColor={globalStyle.colors.secondary}
                >
                  Apply
                </Button>
              </Dialog.Actions>

             </Dialog>
          </Portal>
        </View>
        <ScrollView>
        <SafeAreaView>
        {/* products */}
        <View>
            {products&&products.map((elem,index)=>(
            <ProductCard data={elem} key={index} navigation={navigation}/>
            ))}
        </View>
        </SafeAreaView>
        </ScrollView>
      </View>
    </View>
  );
};

export default View_All;
