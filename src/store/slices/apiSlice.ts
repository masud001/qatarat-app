import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
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
    // Fetch categories
    getCategories: builder.query<
      Array<{ imageUrl: string; id: string; name: string }>,
      void
    >({
      query: () => "categories",
    }),

    // Fetch products (paginated)
    getProducts: builder.query<
      {
        products: Array<{
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
        }>;
        total: number;
      },
      { categoryId?: string; page?: number; pageSize?: number }
    >({
      query: ({ categoryId, page = 1, pageSize = 10 }) => {
        let url = `products?page=${page}&pageSize=${pageSize}`;
        if (categoryId) url += `&categoryId=${categoryId}`;
        return url;
      },
    }),

    // Fetch a single product
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

    // Fetch cart items
    getCart: builder.query<
      Array<{ productId: string; quantity: number }>,
      void
    >({
      query: () => "cart",
      providesTags: ["Cart"],
    }),

    // Add items to the cart
    addToCart: builder.mutation<
      { success: boolean; cart: { productId: string; quantity: number }[] },
      { productId: string; quantity: number }
    >({
      query: (body) => ({
        url: "cart",
        method: "POST",
        body,
      }),
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

// Export hooks for API endpoints
export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartQuery,
  useAddToCartMutation,
} = api;
