import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const exchangeApiheaders = {
  "x-rapidapi-host": "exchangerate-api.p.rapidapi.com",
  "x-rapidapi-key": "130cffa3bbmsh7d5ad1d7d41daefp183e2ejsn0e69e9df3cef",
};

const baseUrl = "https://exchangerate-api.p.rapidapi.com/rapid/latest";

const createRequest = (url) => ({
  url,
  headers: exchangeApiheaders,
});

export const exchangeApi = createApi({
  reducerPath: "exchangeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchange: builder.query({
      query: () => createRequest("/USD"),
    }),
  }),
});

export const { useGetExchangeQuery } = exchangeApi;
