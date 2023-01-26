import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer({}, {
  ADD_TO_CART_REQUEST:(state,action)=>{
    state.loading=true;
  },
  ADD_TO_CART_SUCCESS:(state,action)=>{
    state.loading=false;
    state.cartItems=action.payload;
  },
  ADD_TO_CART_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
  },
  REMOVE_CART_ITEM_REQUEST:(state)=>{
    state.loading=true;
  },
  REMOVE_CART_ITEM_SUCCESS:(state,action)=>{
    state.loading=true;
    state.cartItems=action.payload
  },
  REMOVE_CART_ITEM_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
  },
  SAVE_SHIPPING_INFO_REQUEST:(state)=>{
    state.loading=true;
  },
  SAVE_SHIPPING_INFO_SUCCESS:(state,action)=>{
    state.loading=true;
    state.shippingInfo=action.payload
  },
  SAVE_SHIPPING_INFO_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
  },
  CLEAR_ERRORS: (state) => {
    state.error = null;
  },    
  });
  