import passport from "passport";
import { Router } from "express";
import {
  getTodosUsuarios,
  getUsuarioActual,
  logout,
  validateToken,
  steamCallback,
} from "./auth.controller";
import { authenticateJWT } from "../../middlewares/auth";

const router = Router();

// Rutas públicas
router.get("/", getTodosUsuarios);

// Ruta para obtener el usuario actual (requiere autenticación JWT)
router.get("/me", authenticateJWT, getUsuarioActual);

// Ruta para validar token (requiere autenticación JWT)
router.get("/validate", authenticateJWT, validateToken);

// Ruta para cerrar sesión
router.post("/logout", logout);

// Autenticación con Steam
router.get("/steam", passport.authenticate("steam", { failureRedirect: "/" }));

// Callback de Steam - ahora redirige con JWT
router.get(
  "/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  steamCallback
);

export default router;
