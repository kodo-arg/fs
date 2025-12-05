import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEquipos } from "../context/EquiposContext";
import {
  BarChart3,
  Crown,
  Loader,
  Plus,
  Settings,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";

const Equipos = () => {
  const { equipos, crearEquipo, isLoadingCrearEquipo, isLoadingEquipos } =
    useEquipos();

  // if (equipoSeleccionado) {
  //   //return <DetalleEquipo equipo={equipoSeleccionado} onVolver={() => setEquipoSeleccionado(null)} />
  // }
  return (
    <>
      <div className="flex justify-end items-center mb-6 gap-4">
        <Button onClick={() => {}} className="gap-2 bg-muted hover:bg-muted/90">
          <Plus className="w-4 h-4" />
          Unirse a un Equipo
        </Button>
        <Button
          onClick={crearEquipo}
          className="gap-2 bg-secondary hover:bg-secondary/90"
          disabled={isLoadingCrearEquipo}
        >
          {isLoadingCrearEquipo ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Crear Equipo</span>
            </>
          )}
        </Button>
      </div>

      {/* {mostrarCrear && <CrearEquipo onCrear={handleCrearEquipo} onCancelar={() => setMostrarCrear(false)} />} */}

      {isLoadingEquipos ? (
        <Card className="py-36">
          <Loader className="w-8 h-8 mx-auto animate-spin text-muted-foreground" />
        </Card>
      ) : !equipos ? (
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No tienes equipos aún</h3>
          <p className="text-muted-foreground mb-6">
            Crea tu primer equipo o únete a uno existente para empezar a
            competir
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipos.map((equipo: any) => (
            <Card
              key={equipo.id}
              className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex gap-4">
                {/* Logo */}
                <img
                  src={equipo.logoUrl}
                  alt={equipo.nombre}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                {/* Info Principal */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{equipo.nombre}</h3>
                    {equipo.esLider && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                    {/* <div
                      className={`text-xs px-2 py-1 rounded ${
                        equipo.estado === "activo"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {equipo.estado}
                    </div> */}
                  </div>

                  <div className="text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {equipo?.miembros?.length} Miembros
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span>Ranking #{equipo.rango}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4 text-green-500" />
                      <span>
                        {equipo.victorias}W-{equipo.derrotas}L
                      </span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                {equipo.esLider && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-red-500/20"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-destructive/20"
                      onClick={() => {}}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Equipos;
