import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'


const ErrorComponent = ({navigation}) => {
    useEffect(() => {
      alert("Login")
        navigation.navigate("Home")
    }, [])
    
  return (
      <View>

      </View>
  
  )
}

export default ErrorComponent