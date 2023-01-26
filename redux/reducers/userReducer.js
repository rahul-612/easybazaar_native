import { createReducer } from "@reduxjs/toolkit";

export const footerReducer=createReducer({
  footer:true,
},
 { FOOTER_INFO:(state,action)=>{
  state.footer=action.payload;
  }});
  
export const themeReducer=createReducer({
  dark:true,
},
 { THEME_INFO:(state,action)=>{
  state.dark=action.payload;
  }});


export const userReducer = createReducer(
  {},
  {
    LOGIN_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    REGISTER_USER_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    REGISTER_USER_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    LOAD_USER_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    LOAD_USER_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    LOGOUT_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = true;
    },
    LOGOUT_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    LOGOUT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const profileReducer = createReducer(
  {},
  {
    UPDATE_PROFILE_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UPDATE_PROFILE_RESET: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },
    UPDATE_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UPDATE_PASSWORD_RESET: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },
    UPDATE_USER_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UPDATE_USER_RESET: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },
    DELETE_USER_REQUEST: (state, action) => {
      state.loading = true;
    },

    DELETE_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },

    DELETE_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    DELETE_USER_RESET: (state, action) => {
      state.isDeleted = false;
    },

    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const forgotPasswordReducer = createReducer(
  {},
  {
    FORGOT_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    FORGOT_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    FORGOT_PASSWORD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    RESET_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },

    RESET_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },

    RESET_PASSWORD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const allUsersReducer = createReducer(
  {},
  {
    ALL_USER_REQUEST: (state) => {
      state.loading = true;
    },
    ALL_USERS_SUCCESS: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },

    ALL_USERS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const userDetailsReducer = createReducer(
  {},
  {
    USER_DETAILS_REQUEST: (state, action) => {
      state.loading = true;
    },
    USER_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    USER_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);
