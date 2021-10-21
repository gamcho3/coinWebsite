import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiheaders = {
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "130cffa3bbmsh7d5ad1d7d41daefp183e2ejsn0e69e9df3cef",
  "accept-language": "ko-KR",
  "x-bingapis-sdk": "true",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: newsApiheaders });

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getNews: build.query({
      query: ({ topic, count, sort }) =>
        createRequest(
          `/news/search?q=${topic}&freshness=Day&textformat=Raw&safeSearch=Off&sortBy=${sort}&count=${count}`
        ),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
