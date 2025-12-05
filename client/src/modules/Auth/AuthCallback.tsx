import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

const AuthCallback = () => {
  const { handleAuthCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const processAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        try {
          await handleAuthCallback(token);
          // Redirigir a home después de autenticación exitosa
          navigate("/", { replace: true });
        } catch (error) {
          console.error("Error en callback de autenticación:", error);
          // Redirigir a home en caso de error
          navigate("/", { replace: true });
        }
      } else {
        // No hay token, redirigir a home
        navigate("/", { replace: true });
      }
    };

    processAuthCallback();
  }, [handleAuthCallback, navigate]);

  return <Loading />;
};

export default AuthCallback;
