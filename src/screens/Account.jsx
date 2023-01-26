import { StyleSheet, Text, View,ScrollView,SafeAreaView,Image, TouchableOpacity, Alert, } from 'react-native'
import React,{useState} from 'react'
import { globalStyle } from '../../styles/global'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch,useSelector} from 'react-redux';
import { logout } from '../../redux/actions/userAction';
import AwesomeAlert from 'react-native-awesome-alerts';


const Account = ({navigation}) => {
  const dispatch=useDispatch()
  const {isAuthenticated,user,loading}=useSelector(state=>state.user)
  const [alert,setAlert]=useState(false);
  const {dark}=useSelector(state=>state.theme);
  const logoutHandler=()=>
  {
    dispatch(logout());
    // Alert("Log out successfully!");
  }

  return (
    <View style={[globalStyle.androidHead,{backgroundColor:dark?globalStyle.darkTheme.text:globalStyle.colors.primary}]}>
    <View style={{flex:1,backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:'white'}}>
      {/* header */}
      <View style={[styles.accHead,{borderBottomWidth:1,
borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 3,
},
shadowOpacity:  0.17,
shadowRadius: 3.05,
elevation: 4,backgroundColor:dark?globalStyle.darkTheme.backgroundSecondary:"#fff"}]}>
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            fontSize: 18,
            marginLeft: 8,
            color: dark?globalStyle.darkTheme.text:globalStyle.colors.secondary,
          }}
        >
          {user&&user.name?`Hey! ${user.name}`:"Login"}
        </Text>
      </View>
      <ScrollView>
        <SafeAreaView >
        <View style={{backgroundColor:dark?globalStyle.darkTheme.backgroundPrimary:"#fff",padding:10,flexDirection:'row',justifyContent:'space-around',flexWrap:'wrap',shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 3,
},
shadowOpacity:  0.17,
shadowRadius: 3.05,
elevation: 4,}}>
        <TouchableOpacity onPress={()=>isAuthenticated?navigation.navigate("orders"):setAlert(true)}>
        <View style={[styles.accountFirstComp,{borderColor:dark?globalStyle.darkTheme.border:"#D8D9CF",borderWidth:dark?2:1}]}>
            <Icon name="order-bool-descending-variant" size={25} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountFirstCText,{color:dark?globalStyle.darkTheme.text:"#000"}]}>Orders</Text>
            </View>
           </TouchableOpacity>
           <TouchableOpacity>
            <View style={[styles.accountFirstComp,{borderColor:dark?globalStyle.darkTheme.border:"#D8D9CF",borderWidth:dark?2:1}]}>
            <Icon name="heart-outline" size={25} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountFirstCText,{color:dark?globalStyle.darkTheme.text:"#000"}]}>Wishlist</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={[styles.accountFirstComp,{borderColor:dark?globalStyle.darkTheme.border:"#D8D9CF",borderWidth:dark?2:1}]}>
            <Icon name="ticket-percent-outline" size={25} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountFirstCText,{color:dark?globalStyle.darkTheme.text:"#000"}]}>Coupons</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={[styles.accountFirstComp,{borderColor:dark?globalStyle.darkTheme.border:"#D8D9CF",borderWidth:dark?2:1}]}>
            <Icon name="chat-question-outline" size={25} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountFirstCText,{color:dark?globalStyle.darkTheme.text:"#000"}]}>Help Center</Text>
            </View>
            </TouchableOpacity>
           
        </View>
        {/* second component */}
        <View style={{marginVertical:10,padding:10,borderBottomWidth:1,
borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.16,
shadowRadius: 1.51,
elevation: .5}}>
          <Text style={{fontSize:18,color:dark?globalStyle.darkTheme.text:null}}>Account Settings</Text>
          <View style={{justifyContent:'space-around',}}>
            <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:16}}>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <Icon name="wallet-membership" size={21} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountSecondText,{color:dark?globalStyle.darkTheme.text:'#000'}]}>Easy-Bazaar VIP</Text>
              </View>
              <Icon name="greater-than" color={dark?"gray":null} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:16}} onPress={()=> {isAuthenticated?navigation.navigate("edit profile"):setAlert(true)}} >
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <Icon name="account-outline" size={21} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountSecondText,{color:dark?globalStyle.darkTheme.text:'#000'}]}>Edit Profile</Text>
              </View>
              <Icon name="greater-than" color={dark?"gray":null} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:16}} onPress={()=> {isAuthenticated?navigation.navigate("update password"):setAlert(true)}}>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <Icon name="lock-outline" size={21} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountSecondText,{color:dark?globalStyle.darkTheme.text:'#000'}]}>Change Password</Text>
              </View>
              <Icon name="greater-than" color={dark?"gray":null} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:16}}>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <Icon name="credit-card-outline" size={21} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountSecondText,{color:dark?globalStyle.darkTheme.text:'#000'}]}>Saved Cards & Wallet</Text>
              </View>
              <Icon name="greater-than" color={dark?"gray":null} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:16}}>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <Icon name="map-marker-outline" size={21} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountSecondText,{color:dark?globalStyle.darkTheme.text:'#000'}]}>Saved Addresses</Text>
              </View>
              <Icon name="greater-than" color={dark?"gray":null} size={16} />
            </TouchableOpacity>
          </View>
        </View>
        {/* third component */}
        <View style={{padding:10,borderBottomWidth:1,
borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.16,
shadowRadius: 1.51,
elevation: .5}}>
<Text style={{fontSize:18,color:dark?globalStyle.darkTheme.text:null}}>Account Settings</Text>
          <View style={{justifyContent:'space-around',}}>
            <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:16}}>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <Icon name="file-document-multiple-outline" size={21} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountSecondText,{color:dark?globalStyle.darkTheme.text:null}]}>Terms, Policies and Licenses</Text>
              </View>
              <Icon name="greater-than" color={dark?"gray":null} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:16}}>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <Icon name="progress-question" size={21} color={globalStyle.colors.secondary}/>
            <Text style={[styles.accountSecondText,{color:dark?globalStyle.darkTheme.text:null}]}>Browse FAQs</Text>
              </View>
              <Icon name="greater-than" color={dark?"gray":null} size={16} />
            </TouchableOpacity>
            </View>
</View>
{/* fourth component */}

<TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginVertical:40,marginHorizontal:20,padding:10,borderBottomWidth:1,
borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.16,
shadowRadius: 1.51,
elevation: .5}} onPress={()=>user?logoutHandler():navigation.navigate("Login")}><Text style={{color:dark?globalStyle.darkTheme.text:null}}>{user?"Log Out":"Log In"}</Text></TouchableOpacity>

{user?null:<TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginHorizontal:60,padding:10,backgroundColor:"#d7232399",marginBottom:10,borderBottomWidth:1,
borderBottomColor:dark?globalStyle.darkTheme.border:'#D8D9CF',shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.16,
shadowRadius: 1.51,
elevation: .5}} onPress={()=>navigation.navigate("Register")}><Text style={{color:dark?globalStyle.darkTheme.text:null}}>Register</Text></TouchableOpacity>}
 <AwesomeAlert
          show={alert}
          showProgress={false}
          message="Login First"
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
        </SafeAreaView>
        </ScrollView>
        </View>
</View>
  )
}

export default Account

const styles = StyleSheet.create({
    accHead: {
        backgroundColor: "#fff",
        height: 65,
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.19,
        shadowRadius: 5.62,
        elevation: 6,
      },
      accountFirstComp:{flexDirection:'row',justifyContent:'space-around',alignItems:'center',padding:5,margin:10,width:140,
     borderRadius:8,borderColor:'#D8D9CF',borderWidth:1,
    },
     accountFirstCText:{
      fontFamily:'Roboto_400Regular'
     },
     accountSecondText:{
      fontFamily:'Roboto_400Regular',
      fontSize:16,
      marginHorizontal:12
     }
})