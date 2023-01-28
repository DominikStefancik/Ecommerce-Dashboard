import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_BASE_URL } from '../../constants';
import {
  USERS,
  PRODUCTS,
  CUSTOMERS,
  TRANSACTIONS,
  GEOGRAPHY,
  STATISTICS,
  ADMINS,
  USERS_PERFORMANCE,
  DASHBOARD_STATISTICS,
} from './endpoints';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'Transactions',
    'GeographyUsers',
    'OverallStatistics',
    'Admins',
    'UserPerformance',
    'DashboardStatistics',
  ],
  endpoints: (build) => ({
    // this creates a hook called 'useGetUserQuery' which we will be able to use to call the user endpoint
    getUser: build.query<any, string>({
      query: (userId) => `${USERS}/${userId}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      // 'void' as QueryArg has to be provided for a function with no parameters
      query: (_: void) => PRODUCTS,
      providesTags: ['Products'],
    }),
    getCustomers: build.query({
      query: (_: void) => CUSTOMERS,
      providesTags: ['Customers'],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => {
        return {
          url: TRANSACTIONS,
          method: 'GET',
          params: { page, pageSize, sort, search },
        };
      },
      providesTags: ['Transactions'],
    }),
    getGeographyUsers: build.query({
      query: (_: void) => `${GEOGRAPHY}/users`,
      providesTags: ['GeographyUsers'],
    }),
    getOverallStatistics: build.query({
      query: (_: void) => `${STATISTICS}/overall`,
      providesTags: ['OverallStatistics'],
    }),
    getAdmins: build.query({
      query: (_: void) => ADMINS,
      providesTags: ['Admins'],
    }),
    getUserPerformance: build.query({
      query: (userId) => `${USERS_PERFORMANCE}/${userId}`,
      providesTags: ['UserPerformance'],
    }),
    getDashboardStatistics: build.query({
      query: (year) => {
        return {
          url: DASHBOARD_STATISTICS,
          method: 'GET',
          params: { year },
        };
      },
      providesTags: ['DashboardStatistics'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyUsersQuery,
  useGetOverallStatisticsQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardStatisticsQuery,
} = api;
