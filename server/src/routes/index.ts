import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import equiposRoutes from "../modules/equipos/equipos.route";
import estadisticasRoutes from "../modules/estadisticas/estadisticas.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/estadisticas", estadisticasRoutes);
router.use("/equipos", equiposRoutes);

export default router;
