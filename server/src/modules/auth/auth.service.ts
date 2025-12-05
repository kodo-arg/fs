import prisma from "../../config/database";

export const buscarOCrearUsuarioPorSteam = async (
  steamId: string,
  data: { username: string; avatar_url?: string; email?: string }
) => {
  let usuario = await prisma.usuario.findUnique({
    where: { steamId },
  });

  if (!usuario) {
    usuario = await prisma.usuario.create({
      data: {
        steamId,
        nombre: data.username,
        avatarUrl: data.avatar_url || null,
        email: data.email || null,
        roleId: 2, // Asignar rol por defecto (JUGADOR)
      },
    });
  }

  return usuario;
};
