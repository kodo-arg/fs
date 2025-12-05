import { Card } from "@/components/ui/card";

const Estadisticas = () => {
  return (
    <div className="flex gap-4">
      <Card className="flex-[0.5] px-4">
        <div>
          <div>Partidas Jugadas: 150</div>
          <div>Victorias: 85</div>
          <div>Derrotas: 65</div>
          <div>Tasa de Victoria: 56.7%</div>
          <div>Puntuación Más Alta: 2500</div>
          <div>Tiempo Total Jugado: 120 horas</div>
        </div>
      </Card>
      <Card className="flex-1 px-4">
        <div>
          <div>Partidas Jugadas: 150</div>
          <div>Victorias: 85</div>
          <div>Derrotas: 65</div>
          <div>Tasa de Victoria: 56.7%</div>
          <div>Puntuación Más Alta: 2500</div>
          <div>Tiempo Total Jugado: 120 horas</div>
        </div>
      </Card>
    </div>
  );
};

export default Estadisticas;
