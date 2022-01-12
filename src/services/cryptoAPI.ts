import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '2935305f61msh1e545eb80a5c604p145095jsn5cc558580dab',
}
const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: ({ query }) => ({
    getCryptos: query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
    getExchanges: query({
      query: ({ coinId, timePeriod }) => createRequest('/exchanges'),
    }),
  }),
})

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery
} = cryptoApi
