# Vitcoin

<br><br>

## 프로젝트 소개

- 가상화폐 현황과 차트, 뉴스를 볼수 있는 웹사이트

## 프로젝트 기간

- 21.10.15 ~ 21.10.25

## 사용된 기술 & 라이브러리

- React
- Redux,Redux-toolkit
- Rapid api + axios
- chart.js
- Ant Design(ui)
- 그외 moment,millify,num-to-korean,uuid 사용

## 프로젝트 구현

1. Redux RTK query로 data Fetch 구현

-redux store

```javascript
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
});
```
