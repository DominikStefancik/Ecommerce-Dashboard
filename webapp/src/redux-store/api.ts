import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_BASE_URL } from '../constants';
import { USERS } from '../endpoints';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User'],
  endpoints: (build) => ({
    // this creates a hook called 'useGetUserQuery' which we will be able to use to call the user endpoint
    getUser: build.query<any, string>({
      query: (userId) => `${USERS}/${userId}`,
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery } = api;