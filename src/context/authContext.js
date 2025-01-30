import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useSnackbar } from 'notistack'; 

const AuthContext = createContext();

// Utility function to safely parse JSON
const parseJSON = (data) => {
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack's enqueueSnackbar

  const [user, setUser] = useState(() =>
    parseJSON(localStorage.getItem("user"))
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null
  );
  const [error, setError] = useState(""); // Initialize error state to handle errors

  const clearTokens = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  useEffect(() => {
    if (accessToken && !user) {
      axios
        .post("http://localhost:8000/api/auth/refresh", { token: refreshToken })
        .then((response) => {
          const { user, tokens } = response.data;
          setUser(user);
          setAccessToken(tokens.access.token);
          setRefreshToken(tokens.refresh.token);

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("accessToken", tokens.access.token);
          localStorage.setItem("refreshToken", tokens.refresh.token);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          clearTokens();
        });
    }
  }, [accessToken, user, refreshToken, clearTokens]);

  const saveTokens = (tokens) => {
    setAccessToken(tokens.access.token);
    setRefreshToken(tokens.refresh.token);

    localStorage.setItem("accessToken", tokens.access.token);
    localStorage.setItem("refreshToken", tokens.refresh.token);
  };

  // SignUp API call
  const signUp = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/",
        userData
      );
      const { user, tokens } = response.data;

      setUser(user);
      saveTokens(tokens);

      localStorage.setItem("user", JSON.stringify(user));

      enqueueSnackbar(`Welcome ${user.fullName}! You have successfully signed up.`, { variant: 'success' });

      navigate("/"); // Redirect to dashboard after signup
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed"); // Set error message
      enqueueSnackbar(error.response?.data?.message || "Signup failed", { variant: 'error' });
    }
  };

  // Login API call
  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { user, tokens } = response.data;

      setUser(user);
      saveTokens(tokens);

      localStorage.setItem("user", JSON.stringify(user));

      enqueueSnackbar(`Welcome back ${user.fullName}! You have successfully logged in.`, { variant: 'success' });

      navigate("/"); // Redirect to dashboard after login
    } catch (error) {
      setError(error.response?.data?.message || "Login failed"); // Set error message
      enqueueSnackbar(error.response?.data?.message || "Login failed", { variant: 'error' });
    }
  };

  // Logout API call
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/auth/logout",
        { refreshToken: refreshToken || "" },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      clearTokens();

      enqueueSnackbar("You have successfully logged out!", { variant: 'success' });

      navigate("/user"); // Redirect to sign-in page after logout
    } catch (error) {
      setError(error.response?.data?.message || "Logout failed"); // Set error message
      enqueueSnackbar(error.response?.data?.message || "Logout failed", { variant: 'error' });
    }
  };

  // Forgot Password API call
  const forgotPassword = async (email) => {
    try {
      await axios.post("http://localhost:8000/api/auth/forgot-password", {
        email,
      });

      enqueueSnackbar("Please check your email to reset your password.", { variant: 'success' });
    } catch (error) {
      setError("Failed to send reset email");
      enqueueSnackbar("Failed to send reset email.", { variant: 'error' });
    }
  };

  // Reset Password API call
  const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
      await axios.post(
        "http://localhost:8000/api/auth/reset-password",
        {
          resetPasswordToken,
          newPassword,
        }
      );

      enqueueSnackbar("Your password has been reset successfully.", { variant: 'success' });

      navigate("/signIn"); // Redirect to login after password reset
    } catch (error) {
      setError("Failed to reset password");
      enqueueSnackbar("Failed to reset password.", { variant: 'error' });
    }
  };

  // Get user by ID
  const getUserById = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/auth/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data; // Return the user data directly
    } catch (error) {
      setError("Failed to fetch user data.");
      enqueueSnackbar("Failed to fetch user data.", { variant: 'error' });
    }
  };

  // Update user by ID
  const updateProfile = async (userId, updatedData) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:8000/api/auth/users/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUser(data); // Update the current user with the updated info
      enqueueSnackbar("Your user information has been updated successfully.", { variant: 'success' });
      return data; // Return the updated user data directly
    } catch (error) {
      setError("Failed to update user data.");
      enqueueSnackbar("Failed to update user data.", { variant: 'error' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        signUp,
        login,
        logout,
        forgotPassword,
        resetPassword,
        getUserById,
        updateProfile,
        dispatch, // Provide dispatch for actions like addSignUpBonus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
