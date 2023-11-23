import apiSlice from "./api/apiSlice";
import {
  INITIATE_BUY,
  PAYMENT_MADE,
  PAYMENT_RECIEVED,
  TRANSACTION_FAILED,
  TRANSACTION_SUCCESS,
  RETIRE_CARBON_CREDIT,
  GET_BUY_ITEMS,
  GET_SELL_ITEMS,
  SET_BUY_ORDER,
  GET_MY_TRANSACTIONS,
  GET_ALL_TRANSACTIONS,
  INITIATE_SELL,
  GET_ORG_ADMIN,
  GET_CHART_DATA,
  GET_OTP,
  VERIFY_OTP,
  GET_MY_STATEMENT,
  GET_ALL_STATEMENT,
  ORGANIZATION_NAME,
} from "./constants";

const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all transactions
    allTransactions: builder.query({
      providesTags: ["Transaction"],
      query: ({ page = 1, type }) => ({
        url: `${GET_ALL_TRANSACTIONS}?page=${page}&type=${type}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get my transaction
    getMyTransaction: builder.query({
      providesTags: ["Transaction"],
      query: ({ page, type, status }) => ({
        url: `${GET_MY_TRANSACTIONS}?${
          page && `page=${page}`
        }&type=${type}&status=${status}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get sell items
    getSellItems: builder.query({
      providesTags: ["Transaction"],
      query: () => ({
        url: GET_SELL_ITEMS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get buy items
    getBuyItems: builder.query({
      providesTags: ["Transaction"],
      query: () => ({
        url: GET_BUY_ITEMS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get organisation admin id
    getOrgAdmin: builder.query({
      // providesTags: ["Transaction"],
      query: ({ id }) => ({
        url: `${GET_ORG_ADMIN}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get organisation admin id
    getChartData: builder.query({
      providesTags: ["Transaction"],
      query: () => ({
        url: `${GET_CHART_DATA}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get otp
    sendOtp: builder.mutation({
      query: () => ({
        url: `${GET_OTP}`,
        method: "POST",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // verify otp
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${VERIFY_OTP}`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // initiate buy
    initiateBuy: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: INITIATE_BUY,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // initiate sell
    initiateSell: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: INITIATE_SELL,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // set buy order
    setBuyOrder: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: SET_BUY_ORDER,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // payment made
    paymentMade: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: PAYMENT_MADE,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // payment recieved
    paymentRecieved: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: PAYMENT_RECIEVED,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // transaction failed
    transactionFailed: builder.mutation({
      invalidatesTags: ["Transaction"],
      query: (data) => ({
        url: TRANSACTION_FAILED,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // transaction success
    transactionSuccess: builder.mutation({
      invalidatesTags: ["Transaction", "User"],
      query: (data) => ({
        url: TRANSACTION_SUCCESS,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // retire carbon credit
    retireCarbonCredit: builder.mutation({
      invalidatesTags: ["Transaction", "User"],
      query: (data) => ({
        url: RETIRE_CARBON_CREDIT,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get my statement
    getMyStatement: builder.mutation({
      query: (data) => ({
        url: `${GET_MY_STATEMENT}`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get my statement
    getAllStatement: builder.mutation({
      query: (data) => ({
        url: `${GET_ALL_STATEMENT}`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get organisation super admin name
    getSuperAdmin: builder.query({
      providesTags: ["Transaction"],
      query: () => ({
        url: `${ORGANIZATION_NAME}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useAllTransactionsQuery,
  useGetBuyItemsQuery,
  useGetMyTransactionQuery,
  useGetSellItemsQuery,
  useGetOrgAdminQuery,
  useGetChartDataQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useInitiateBuyMutation,
  useInitiateSellMutation,
  usePaymentMadeMutation,
  usePaymentRecievedMutation,
  useRetireCarbonCreditMutation,
  useSetBuyOrderMutation,
  useTransactionFailedMutation,
  useTransactionSuccessMutation,
  useGetMyStatementMutation,
  useGetAllStatementMutation,
  useGetSuperAdminQuery,
} = transactionApiSlice;
