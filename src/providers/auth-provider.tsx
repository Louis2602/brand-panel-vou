import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { axiosInstance } from "@/lib/api";
import { Brand } from "@/types/brand";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  user: Brand | null;
  login: (brandName: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (brandName: string, password: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/brands/login", {
        brandName,
        password,
      });
      const userData = res.data?.data;
      if (userData) {
        setUser(userData);
        localStorage.setItem("auth", JSON.stringify(userData));
      }

      toast.success(res.data?.message);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      toast.error("Login failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/brands", {
        ...data,
        latitude: 123,
        longitude: 123,
      });
      const userData = res.data?.data;
      if (userData) {
        setUser(userData);
        localStorage.setItem("auth", JSON.stringify(userData));
      }
      toast.success(res.data?.message);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Create brand failed:", error.message);
      toast.error("Create brand failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("auth");
      toast.success("Logout successfully");
      router.push("/auth/signin");
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

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
