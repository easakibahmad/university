import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";
import { appendErrors } from "react-hook-form";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  const { signal, ...baseQueryArgs } = args;

  // Call baseQuery with the modified arguments
  let result = await baseQuery(baseQueryArgs, api, extraOptions);
  console.log(result);

  if (result?.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      // if refresh token is valid
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(baseQueryArgs, api, extraOptions);
    } else {
      api.dispatch(logout()); // if refresh token expires
    }
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
