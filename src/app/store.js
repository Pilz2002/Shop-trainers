import cartReducer from "@/Pages/Cart/cartSlice";
import productReducer from "@/Pages/components/Product/productSlice";
import menuReducer from "@/Pages/HomePage/components/ProductSlider/components/Menu/MenuSlice";
import menPageReducer from "@/Pages/MenPage/MenPageSlice";
import loginPageReducer from "@/Pages/LoginPage/loginPageSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";
import pagesReducer from "@/Pages/pagesSlice";
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    menuReducer,
    menPageReducer,
    productReducer,
    cartReducer,
    pagesReducer,
    loginPageReducer,
    rootReducer
  },
  middleware,
});
sagaMiddleware.run(rootSaga);
