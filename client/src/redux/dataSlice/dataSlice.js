import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const backendurl = import.meta.env.VITE_BACKEND_URL;


export const registerUser = createAsyncThunk(
    "data/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${backendurl}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("Register Error:", data);
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "data/loginUser",
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${backendurl}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("Login Error:", data);
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getUserData = createAsyncThunk(
    "data/getUserData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${backendurl}/api/users/userdata`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const generateImage = createAsyncThunk(
    "data/generateImage",
    async (prompt, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${backendurl}/api/imagegenerate/generateimage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", 
                    body: JSON.stringify(prompt), 
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log("Register Error:", data);
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${backendurl}/api/users/logout`, {
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();
            return data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const payWithRazor = createAsyncThunk(
    "data/payWithRazor",
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${backendurl}/api/users/pay-razor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify(paymentData),
         
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const verifyRazor = createAsyncThunk(
    "data/verifyRazor",
    async (paymentResponse, { rejectWithValue }) => {
        try {
            const response = await fetch(`${backendurl}/api/users/verify-razor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(paymentResponse),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const dataSlice = createSlice({
    name: "data",
    initialState: {
        loading: false,
        user: null,
        credits: 0,
        error: null,
        success: false,
        errormessage: "",
        successmessage: "",
        generatedImage: null,
        imageLoading: false,
        imageError: null,
        paymentLoading: false,
        paymentError: null,
        paymentSuccess: false,
        orderData: null,
        verifyLoading: false,
        verifySuccess: false,
        verifyError: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.credits = 0;
            state.success = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.errormessage = "";
                state.successmessage = "";
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;
                state.credits = action.payload.user?.credits || 0;

                state.success = true;
                state.successmessage =
                    action.payload.message || "Registered successfully";
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errormessage = action.payload || "Registration failed";
            })

            .addCase(getUserData.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUserData.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;
                state.credits = action.payload.user?.credits || 0;
            })

            .addCase(getUserData.rejected, (state) => {
                state.loading = false;
                state.user = null;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.errormessage = "";
                state.successmessage = "";
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;
                state.credits = action.payload.user?.credits || 0;

                state.success = true;
                state.successmessage =
                    action.payload.message || "Login successful";
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errormessage = action.payload || "Login failed";
            })
        
            .addCase(generateImage.pending, (state) => {
                state.imageLoading = true;
                state.imageError = null;
                state.generatedImage = null;
            })

            .addCase(generateImage.fulfilled, (state, action) => {
                state.imageLoading = false;

                state.generatedImage = action.payload.resultImage; 
                state.credits = action.payload.credits;
            })

            .addCase(generateImage.rejected, (state, action) => {
                state.imageLoading = false;
                state.imageError = action.payload || "Image generation failed";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(payWithRazor.pending, (state) => {
                state.paymentLoading = true;
                state.paymentError = null;
                state.paymentSuccess = false;
            })

            .addCase(payWithRazor.fulfilled, (state, action) => {
                state.paymentLoading = false;
                state.paymentSuccess = true;

                state.orderData = action.payload;
                
            })

            .addCase(payWithRazor.rejected, (state, action) => {
                state.paymentLoading = false;
                state.paymentError = action.payload || "Payment failed";
            })
          
            .addCase(verifyRazor.pending, (state) => {
                state.verifyLoading = true;
                state.verifyError = null;
                state.verifySuccess = false;
            })

            .addCase(verifyRazor.fulfilled, (state, action) => {
                state.verifyLoading = false;
                state.verifySuccess = true;

                state.credits = action.payload.credits;
            })

            .addCase(verifyRazor.rejected, (state, action) => {
                state.verifyLoading = false;
                state.verifyError = action.payload || "Verification failed";
            })
    },
});

export const { logout } = dataSlice.actions;
export default dataSlice.reducer;