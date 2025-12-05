import axios from "axios";

export const getEstadisticasGenerales = async (idSteam) => {
  try {
    const response = await axios.get(
      `https://tracker-api.aydenjahola.com/cs2/player/${idSteam}`
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("Error al obtener estadísticas generales:", error);
  }
};
