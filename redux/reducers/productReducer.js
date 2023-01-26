import { createReducer } from "@reduxjs/toolkit";

export const productsReducer = createReducer(
  {},
  {
    ALL_PRODUCT_REQUEST: (state) => {
      state.loading = true;
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    ALL_PRODUCT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ADMIN_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
    },
    ADMIN_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },

    ADMIN_PRODUCT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    SELLER_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
    },
    SELLER_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    SELLER_PRODUCT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const newProductReducer = createReducer(
  {},
  {
    NEW_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
    },
    NEW_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    NEW_PRODUCT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    NEW_PRODUCT_RESET: (state, action) => {
      state.success = false;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const productReducer = createReducer(
  {},
  {
    DELETE_PRODUCT_REQUEST: (state) => {
      state.loading = true;
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_PRODUCT_FAIL: (state) => {
      state.loading = true;
    },
    DELETE_PRODUCT_RESET: (state, action) => {
      state.isDeleted = false;
    },
    UPDATE_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_PRODUCT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    UPDATE_PRODUCT_RESET: (state, action) => {
      state.isUpdated = false;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const productDetailsReducer = createReducer(
  {},
  {
    PRODUCT_DETAILS_REQUEST: (state, action) => {
      state.loading = true;
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const newReviewReducer = createReducer(
  {},
  {
    NEW_REVIEW_REQUEST: (state, action) => {
      state.loading = true;
    },
    NEW_REVIEW_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    NEW_REVIEW_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    NEW_REVIEW_RESET: (state, action) => {
      state.success = false;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const productReviewsReducer = createReducer(
  {},
  {
    ALL_REVIEW_REQUEST: (state, action) => {
      state.loading = true;
    },
    ALL_REVIEW_SUCCESS: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    ALL_REVIEW_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);

export const reviewReducer = createReducer(
  {},
  {
    DELETE_REVIEW_REQUEST: (state, action) => {
      state.loading = true;
    },
    DELETE_REVIEW_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_REVIEW_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    DELETE_REVIEW_RESET: (state, action) => {
      state.isDeleted = false;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);
