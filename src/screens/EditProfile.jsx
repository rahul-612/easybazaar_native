import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { globalStyle } from '../../styles/global'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Button,TextInput } from 'react-native-paper'
import { update,loadUser,clearErrors } from '../../redux/actions/userAction';
import mime from 'mime';
import Loader from '../components/Loader';
import AwesomeAlert from 'react-native-awesome-alerts'

const EditProfile = ({navigation,route}) => {
const {user} =useSelector((state)=>state.user)
const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch()
    const {dark}=useSelector(state=>state.theme);
    const [avatar, setAvatar] = useState(user.avatar.url);
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email);
    const [alert,setAlert]=useState(false);
    const [alertMsg,setAlertMsg]=useState("");

    const handleImage = () => {
        //navigate to 'camera' route/screen
        navigation.navigate("camera", {
            updateProfile: true
        })
    };

    const registerHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("avatar",  {
            uri: avatar,
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        })
        dispatch(update(myForm)); 
    }

    useEffect(() => {
        //route.params has image which are comming from camera screen
        if (route.params) {
            if (route.params.image) {
                setAvatar(route.params.image)
            }
        }
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatar(user.avatar.url);
          }
      
          if (error) {
            // alert(error);
            setAlertMsg(error)
            setAlert(true)
            dispatch(clearErrors());
          }
      
          if (isUpdated) {
            setAlertMsg("Profile Updated Successfully");
            setAlert(true)
            // alert("Profile Updated Successfully");
            dispatch(loadUser());
      
           navigation.navigate("My Account")
      
            dispatch({
              type: "UPDATE_PROFILE_RESET",
            });
          }
        
          
    }, [route,dispatch, error, alert, user, isUpdated])

    

  return loading?<Loader/>:(<View style={[globalStyle.androidHead,{backgroundColor:dark?globalStyle.darkTheme.text:globalStyle.colors.primary}]}>
    <View style={{flex:1,backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'white',justifyContent:'center',alignItems:'center'}}>
    <Text style={{ fontSize: 25, margin: 20 ,fontFamily:'Roboto_500Medium',color:dark?globalStyle.darkTheme.text:null}}>Update Profile</Text>
    <Avatar.Image
                size={100}
                source={{ uri: avatar ? avatar : null }}
                style={{ backgroundColor: globalStyle.colors.primary }}
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

            </View>

            <Button
                disabled={
                    !email || !name
                }
                style={styles.btn}
                onPress={registerHandler}
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

export default EditProfile

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