import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button,TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/userAction'
import { globalStyle } from '../../styles/global'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AwesomeAlert from 'react-native-awesome-alerts'
import Loader from "../components/Loader"
import {forgotPassword,clearErrors} from "../../redux/actions/userAction";


const ForgetPassword = () => {
    const dispatch = useDispatch();
    const {dark}=useSelector(state=>state.theme);
    const [alert,setAlert]=useState(false);
          const [alertMsg,setAlertMsg]=useState("");

    const { error, message, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [email, setEmail] = useState("");
  
    const forgetHandler = () => {
        
      dispatch(forgotPassword(email));
    };
  
    useEffect(() => {
      if (error) {
        setAlertMsg(error)
        setAlert(true)
        dispatch(clearErrors());
      }
  
      if (message) {
        setAlertMsg(message)
        setAlert(true)
      }
    }, [dispatch, error, alert, message]);
  

  return loading? <Loader/>: (
    <View style={[globalStyle.androidHead,{backgroundColor:dark?globalStyle.darkTheme.text:globalStyle.colors.primary}]}>
    <View style={{flex:1,backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'white',justifyContent:'center',alignItems:'center'}}>
    <Text style={{ fontSize: 25, margin: 10 ,fontFamily:'Roboto_500Medium',textDecorationLine:'underline',color:dark?globalStyle.darkTheme.text:null}}>Forget Password</Text>
    <View style={{ width: "70%" ,}}>
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
                 <Button
                disabled={email?false:true}
                style={styles.btn}
                onPress={forgetHandler}
            >
                <Text style={{ color: "#fff" }}>Send</Text>
            </Button>
                </View>
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
        />
                
    </View>
    </View>
  )
}

export default ForgetPassword

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
        
    },
})