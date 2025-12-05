import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Swords, Medal, Copy } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TabsPerfil from "./components/TabsPerfil";

const Perfil = () => {
  const { usuario } = useAuth();
  const [modoSeleccionado, setModoSeleccionado] = useState("5v5");

  const listaModos = [{ nombre: "5v5" }, { nombre: "2v2" }, { nombre: "1v1" }];

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto mt-8 px-10 py-8 bg-card">
        <div className="flex gap-10">
          <img
            src={usuario?.avatarUrl ?? "/path/to/avatar.jpg"}
            alt={usuario?.nombre ?? "Usuario"}
            className="w-32 h-32 rounded-full"
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full ">
              <h1 className="text-2xl font-bold">{usuario?.nombre}</h1>
              <div className="flex gap-12 items-center">
                <div className="flex items-center gap-2">
                  <Swords className="inline-block w-4 h-4" />
                  <span>Modo</span>
                  <Select
                    value={modoSeleccionado}
                    onValueChange={(value) => setModoSeleccionado(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Selecciona un modo"} />
                    </SelectTrigger>
                    <SelectContent>
                      {listaModos.map((modo) => (
                        <SelectItem key={modo.nombre} value={modo.nombre}>
                          {modo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Medal className="inline-block w-4 h-4" />
                  <span>Ranking</span>
                  <div className="font-bold bg-secondary px-2 rounded">1</div>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex gap-10">
              <div>
                <h2 className="font-stretch-50% text-gray-500">ID</h2>
                <div className="flex gap-2 items-center">
                  <span className="font-bold">{usuario?.id}</span>
                  <Copy className="inline-block w-4 h-4 cursor-pointer" />
                </div>
              </div>
              <div>
                <h2 className="font-stretch-50% text-gray-500">Se unió el</h2>
                <span className="font-bold">
                  {formatDateTime(usuario?.fechaRegistro!)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <TabsPerfil />
    </>
  );
};

export default Perfil;
