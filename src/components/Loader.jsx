import { View,Image } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import loader from "../../assets/loader.gif"
import { globalStyle } from '../../styles/global'

const Loader = () => {
   
    return (
        <View style={globalStyle.androidHead}>
     
        <View
            style={{
                backgroundColor: "#000",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* <ActivityIndicator animating={true} size={100} color="#900" /> */}
            <Image source={loader} style={{width: '75%', height: '75%'}} />
        </View>
        </View>
    )
}

export default Loader