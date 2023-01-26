import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button,TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/userAction'
import { globalStyle } from '../../styles/global'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AwesomeAlert from 'react-native-awesome-alerts'
import Loader from "../components/Loader"

const Login = ({navigation}) => {
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
      );
      const [alert,setAlert]=useState(false);
      const [alertMsg,setAlertMsg]=useState("");
      const {dark}=useSelector(state=>state.theme);
    const dispatch = useDispatch();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
       
        dispatch(login(email, password))

    }

    useEffect(() => {
        if (error) {
            // alert(error)
            setAlertMsg(error)
            setAlert(true)
            dispatch({ type: "CLEAR_ERRORS" })
        }
        if (isAuthenticated) {
            navigation.navigate('My Account')
          }
    }, [error, dispatch, alert,isAuthenticated])

    // [dispatch, error, alert, history, isAuthenticated, redirect]


  return loading? <Loader/> :(
    <View style={[globalStyle.androidHead,{backgroundColor:dark?globalStyle.darkTheme.text:globalStyle.colors.primary}]}>
    <View style={{flex:1,backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'white',justifyContent:'center',alignItems:'center'}}>
    <Text style={{ fontSize: 25, margin: 20 ,fontFamily:'Roboto_500Medium',color:dark?globalStyle.darkTheme.text:null}}>Easy-Bazaar</Text>
            <View style={{ width: "70%" }}>
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
                disabled={!email || !password}
                style={styles.btn}
                onPress={loginHandler}
            >
                <Text style={{ color: dark?globalStyle.darkTheme.text: "#fff" }}>Login</Text>
            </Button>

            <Text
                style={{
                    marginTop: 20,
                    color: dark?globalStyle.darkTheme.text:null
                }}
            >
                Or
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                    style={{
                        color:"#900",
                        height: 30,
                        margin: 20,
                    }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                <Text  style={{color: dark?globalStyle.darkTheme.text:null}}>  Forget Password   </Text>
            </TouchableOpacity>
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
          onConfirmPressed={()=>{setAlert(false);}}
          contentContainerStyle={{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}}
          messageStyle={{color:dark?globalStyle.darkTheme.text:"gray"}}
        />
    </View>
    </View>
  )
}

export default Login

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