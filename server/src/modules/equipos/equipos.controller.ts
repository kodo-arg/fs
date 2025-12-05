import { Request, Response } from "express";
import { EquiposService } from "./equipos.service";

export class EquiposController {
  private equiposService: EquiposService;
  constructor() {
    this.equiposService = new EquiposService();
  }

  obtenerEquiposPorUsuario = async (req: Request, res: Response) => {
    try {
      const usuarioId = parseInt(req.params.usuarioId, 10);
      const equipos = await this.equiposService.obtenerEquiposPorUsuario(
        usuarioId
      );
      res.status(200).json({ success: true, equipos });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los equipos" });
    }
  };

  crearEquipo = async (req: Request, res: Response) => {
    try {
      const { nombre, logoUrl, capitanId } = req.body;
      const nuevoEquipo = await this.equiposService.crearEquipo(
        nombre,
        logoUrl,
        capitanId
      );
      res.status(201).json({ success: true, equipo: nuevoEquipo });
    } catch (error) {
      res.status(500).json({ error: "Error al crear el equipo" });
    }
  };

  actualizarEquipo = async (req: Request, res: Response) => {
    try {
      const equipoId = parseInt(req.params.equipoId, 10);
      const { nombre, logoUrl, estado } = req.body;
      const equipoActualizado = await this.equiposService.actualizarEquipo(
        equipoId,
        nombre
      );
      res.status(200).json(equipoActualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el equipo" });
    }
  };

  eliminarEquipo = async (req: Request, res: Response) => {
    try {
      const equipoId = parseInt(req.params.equipoId, 10);
      await this.equiposService.eliminarEquipo(equipoId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el equipo" });
    }
  };

  agregarMiembroEquipo = async (req: Request, res: Response) => {
    try {
      const equipoId = parseInt(req.params.equipoId, 10);
      const { usuarioId } = req.body;
      await this.equiposService.agregarMiembroEquipo(equipoId, usuarioId);
      res.status(200).json({ message: "Miembro agregado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al agregar el miembro al equipo" });
    }
  };

  eliminarMiembroEquipo = async (req: Request, res: Response) => {
    try {
      const equipoId = parseInt(req.params.equipoId, 10);
      const usuarioId = parseInt(req.params.usuarioId, 10);
      await this.equiposService.eliminarMiembroEquipo(equipoId, usuarioId);
      res.status(200).json({ message: "Miembro eliminado exitosamente" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al eliminar el miembro del equipo" });
    }
  };
}
