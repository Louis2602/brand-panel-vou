import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { axiosInstance } from "@/lib/api";
import { User } from "@/types/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  user: User | null;
  login: (brandName: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (brandName: string, password: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/brands", {
        brandName,
        password,
      });
      const userData = res.data.user;
      if (userData) {
        setUser(userData);
        localStorage.setItem("auth", JSON.stringify(userData));
      }

      toast.success("Login successfully");

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error.response.data);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    console.log(data);
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("auth");

      await axiosInstance.get("/logout");
      toast.success("Logout successfully");
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Logout failed:", error.response.data);
      toast.error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      setUser(JSON.parse(authData));
    }
  }, []);

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
