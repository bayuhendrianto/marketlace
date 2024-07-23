import { apiSlice } from "../../store/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.mutation({
      query: ({
        page,
        size,
        search,
      }: {
        page: number;
        size: number;
        search: string;
      }) => ({
        url: `/products?page=${page}&size=${size}&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["product"]
      }),
    }),
    getProductById: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/products/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["product"],
      }),
    }),
    createProduct: build.mutation({
      query: (data: any) => ({
        url: "/products/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        invalidatesTags: ["product"],
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/products/update/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        invalidatesTags: ["product"],
      }),
    }),
  }),
});

export const {
  useGetAllProductsMutation,
  useGetProductByIdMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;
