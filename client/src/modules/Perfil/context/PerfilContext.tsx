import api from "@/api";
import { createContext, useContext, useState, type ReactNode } from "react";

// Tipos
interface PerfilContextType {
  perfilData: any;
  isLoading: boolean;
  getPerfilData: (id: string) => Promise<void>;
}

const PerfilContext = createContext<PerfilContextType | null>(null);

export const PerfilProvider = ({ children }: { children: ReactNode }) => {
  const [perfilData, setPerfilData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPerfilData = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/estadisticas/${id}`);
      if (response.data.success) {
        setPerfilData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching perfil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: PerfilContextType = { perfilData, isLoading, getPerfilData };

  return (
    <PerfilContext.Provider value={value}>{children}</PerfilContext.Provider>
  );
};

export const usePerfil = () => {
  const context = useContext(PerfilContext);
  if (!context) {
    throw new Error("usePerfil must be used within a PerfilProvider");
  }
  return context;
};
