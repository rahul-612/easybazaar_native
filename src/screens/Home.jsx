import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyle } from "../../styles/global";
import { myFonts } from "../../styles/myFonts";
import Icon from "react-native-vector-icons/Entypo";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/actions/productAction";
import {
  bannerImgs,
  hotImgs,
  dealImgs,
  forYouImgs,
  sponsImgs,
  bestQuality,
  electronicSales,
  bestQuality1,
  bestQuality2,
} from "../../styles/images";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { Searchbar, useTheme } from "react-native-paper";
import SmallCard from "../components/SmallCard.jsx";
import myImg from "../../assets/me.png";
import { Avatar } from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../components/Loader";
import { DarkTheme } from "@react-navigation/native";

const PAGE_WIDTH = Dimensions.get("window").width;

const Home = ({ navigation }) => {
  // console.log(PAGE_WIDTH)
  const { loading, error, products } = useSelector((state) => state.products);
  const { dark } = useSelector((state) => state.theme);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const progressValue = useSharedValue(0);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [fontsLoaded] = useFonts(myFonts);

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  // console.log(products);
  useEffect(() => {
    if (error) {
      setAlert(true);
      setAlertMsg(error);
      // alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(searchQuery.toLowerCase(), "1", [0, 250000], "", 0));
    dispatch({ type: "FOOTER_INFO", payload: { footer: true } });
  }, [dispatch, isFocused, error, searchQuery]);

  const searchHandler = () => {
    if (searchQuery.trim()) {
      setSearchLoading(true);

      if (products.length > 0) {
        setSearchLoading(false);
        navigation.navigate("Search", {
          keyword: searchQuery,
          data: products,
        });
      } else {
        setSearchLoading(false);
        setAlert(true);
        setAlertMsg(`Sorry nothing like ${searchQuery} in store rightnow!`);
      }
      // console.log(products)
    } else {
      setSearchLoading(false);
      setAlert(true);
      setAlertMsg("Nothing like this");
    }
  };

  return !fontsLoaded ? (
    <Loader />
  ) : (
    <View style={globalStyle.androidHead}>
      <View
        style={{
          flex: 1,
          backgroundColor: dark ? globalStyle.darkTheme.backgroundPrimary : "#fff",
        }}
      >
        {/* header */}
        <View
          style={{
            backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:globalStyle.colors.headingBack,
            height: 60,
            flexDirection: "row",
            alignItems: "center",
          }}
         
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={50} color="#fff" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text
              style={{
                fontSize: 25,
                color: "#fff",
                fontFamily: "Oswald_700Bold",
              }}
            >
              Easy-Bazaar
            </Text>
          </View>
        </View>
        {/* search */}
        <View
          style={{
            borderBottomColor: dark?globalStyle.darkTheme.border:null,
            borderBottomWidth: dark?0.8:null,
            marginTop:-2
          }}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            onIconPress={searchHandler}
            loading={searchLoading}
            autoCapitalize="none"
            style={{
              backgroundColor: dark ? globalStyle.darkTheme.backgroundSecondary : null,
            }}
            placeholderTextColor={dark ? globalStyle.darkTheme.text : null}
            iconColor={dark ? globalStyle.darkTheme.text : null}
            inputStyle={{ color: dark ? globalStyle.darkTheme.text : null }}
          />
        </View>
        <ScrollView>
          <SafeAreaView>
            {/* banner */}
            <View style={styles.banner}>
              <Animatable.Text
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={styles.bannerText}
              >
                #now
              </Animatable.Text>
              <Text style={[styles.bannerText, { marginHorizontal: 6 }]}>
                or
              </Text>
              <Animatable.Text
                animation="tada"
                easing="ease-out"
                iterationCount="infinite"
                style={[
                  styles.bannerText,
                  { textDecorationLine: "line-through" },
                ]}
              >
                never
              </Animatable.Text>
            </View>
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
                onProgressChange={(absoluteProgress) =>
                  (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 50,
                }}
                data={bannerImgs}
                renderItem={({ item }) => (
                  <Image source={item} style={{ flex: 1, width: null }} />
                  // console.log(item)
                )}
              />
            </View>
            {/* hot topics */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={hotImgs}
              renderItem={({ item }) => (
                <View style={{ marginHorizontal: 12, alignItems: "center" }}>
                  <View
                    style={{
                      borderRadius: 35,
                      marginTop: 15,
                      marginBottom: 8,
                      height: 50,
                      shadowColor: "#000000",
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
                      source={item.img}
                      style={{ width: 55, height: 40 }}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Roboto_500Medium",
                      color: dark ? globalStyle.darkTheme.text : null,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              )}
              keyExtractor={(key) => {
                return key.name;
              }}
            />
            {/* deals */}
            <View
              style={{
                marginTop: 20,
                paddingTop: 10,
                borderTopWidth: dark?1:0.4,
                borderColor: dark ? globalStyle.darkTheme.border : "#ededed",
              }}
            >
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dealImgs}
                renderItem={({ item }) => (
                  <SmallCard data={item} serverData={false} small={true} />
                )}
                keyExtractor={(key) => {
                  return key.title;
                }}
              />
            </View>
            {/* offers for you */}
            <View
              style={{
                marginTop: 20,
                paddingVertical: 10,
                borderTopWidth:dark?1: 0.4,
                borderColor: dark?globalStyle.darkTheme.border:"#ededed",
                backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#F7ECDE",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Roboto_500Medium",
                  marginHorizontal: 5,
                  marginBottom: 8,
                  color: dark?globalStyle.darkTheme.text:"#434242",
                }}
              >
                Offers For You
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {forYouImgs.map((elem, index) => (
                  <SmallCard
                    data={elem}
                    small={false}
                    serverData={false}
                    key={index}
                  />
                ))}
              </View>
            </View>
            {/* sponsored */}
            <View
              style={{
                marginTop: 20,
                paddingVertical: 10,
                borderTopWidth: dark?1:0.4,
                borderColor: dark?globalStyle.darkTheme.border:"#ededed",
                backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#fff",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Roboto_500Medium",
                  marginHorizontal: 5,
                  marginBottom: 8,
                  color: dark?globalStyle.darkTheme.text:"#434242",
                }}
              >
                Sponsored
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {sponsImgs.map((elem, index) => (
                  <SmallCard
                    data={elem}
                    small={false}
                    serverData={false}
                    key={index}
                  />
                ))}
              </View>
            </View>
            {/* best quality1 */}
            <View
              style={{
                marginTop: 5,
                paddingTop: 10,
                borderTopWidth: dark?1:0.4,
                borderColor: dark?globalStyle.darkTheme.border:"#ededed",
              }}
            >
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={bestQuality1}
                renderItem={({ item }) => (
                  <SmallCard data={item} serverData={false} small={true} />
                )}
                keyExtractor={(key) => {
                  return key.title;
                }}
              />
            </View>
            {/* offers for you */}
            <View
              style={{
                marginTop: 20,
                paddingVertical: 10,
                borderTopWidth: dark?1:0.4,
                borderColor: dark?globalStyle.darkTheme.border:"#ededed",
                backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#F7ECDE",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Roboto_500Medium",
                  marginHorizontal: 5,
                  marginBottom: 8,
                  color:dark?globalStyle.darkTheme.text: "#434242",
                }}
              >
                Offers For You
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {electronicSales.map((elem, index) => (
                  <SmallCard
                    data={elem}
                    small={false}
                    serverData={false}
                    key={index}
                  />
                ))}
              </View>
            </View>
            {/* best quality2 */}
            <View
              style={{
                marginTop: 5,
                paddingTop: 10,
                borderTopWidth: dark?1:0.4,
                borderColor: dark?globalStyle.darkTheme.border:"#ededed",
              }}
            >
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={bestQuality2}
                renderItem={({ item }) => (
                  <SmallCard data={item} serverData={false} small={true} />
                )}
                keyExtractor={(key) => {
                  return key.title;
                }}
              />
            </View>
            {/* about me */}
            <View
              style={{
                marginTop: 30,
                paddingVertical: 10,
                borderTopWidth: dark?1:0.4,
                borderColor: dark?globalStyle.darkTheme.border:"#ededed",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("https://rahul612-portfolio.onrender.com/")
                  }
                >
                  <Avatar.Image
                    size={44}
                    style={{ backgroundColor: dark?globalStyle.darkTheme.backgroundPrimary:"#fff" }}
                    source={myImg}
                  />
                </TouchableOpacity>
                <Text
                  style={{ fontFamily: "Roboto_400Regular", marginLeft: 8 ,color:dark?globalStyle.darkTheme.text:null}}
                >
                  Hey I'am Rahul, a MERN Developer
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  justifyContent: "space-around",
                  width: PAGE_WIDTH - 250,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/rahul-kumar-83658a222"
                    )
                  }
                >
                  <Icon name="linkedin" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("https://github.com/rahul-612")
                  }
                >
                  <Icon name="github" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("https://www.instagram.com/blessed_612/")
                  }
                >
                  <Icon name="instagram" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("https://www.facebook.com/Rk785164")
                  }
                >
                  <Icon name="facebook" size={20} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            <AwesomeAlert
              show={alert}
              showProgress={false}
              title="Opps! Error"
              message={alertMsg}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              cancelText="No, cancel"
              confirmText="Ok"
              confirmButtonStyle={{ width: 90 }}
              confirmButtonTextStyle={{ textAlign: "center", fontSize: 15 }}
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => setAlert(false)}
              onConfirmPressed={() => setAlert(false)}
            />
          </SafeAreaView>
        </ScrollView>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  bannerText: {
    color: "#ff2483",
    fontFamily: "Roboto_700Bold",
    fontSize: 25,

    textTransform: "uppercase",
    textShadowColor: "rgba(255, 101, 189, 1.00)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
