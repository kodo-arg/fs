import { Request, Response } from "express";
import prisma from "../../config/database";
import jwt from "jsonwebtoken";

export const getTodosUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        rol: true,
      },
    });
    res.json({ success: true, data: usuarios });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener usuarios", error });
  }
};

export const getUsuarioActual = async (req: Request, res: Response) => {
  try {
    // El usuario ya fue verificado por el middleware authenticateJWT
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "No autenticado",
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: (req.user as any).id },
      include: {
        rol: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({ success: true, data: usuario });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener usuario",
      error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).json({
        success: false,
        message: "Error al cerrar sesión",
        error: err,
      });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir sesión:", err);
      }
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Sesión cerrada correctamente" });
    });
  });
};

export const steamCallback = async (req: Request, res: Response) => {
  const user = req.user as any;

  // Generar JWT
  const token = jwt.sign(
    {
      id: user.id,
      steamId: user.steamId,
      roleId: user.roleId,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // Redirigir al frontend con el token
  const frontendUrl = process.env.FRONTEND_URL;
  res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
};

export const validateToken = async (req: Request, res: Response) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: (req.user as any).id },
    include: { rol: true },
  });
  res.json({ success: true, data: usuario });
};
