import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    validateStatus: (response, body) => {
      console.log("API Response:", { status: response.status, body });
      return response.status < 400;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCategories: builder.query<
      Array<{
        imageUrl: string;
        id: string;
        name: string;
      }>,
      void
    >({
      query: () => "categories",
    }),
    getProducts: builder.query<
      Array<{
        id: string;
        name: string;
        price: number;
        image: string;
        images: string[];
        categoryId: string;
        size: string;
        quantity: string;
        description: string;
        keyFeatures: string[];
      }>,
      { categoryId?: string }
    >({
      query: ({ categoryId }) =>
        categoryId ? `products?categoryId=${categoryId}` : "products",
    }),
    getProduct: builder.query<
      {
        id: string;
        name: string;
        price: number;
        image: string;
        images: string[];
        categoryId: string;
        size: string;
        quantity: string;
        description: string;
        keyFeatures: string[];
      },
      string
    >({
      query: (id) => `products/${id}`,
    }),
    getCart: builder.query<
      Array<{ productId: string; quantity: number }>,
      void
    >({
      query: () => "cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<
      { success: boolean; cart: { productId: string; quantity: number }[] },
      { productId: string; quantity: number }
    >({
      query: (body) => {
        console.log("Making addToCart request:", body);
        return {
          url: "cart",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Cart"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Add to cart successful:", data);
        } catch (error) {
          console.error("Add to cart failed:", error);
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartQuery,
  useAddToCartMutation,
} = api;
