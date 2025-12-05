import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Outlet } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";

const LayoutTorneo = () => {
  const [selectedFilter, setSelectedFilter] = useState("proximamente");

  const filterOptions = [
    { id: "proximamente", label: "Próximamente" },
    { id: "activa", label: "Activa" },
    { id: "acabadas", label: "Acabadas" },
  ];

  const modos = ["1v1", "2v2", "3v3", "5v5"];

  return (
    <div className="pt-10 flex gap-6">
      <div className="max-w-xs">
        {/* Filtros superiores */}
        <div className="mb-6 space-y-2 bg-card rounded-lg">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                selectedFilter === filter.id
                  ? "border-l-4 border-primary text-white bg-border font-semibold"
                  : "text-gray-500 hover:bg-border hover:text-white font-medium"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sección de Filtros con Accordion */}
        <div className="mb-6 space-y-2 bg-card rounded-lg p-4">
          <h3 className="text-gray-400 text-sm font-medium mb-3">Filtros</h3>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="regions" className="border-none">
              <AccordionTrigger className="px-4 py-3 rounded text-gray-300 hover:no-underline">
                Regions
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 mt-1 rounded">
                <div className="space-y-2 text-gray-400">
                  <div>Contenido de regions</div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="modos" className="border-none">
              <AccordionTrigger className="px-4 py-3 rounded text-gray-300 hover:no-underline">
                Modos
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 mt-1 rounded">
                <div className="space-y-2">
                  {modos.map((modo) => (
                    <label
                      key={modo}
                      className="flex items-center gap-3 text-gray-300 cursor-pointer hover:text-white"
                    >
                      <Checkbox />
                      <span>{modo}</span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Premium */}
          <div className="mt-2 px-4 py-3 rounded">
            <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
              <Checkbox />
              <span>Premium</span>
            </label>
          </div>
        </div>

        {/* Botón Restablecer */}
        <button className="w-full bg-secondary hover:bg-secondary/80 text-white py-3 rounded font-medium transition-colors">
          Restablecer
        </button>
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutTorneo;
