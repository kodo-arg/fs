import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import Estadisticas from "../Estadisticas/Estadisticas";
import Equipos from "../Equipos/Equipos";

const TabsPerfil = () => {
  return (
    <Tabs defaultValue="estadisticas" className="w-full max-w-6xl mx-auto">
      <TabsList className="grid w-full grid-cols-6 my-5 bg-card">
        <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        <TabsTrigger value="partidas">Partidas</TabsTrigger>
        <TabsTrigger value="torneos">Torneos</TabsTrigger>
        <TabsTrigger value="equipo">Equipo</TabsTrigger>
        <TabsTrigger value="amigos">Amigos</TabsTrigger>
        <TabsTrigger value="configuracion">Configuración</TabsTrigger>
      </TabsList>
      <TabsContent value="estadisticas">
        <Estadisticas />
      </TabsContent>
      <TabsContent value="partidas">Contenido de Partidas</TabsContent>
      <TabsContent value="amigos">Contenido de Amigos</TabsContent>
      <TabsContent value="equipo">
        <Equipos />
      </TabsContent>
      <TabsContent value="configuracion">
        Contenido de Configuración
      </TabsContent>
      <TabsContent value="mensajes">Contenido de Mensajes</TabsContent>
    </Tabs>
  );
};

export default TabsPerfil;
