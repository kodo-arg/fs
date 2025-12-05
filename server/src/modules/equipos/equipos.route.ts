import { Router } from "express";
import { EquiposController } from "./equipos.controller";

const equiposController = new EquiposController();

const router = Router();

router.get("/:usuarioId", equiposController.obtenerEquiposPorUsuario);
router.post("/", equiposController.crearEquipo);
router.put("/:equipoId", equiposController.actualizarEquipo);
router.delete("/:equipoId", equiposController.eliminarEquipo);

// miebros del equipo
router.post("/:equipoId/miembros", equiposController.agregarMiembroEquipo);
router.delete(
  "/:equipoId/miembros/:usuarioId",
  equiposController.eliminarMiembroEquipo
);

export default router;
