import axios from "axios";
// const api="http://easybazaar.tk/api/v1";
// const api="http://192.168.158.69:4000/api/v1" 
const api="https://easybazaar-api.onrender.com/api/v1"

// Get All Products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 250000], category, ratings=0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_PRODUCT_REQUEST" });

      let link = `${api}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `${api}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: "ALL_PRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ALL_PRODUCT_FAIL",
        payload: error.response.data.message,
      });
    }
  };


// Get All Products For Seller
export const getSellerProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "SELLER_PRODUCT_REQUEST" });

    const { data } = await axios.get(`${api}/seller/products`);

    dispatch({
      type: "SELLER_PRODUCT_SUCCESS",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "SELLER_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_PRODUCT_REQUEST" });

    const { data } = await axios.get(`${api}/admin/products`);

    dispatch({
      type: "ADMIN_PRODUCT_SUCCESS",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "ADMIN_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};


// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_PRODUCT_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${api}/seller/product/new`,
      productData,
      config
    );

    dispatch({
      type: "NEW_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NEW_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Update Product (Seller)
export const updateSellerProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `${api}/seller/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `${api}/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });

    const { data } = await axios.delete(`${api}/admin/product/${id}`);

    dispatch({
      type: "DELETE_PRODUCT_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};


// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

      const { data } = await axios.get(`${api}/product/${id}`);
  
      dispatch({
        type: "PRODUCT_DETAILS_SUCCESS",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCT_DETAILS_FAIL",
        payload: error.response.data.message,
      });
    }
  };
  
  // NEW REVIEW
export const newReview = (rating,comment,productId) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_REVIEW_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`${api}/reviews`, {rating,comment,productId}, config);

    dispatch({
      type: "NEW_REVIEW_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "NEW_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_REVIEW_REQUEST" });

    const { data } = await axios.get(`${api}/reviews?id=${id}`);

    dispatch({
      type: "ALL_REVIEW_SUCCESS",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "ALL_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_REVIEW_REQUEST" });

    const { data } = await axios.delete(
      `${api}/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: "DELETE_REVIEW_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({type:"CLEAR_ERRORS"})
  
  }