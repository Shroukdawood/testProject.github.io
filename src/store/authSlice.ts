import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	token: string | null;
	username: string | null;
	password?: string | null;
	role?: string | null;
}

const initialState: AuthState = {
	token: localStorage.getItem("token"),
 	username: localStorage.getItem("username"),
 	password: localStorage.getItem("password"),
 	role: localStorage.getItem("role"),
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setSession: (state, action: PayloadAction<AuthState>) => {
			state.token = action.payload.token;
			state.username = action.payload.username;
			state.password = action.payload.password;
			state.role = action.payload.role ?? null;
			localStorage.setItem("token", action.payload.token ?? "");
			localStorage.setItem("username", action.payload.username ?? "");
			localStorage.setItem("role", action.payload.role ?? "");
			if (action.payload.password)
				localStorage.setItem("password", action.payload.password);
		},
		clearSession: (state) => {
			state.token = null;
			state.username = null;
			localStorage.clear();
		},
	},
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
