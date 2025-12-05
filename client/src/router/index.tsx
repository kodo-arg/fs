import Header from "@/components/layouts/Header";
import Home from "@/modules/Home/Home";
import Perfil from "@/modules/Perfil/Perfil";
import LayoutTorneo from "@/modules/Torneos/components/LayoutTorneo";
import Torneos from "@/modules/Torneos/Torneos";
import AuthCallback from "@/modules/Auth/AuthCallback";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/torneos",
        element: <LayoutTorneo />,
        children: [
          {
            index: true,
            element: <Torneos />,
          },
        ],
      },
      {
        path: "/:id/perfil",
        element: <Perfil />,
      },
    ],
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
]);
