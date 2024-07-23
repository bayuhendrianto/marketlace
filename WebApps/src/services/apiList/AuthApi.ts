import { apiSlice } from "../../store/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    loginTemporary: build.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: `/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email:email,
          password:password,
        },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLoginTemporaryMutation } = authApi;
