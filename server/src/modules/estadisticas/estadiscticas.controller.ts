import { Request, Response } from "express";
import { getEstadisticasGenerales } from "./estadisticas.service";

export const getEstadisticasPerfilController = async (
  req: Request,
  res: Response
) => {
  try {
    const idSteam = req.params.idSteam;
    // Lógica para obtener las estadísticas generales usando el idSteam
    const estadisticas = await getEstadisticasGenerales(idSteam);
    res.json(estadisticas);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error al obtener las estadísticas generales",
      });
  }
};
