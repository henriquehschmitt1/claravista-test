"use client";

import { IVehicle } from "@/app/types/vehicle";

interface Props {
  vehicles: IVehicle[];
  onSelect: (vehicle: IVehicle) => void;
}

export default function VehicleList({ vehicles, onSelect }: Props) {
  return (
    <div className="vehicle-grid">
      {vehicles.map((vehicle, index) => (
        <div
          key={vehicle._id || `temp-${index}`}
          className="vehicle-card"
          onClick={() => onSelect(vehicle)}
        >
          <h3 className="text-xl font-semibold">
            {vehicle.marca} {vehicle.modelo}
          </h3>
          <p className="mt-2">Placa: {vehicle.placa}</p>
          <p>Chassi: {vehicle.chassi}</p>
          <p>Ano: {vehicle.ano}</p>
        </div>
      ))}
    </div>
  );
}
