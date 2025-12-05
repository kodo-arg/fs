import prisma from "../../config/database";

export class EquiposService {
  constructor() {}

  obtenerEquiposPorUsuario = async (usuarioId: number) => {
    const equipos = await prisma.equipo.findMany({
      where: {
        miembros: {
          some: {
            usuarioId,
          },
        },
      },
      include: {
        miembros: true,
      },
    });
    return equipos;
  };

  crearEquipo = async (nombre: string, logoUrl: string, capitanId: number) => {
    const response = await prisma.$transaction(async (tx) => {
      const nuevoEquipo = await tx.equipo.create({
        data: {
          nombre,
          logoUrl,
          capitanId,
        },
      });
      const nuevoMiembro = await tx.miembroEquipo.create({
        data: {
          equipoId: nuevoEquipo.id,
          usuarioId: capitanId,
        },
      });
      return nuevoEquipo;
    });

    return response;
  };

  actualizarEquipo = async (id: number, nombre: string) => {
    const equipoActualizado = await prisma.equipo.update({
      where: { id },
      data: { nombre },
    });
    return equipoActualizado;
  };

  eliminarEquipo = async (id: number) => {
    await prisma.equipo.delete({
      where: {
        id,
      },
    });
  };

  agregarMiembroEquipo = async (equipoId: number, usuarioId: number) => {
    await prisma.miembroEquipo.create({
      data: {
        equipoId,
        usuarioId,
      },
    });
  };

  eliminarMiembroEquipo = async (equipoId: number, usuarioId: number) => {
    await prisma.miembroEquipo.delete({
      where: {
        equipoId_usuarioId: {
          equipoId,
          usuarioId,
        },
      },
    });
  };
}
