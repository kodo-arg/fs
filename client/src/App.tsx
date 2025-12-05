import { router } from "./router";
import { RouterProvider } from "react-router";
import type { ReactNode } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { PerfilProvider } from "./modules/Perfil/context/PerfilContext";
import { EquiposProvider } from "./modules/Perfil/context/EquiposContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return { children };
};

const App = () => {
  return (
    <AuthProvider>
      <PerfilProvider>
        <EquiposProvider>
          <RouterProvider router={router} />
        </EquiposProvider>
      </PerfilProvider>
    </AuthProvider>
  );
};

export default App;
