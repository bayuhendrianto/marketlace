import { apiSlice } from "../../store/apiSlice";

const permissionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllPermissions: build.mutation({
      query: () => ({
        url: `/permissions`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["permission"],
      }),
    }),
  }),
});

export const { useGetAllPermissionsMutation } = permissionApi;
