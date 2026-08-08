import {
  createContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  =====================================================
  LOAD LOGGED-IN USER
  =====================================================
  */

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const token = localStorage.getItem("token");

      // -----------------------------------------------
      // NO TOKEN
      // -----------------------------------------------

      if (!token) {
        if (mounted) {
          setUser(null);
          setLoading(false);
        }

        return;
      }

      try {
        // ---------------------------------------------
        // VERIFY TOKEN WITH BACKEND
        // ---------------------------------------------

        const { data } = await api.get("/user/profile");

        if (!mounted) {
          return;
        }

        if (data?.success && data?.user) {
          // -------------------------------------------
          // SAVE VERIFIED USER
          // -------------------------------------------

          setUser(data.user);

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        } else {
          // -------------------------------------------
          // PROFILE RESPONSE INVALID
          // -------------------------------------------

          setUser(null);
        }
      } catch (error) {
        console.error(
          "❌ AUTH LOAD USER ERROR:",
          error
        );

        // ---------------------------------------------
        // INVALID / EXPIRED TOKEN
        // ---------------------------------------------

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          if (mounted) {
            setUser(null);
          }

          return;
        }

        // ---------------------------------------------
        // TEMPORARY SERVER / NETWORK ERROR
        // ---------------------------------------------

        /*
        Do not destroy the token because of:
        - Render cold start
        - Temporary network problem
        - Backend temporarily unavailable
        - 500 error
        */

        const storedUser =
          localStorage.getItem("user");

        if (mounted && storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (parseError) {
            console.error(
              "❌ Unable to parse stored user:",
              parseError
            );

            setUser(null);
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadUser();

    // -----------------------------------------------
    // CLEANUP
    // -----------------------------------------------

    return () => {
      mounted = false;
    };
  }, []);

  /*
  =====================================================
  LOGIN
  =====================================================
  */

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem(
        "token",
        token
      );
    }

    if (userData) {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);
    }
  };

  /*
  =====================================================
  LOGOUT
  =====================================================
  */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  /*
  =====================================================
  CONTEXT VALUE
  =====================================================
  */

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;