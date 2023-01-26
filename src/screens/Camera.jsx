import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker"
import { Button } from 'react-native-paper';


const CameraComponent = ({ navigation, route }) => {
    
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);

    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState("")
    

    useEffect(() => {
        
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        //allow Editing to crop & quality will be between 0 to 1
        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, aspect: [1, 1], quality: 1
        });

        //when we click pic if the request is for updateProfile then we navigate to the profile with prop of image else navigate to register screen
        if (route.params.updateProfile) return navigation.navigate("edit profile", { image: data.uri })
        else return navigation.navigate("Register", { image: data.uri })
    }

    const clickPicture = async () => {

        const data = await camera.takePictureAsync();
       
        setPreviewVisible(true)
    setCapturedImage(data.uri)
        
       
        // console.log(data.assets[0].uri)

    }

    const retake=()=>{
        setPreviewVisible(false);
        setCapturedImage(null)
    }

    const saveImage=()=>{
if (route.params.updateProfile) return navigation.navigate("edit profile", { image: capturedImage })
        else return navigation.navigate("Register", { image: capturedImage })
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
       <View style={{ flex: 1 }}>
       
            

{/* camera preview */}
{previewVisible&&capturedImage?<View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <Image
        source={{uri:capturedImage}}
        style={{
          flex: 1
        }}
      />
      <View
      style={{
        flexDirection: "row",
            position: "absolute",
                     bottom: 10,
                     justifyContent: "space-evenly",
                     width: "100%",
      }}
    >
      <Button onPress={retake}><Text style={{fontSize:20,fontFamily:"Roboto_500Medium",color:'#fff'}}>Retake</Text></Button>
      <Button onPress={saveImage}><Text style={{fontSize:20,fontFamily:"Roboto_500Medium",color:'#fff'}}>Save</Text></Button>      
                </View>
    </View>:(<View style={{ flex: 1 }}>
           
           <Camera type={type} style={{ flex: 1, aspectRatio: 1 }} ratio="1:1" ref={(e) => setCamera(e)} />
 
             <View
                 style={{
                     flexDirection: "row",
                     position: "absolute",
                     bottom: 10,
                     justifyContent: "space-evenly",
                     width: "100%",
                 }}
             >
                 <Icon name="image" size={40} color="#fff" onPress={openImagePickerAsync} />
                 <Icon name="camera" size={40} color="#fff" onPress={clickPicture} />
 
                 <Icon
                     name="flip-camera-android"
                     size={40}
                     color="#fff"
                     onPress={() =>
                         setType(
                             type === CameraType.back ? CameraType.front : CameraType.back
                         )
                     }
                 />
                 </View>
             </View>)}
        </View>

    );
}
export default CameraComponent
