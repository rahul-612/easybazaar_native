import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { globalStyle } from '../../styles/global'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Button,TextInput } from 'react-native-paper'
import { register, registerMobile } from '../../redux/actions/userAction';
import mime from 'mime';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../components/Loader';


const Register = ({navigation,route}) => {

    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
      );
      const {dark}=useSelector(state=>state.theme);
    const dispatch = useDispatch()

    const isFocused=useIsFocused()

    const handleImage = () => {
        //navigate to 'camera' route/screen
        navigation.navigate("camera", {
            updateProfile: false
        })
    };

    const registerHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("avatar",  {
            uri: avatar,
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        })
         
        dispatch(registerMobile(myForm));
    }

    useEffect(() => {
        dispatch({type:'SYSTEM_INFO',payload:{footer:false}})
        //route.params has image which are comming from camera screen
        if (route.params) {
            if (route.params.image) {
                setAvatar(route.params.image)
            }
        }
        if(isAuthenticated){
            navigation.navigate("My Account")
        }
    }, [route,isAuthenticated])


  return loading? <Loader/> : (
    <View style={[globalStyle.androidHead,{backgroundColor:dark?globalStyle.darkTheme.text:globalStyle.colors.primary}]}>
    <View style={{flex:1,backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'white',justifyContent:'center',alignItems:'center'}}>
    <Text style={{ fontSize: 25, margin: 20 ,fontFamily:'Roboto_500Medium',color:dark?globalStyle.darkTheme.text:null}}>Easy-Bazaar</Text>
    <Avatar.Image
                size={100}
                source={{ uri: avatar ? avatar : null }}
                style={{ backgroundColor: dark?globalStyle.darkTheme.backgroundSecondary:globalStyle.colors.primary }}
            />
            <TouchableOpacity onPress={handleImage}>
                <Text style={{ color: "#900" }}>Upload Photo</Text>
            </TouchableOpacity>

            <View style={{ width: "70%" }}>
                <TextInput
                mode='outlined'
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize='none'
                    style={[styles.input,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeOutlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                />
                <TextInput
                mode='outlined'
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    style={[styles.input,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeOutlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                />

                <TextInput
                mode='outlined'
                    secureTextEntry
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize='none'
                    style={[styles.input,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeOutlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                />
            </View>

            <Button
                disabled={
                    !email || !password || !name
                }
                style={styles.btn}
                onPress={registerHandler}
            >
                <Text style={{ color: dark?globalStyle.darkTheme.text:"#fff" }}>Register</Text>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text
                    style={{
                        color: "#900",
                        height: 30,
                        margin: 20,
                        color:dark?globalStyle.darkTheme.text:null
                    }}
                >
                    Have an Account, Login
                </Text>
            </TouchableOpacity>
    </View>
    </View>
  )
}

export default Register


const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },

    btn: {
        backgroundColor: globalStyle.colors.secondary,
        padding: 5,
        width: "70%",
    },
})