import { Router } from "express";
import { getEstadisticasPerfilController } from "./estadiscticas.controller";

const router = Router();

router.get("/:idSteam", getEstadisticasPerfilController);

export default router;
