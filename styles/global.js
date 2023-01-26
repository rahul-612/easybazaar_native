import { StyleSheet, StatusBar } from "react-native";


export const globalStyle = StyleSheet.create({
  androidHead: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#EDEDED'
  },
  colors: {
    primary: "#D72323",
    secondary: "#d33a3a",
    headingBack:"#d72323db"
  },
  fonts: {
    heading: "Oswald_600SemiBold",
    secondary: "#d33a3a",
  },
 darkTheme:{
  backgroundPrimary: "#191919",
  backgroundSecondary: "#0F0E0E",
  border: "rgb(39, 39, 41)",
  card: "rgb(18, 18, 18)",
  notification: "rgb(255, 69, 58)",
  primary: "rgb(10, 132, 255)",
  text: "rgb(229, 229, 231)",
},
    });

    // rgb(1, 1, 1)