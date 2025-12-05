import bannerImage from "@/assets/banner-1v1.png";
import logo1v1 from "@/assets/logo-1v1.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";

const Torneos = () => {
  // Datos de ejemplo para los torneos
  const torneos = [
    {
      id: 1,
      nombre: "SF Torneo 1v1",
      comienza: "Sabado, 29 de Noviembre - 15:00",
      modo: "1v1",
      organizador: "SFULL",
      region: "arg",
      participantes: "22 / 512",
      premio: "$40.000",
      logo: logo1v1,
    },
  ];

  return (
    <div>
      <div className="bg-card w-full p-4 rounded-lg flex items-center justify-between">
        <h1 className="text-2xl font-bold">Torneos</h1>
        <Search className="w-6 h-6 text-primary inline-block ml-2 cursor-pointer" />
      </div>
      <div>
        <img
          src={bannerImage}
          alt="Banner Torneos"
          className="w-full h-auto rounded-lg mt-4 max-h-64 object-cover"
        />
      </div>
      <div className="mt-6 space-y-4">
        {torneos.map((torneo) => (
          <Card
            key={torneo.id}
            className="bg-card hover:bg-muted transition-colors cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={torneo.logo}
                    alt={torneo.nombre}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-xl text-white">
                      {torneo.nombre}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-400">
                      {torneo.organizador}
                    </CardDescription>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-1">Comienza</p>
                  <p className="text-white font-medium">{torneo.comienza}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Modo</p>
                  <p className="text-white font-medium">{torneo.modo}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Regiones</p>
                  <p className="text-white font-medium">{torneo.region}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Participantes</p>
                  <p className="text-white font-medium">
                    {torneo.participantes}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">
                    Fondo de premios
                  </p>
                  <p className="text-green-400 font-bold text-lg">
                    {torneo.premio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Torneos;
