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
import Cookies from "js-cookie";

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
        Cookies.set("auth", JSON.stringify(userData), { expires: 7 }); // Set cookie to expire in 7 days
        toast.success("Login successfully");
        router.push("/dashboard/main");
      } else {
        toast.error(res.data?.message);
      }
    } catch (error: any) {
      console.error("Something wrong happened. Cannot login");
      toast.error("Failed to login", {
        description: "Something wrong happened",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/brands", {
        ...data,
      });
      const userData = res.data?.data;
      if (userData) {
        setUser(userData);
        Cookies.set("auth", JSON.stringify(userData), { expires: 7 });
      }
      toast.success("Create brand successfully");
      router.push("/dashboard/main");
    } catch (error: any) {
      console.error(`Failed to create brand: ${error.message}`);
      toast.error(`Failed to create brand:, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      Cookies.remove("auth");
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
    const authData = Cookies.get("auth");
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
