// AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import type { User, AuthContextType } from "@/type/contextType";
import { api } from "@/lib/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data.user);
      setLoading(false);
    } catch (error: unknown) {
      console.error(error);
      setError((error as unknown)?.res?.data?.message || "Failed to get user");
      setLoading(false);
    }
  };

  // console.log(user);
  useEffect(() => {
    fetch();
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};
