import axios from "axios";

// const api="http://easybazaar.tk/api/v1"
// const api="http://192.168.158.69:4000/api/v1"    //ipv4 using ipconfig command in cmd
const api="https://easybazaar-api.onrender.com/api/v1"

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${api}/login`,
      { email, password },
      config
    );

    dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_USER_REQUEST" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`${api}/register`, userData, config);
    console.log('register success')

    dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user });
  } catch (error) {
    // console.log("error action")
    console.log(error.response.data.message)
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};
// Register Mobile
export const registerMobile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_USER_REQUEST" });
    // console.log(userData)
    // console.log('hey')
    const { data } = await axios.post(`${api}/registerMobile`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('register success')

    dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user });
  } catch (error) {
    console.log(error)
    // console.log(error.response.data.message)
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: error  ,
    });
  }
};


// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });

    const { data } = await axios.get(`${api}/me`);

    dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
  } catch (error) {
    console.log("error load")
    console.log(error)
    dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.message });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch({type:"LOGOUT_REQUEST"})
    await axios.get(`${api}/logout`);

    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
  }
};

// Update Profile
export const update = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });
    const config = { headers: { "Content-Type": "multipart/form-data" } }
    const { data } = await axios.put(`${api}/me/updateProfileMobile`, userData, config);
    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error,
    });
  }
};

// Update Password
export const updatePassword = (oldPassword,newPassword,confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${api}/password/update`,
      {oldPassword,newPassword,confirmPassword},
      config
    );
    
    dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: data.success });
  } catch (error) {
   
    dispatch({
      type: "UPDATE_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "FORGOT_PASSWORD_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${api}/password/forgot`, {email}, config);
    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data.message });
  } catch (error) {
    dispatch({
      type: "FORGOT_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_PASSWORD_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${api}/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "RESET_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_USERS_REQUEST" });
    const { data } = await axios.get(`${api}/admin/users`);

    dispatch({ type: "ALL_USERS_SUCCESS", payload: data.users });
  } catch (error) {
    dispatch({ type: "ALL_USERS_FAIL", payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "USER_DETAILS_REQUEST" });
    const { data } = await axios.get(`${api}/admin/user/${id}`);

    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "USER_DETAILS_FAIL", payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${api}/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: "UPDATE_USER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });

    const { data } = await axios.delete(`${api}/admin/user/${id}`);

    dispatch({ type: "DELETE_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
