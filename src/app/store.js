import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Counter/counterSlice";
import cartrReducer from "../features/Cart/cartSlice";
import userReducer from "../features/Auth/userSlice";

const rootReducer = {
  count: counterReducer,
  user: userReducer,
  cart: cartrReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
