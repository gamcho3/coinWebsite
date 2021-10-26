# Vitcoin

<br><br>

## 프로젝트 소개

- 가상화폐 현황과 차트, 뉴스를 볼수 있는 웹사이트

## 프로젝트 기간

- 21.10.15 ~ 21.10.25

## 사용된 기술 & 라이브러리

- React
- Redux,Redux-toolkit
- Rapid api
- chart.js
- Ant Design(ui)
- 그외 moment,millify,num-to-korean,uuid 사용

## 프로젝트 구현

1. Open Api

   - coinRaking : 가상화폐의 현황과 가격변동등을 알 수 있습니다.
   - exchangeRate : 달러 기반 데이터를 원화로 바꾸기 위해 사용했습니다.
   - bing news : 실시간으로 기사를 확인할 수 있도록 뉴스검색을 구현했습니다.

2. Redux RTK query로 data Fetch 구현

- redux store

```javascript
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
});
```

- Data Fetch(coinRaking)

```javascript
const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "130cffa3bbmsh7d5ad1d7d41daefp183e2ejsn0e69e9df3cef",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCoin: builder.query({
      query: (id) => createRequest(`/coin/${id}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCoinQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
```

3. 웹사이트 링크

[들어가 보기](https://vitcoin.netlify.app/)
