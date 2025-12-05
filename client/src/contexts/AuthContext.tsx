import api from "@/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Tipos
interface Usuario {
  id: number;
  steamId: string;
  nombre: string;
  avatarUrl: string | null;
  email: string | null;
  fechaRegistro: string;
  roleId: number;
  rol?: {
    id: number;
    nombre: "ADMIN" | "JUGADOR" | "PREMIUM";
  };
}

interface AuthContextType {
  usuario: Usuario | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  handleAuthCallback: (token: string) => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL;

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>();
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = async () => {
    try {
      const response = await api.get("/auth/validate");
      if (response.data.success) {
        const userData = response.data.data;
        setUsuario(userData);
      }
    } catch (error) {
      // Token inválido, limpiar
      localStorage.removeItem("authToken");
      setUsuario(null);
    }
  };

  // Función para manejar el callback de autenticación
  const handleAuthCallback = async (token: string) => {
    localStorage.setItem("authToken", token);
    // Validar token y obtener datos del usuario
    await validateToken();
  };

  // Función para iniciar sesión con Steam
  const login = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };

  // Función para cerrar sesión
  const logout = async () => {
    localStorage.removeItem("authToken");
    setUsuario(null);
  };

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        await validateToken();
      } else if (token) {
        // Tenemos token pero no usuario en cache
        await validateToken();
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const value: AuthContextType = {
    usuario,
    isAuthenticated: !!usuario,
    isLoading,
    login,
    logout,
    handleAuthCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
