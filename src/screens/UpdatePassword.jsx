import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { globalStyle } from '../../styles/global'
import {  Button,TextInput } from 'react-native-paper'
import { updatePassword,loadUser,clearErrors } from '../../redux/actions/userAction';
import Loader from '../components/Loader';
import AwesomeAlert from 'react-native-awesome-alerts'

const UpdatePassword = ({navigation}) => {
  const [alert,setAlert]=useState(false);
  const [alertMsg,setAlertMsg]=useState("");
    const dispatch = useDispatch();
    const {dark}=useSelector(state=>state.theme);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
  
      const myForm = new FormData();
  
    //   myForm.append("oldPassword", oldPassword);
    //   myForm.append("newPassword", newPassword);
    //   myForm.append("confirmPassword", confirmPassword);
  
      dispatch(updatePassword(oldPassword,newPassword,confirmPassword));
    };
  
    useEffect(() => {
      if (error) {
        // alert(error);
        setAlertMsg(error)
        setAlert(true)
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        // alert("Password Updated Successfully");
  setAlertMsg("Password Updated Successfully");
  setAlert(true)
        navigation.navigate("My Account")
  
        dispatch({
          type: "UPDATE_PASSWORD_RESET",
        });
      }
    }, [dispatch, error, alert, isUpdated]);
  
  

    return loading?<Loader/>:(
        <View style={[globalStyle.androidHead,{backgroundColor:dark?globalStyle.darkTheme.text:globalStyle.colors.primary}]}>
        <View style={{flex:1,backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'white',justifyContent:'center',alignItems:'center'}}>
        <Text style={{ fontSize: 25, margin: 20 ,fontFamily:'Roboto_500Medium',color:dark?globalStyle.darkTheme.text:null}}>Update Password</Text>
                <View style={{ width: "70%" }}>
                    <TextInput
                    mode='outlined'
                        label="Old Password"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        autoCapitalize='none'
                        style={[styles.input,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeOutlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                    />
                    <TextInput
                    mode='outlined'
                        label="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        autoCapitalize='none'
                        style={[styles.input,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeOutlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                    />
                    <TextInput
                    mode='outlined'
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        autoCapitalize='none'
                        style={[styles.input,{backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}
                    activeOutlineColor={globalStyle.colors.primary}
                    placeholderTextColor={dark?globalStyle.darkTheme.text:"#000"}
                    textColor={dark?globalStyle.darkTheme.text:"#000"}
                    />
    
                </View>
    
                <Button
                    disabled={
                        !oldPassword || !newPassword || !confirmPassword
                    }
                    style={styles.btn}
                    onPress={updatePasswordSubmit}
                >
                    <Text style={{ color: "#fff" }}>Update</Text>
                </Button>
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

export default UpdatePassword

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