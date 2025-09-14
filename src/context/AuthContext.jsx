import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  });

  const [user, setUser] = useState(null);

  // Fetch user data using access token
  const fetchUser = async (accessToken) => {
    try {
      const res = await fetch("http://localhost:8000/api/user/me/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setUser(null); // fallback
    }
  };

  // Login function
  const loginUser = async (tokenData) => {
    setAuthTokens(tokenData);
    localStorage.setItem("authTokens", JSON.stringify(tokenData));
    await fetchUser(tokenData.access); // Fetch user after setting token
  };

  // Logout function
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  useEffect(() => {
    const tryFetchUser = async () => {
      try {
        if (authTokens && !user) {
          await fetchUser(authTokens.access);
        }
      } catch (err) {
        console.error("Invalid or expired token. Logging out.");
        logoutUser();  // Clear invalid tokens
      }
    };
    tryFetchUser();
  }, [authTokens]);
  
  
  return (
    <AuthContext.Provider value={{ authTokens, user, setUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
