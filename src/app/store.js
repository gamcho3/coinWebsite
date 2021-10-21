import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { exchangeApi } from "../services/exchangeApi";
import { newsApi } from "../services/newsApi";
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
});
