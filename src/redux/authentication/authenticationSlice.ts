import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type Role = {
  role: "USER" | "ADMIN";
};
export type Authentication = {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: Role | null;
};
const initialState: Authentication = {
  isAuthenticated: false,
  accessToken: null,
  role: null,
};
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    ...initialState,
  },
  reducers: {
    authenticate: {
      reducer: (state, action: PayloadAction<Authentication>) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
      },
      prepare: (accessToken: string, role: Role) => {
        return { payload: { accessToken, role, isAuthenticated: true } };
      },
    },
    updateAccessToken: {
      reducer: (
        state,
        action: PayloadAction<Omit<Authentication, "isAuthenticated">>
      ) => {
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
      },
      prepare: (accessToken: string, role: Role) => {
        return { payload: { accessToken, role } };
      },
    },
  },
});
export const authenticationSelector = (state: RootState) =>
  state.authentication;
export const { authenticate, updateAccessToken } = authenticationSlice.actions;
export default authenticationSlice.reducer;