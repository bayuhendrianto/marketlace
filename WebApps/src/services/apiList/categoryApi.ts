import { apiSlice } from "../../store/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.mutation({
      query: ({
        page,
        size,
        search,
      }: {
        page: number;
        size: number;
        search: string;
      }) => ({
        url: `/categories?page=${page}&size=${size}&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["category"],
      }),
    }),
    getCategoryOption: build.mutation({
      query: () => ({
        url: `/categories/option`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["category"],
      }),
    }),
    getCategoryById: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/categories/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["category"],
      }),
    }),
    createCategory: build.mutation({
      query: (data: any) => ({
        url: "/categories/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        invalidatesTags: ["category"],
      }),
    }),
    updateCategory: build.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/categories/update/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        invalidatesTags: ["category"],
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesMutation,
  useGetCategoryOptionMutation,
  useGetCategoryByIdMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
