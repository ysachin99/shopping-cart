import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./helper";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}`}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "products"
        }),
    }),
});

export const {useGetAllProductsQuery} = productsApi