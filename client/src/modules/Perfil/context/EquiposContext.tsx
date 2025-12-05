import api from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// Tipos
interface Miembros {
  usuarioId: number;
  equipoId: number;
  fechaIngreso: string;
}

interface Equipo {
  id: number;
  nombre: string;
  logoUrl: string;
  captainId: number;
  miembros?: Miembros[];
}

interface EquiposContextType {
  equipos: Equipo[];
  isLoadingEquipos: boolean;
  crearEquipo: () => Promise<void>;
  isLoadingCrearEquipo: boolean;
}

const EquiposContext = createContext<EquiposContextType | null>(null);

export const EquiposProvider = ({ children }: { children: ReactNode }) => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [isLoadingEquipos, setIsLoadingEquipos] = useState(false);
  const [isLoadingCrearEquipo, setIsLoadingCrearEquipo] = useState(false);
  const hasFetchedRef = useRef(false);
  const { usuario } = useAuth();

  useEffect(() => {
    const fetchEquipos = async () => {
      if (!usuario || hasFetchedRef.current) return;

      hasFetchedRef.current = true;
      setIsLoadingEquipos(true);

      try {
        const { data } = await api.get(`/equipos/${usuario.id}`);
        if (data.success) {
          setEquipos(data.equipos);
        }
      } catch (error) {
        console.error("Error fetching equipos data:", error);
        hasFetchedRef.current = false;
      } finally {
        setIsLoadingEquipos(false);
      }
    };

    fetchEquipos();
  }, [usuario]);

  const crearEquipo = async () => {
    try {
      setIsLoadingCrearEquipo(true);
      const equipo = {
        nombre: `Equipo de ${usuario?.nombre}`,
        logoUrl: usuario?.avatarUrl,
        capitanId: usuario?.id,
      };
      const { data } = await api.post("/equipos", equipo);
      if (data.success) {
        setEquipos((prevEquipos) => [...prevEquipos, data.equipo]);
      }
    } catch (error) {
      console.error("Error creating equipo:", error);
    } finally {
      setIsLoadingCrearEquipo(false);
    }
  };

  const value: EquiposContextType = {
    equipos,
    isLoadingEquipos,
    isLoadingCrearEquipo,
    crearEquipo,
  };

  return (
    <EquiposContext.Provider value={value}>{children}</EquiposContext.Provider>
  );
};

export const useEquipos = () => {
  const context = useContext(EquiposContext);
  if (!context) {
    throw new Error("useEquipos must be used within an EquiposProvider");
  }
  return context;
};
