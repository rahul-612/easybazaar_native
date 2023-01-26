import Main from "./src/Main";
import { Provider } from "react-redux";
import store from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useEffect,useState } from "react";
import axios from "axios";
    import {  Provider as PaperProvider } from 'react-native-paper';


export default function App() {

  const [stripeApiKey,setStripeApiKey]=useState("");
  async function getStripeApiKey(){
    try{
    const {data}=await axios.get("https://easybazaar-api.onrender.com/api/v1/stripeapikey");
    
    setStripeApiKey(data.stripeApiKey)
    // console.log(stripeApiKey)
  }catch(e){
    console.log(e)
  }}

  useEffect(() => {
    getStripeApiKey()
  })

  return (
    <StripeProvider
    publishableKey={stripeApiKey} 
  >
    <PaperProvider>
<Provider store={store}>
<Main/> 
</Provider>
</PaperProvider>
</StripeProvider>
  )  
}

{/* <StatusBar backgroundColor="blue"/> */}
  

