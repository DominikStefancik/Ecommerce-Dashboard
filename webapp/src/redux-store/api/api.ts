import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_BASE_URL } from '../../constants';
import { USERS, PRODUCTS, CUSTOMERS } from './endpoints';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Products', 'Customers'],
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
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } = api;
