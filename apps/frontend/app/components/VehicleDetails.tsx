'use client';

import { useState } from 'react';
import { IVehicle } from '@/app/types/vehicle';
import VehicleForm from './VehicleForm';

interface Props {
  vehicle: IVehicle;
  onClose: () => void;
  onEdit: (vehicle: IVehicle) => void;
  onDelete: (id: string) => void;
  isNew?: boolean;
}

export default function VehicleDetails({ vehicle, onClose, onEdit, onDelete, isNew }: Props) {
  const [isEditing, setIsEditing] = useState(!!isNew);

  const handleSubmit = (formData: IVehicle) => {
    onEdit(formData);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isEditing ? (
          <VehicleForm
            initialData={vehicle}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isNew={isNew}
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {isNew ? 'Novo Veículo' : 'Detalhes do Veículo'}
            </h2>
            
            <div className="space-y-2">
              <p><strong>Placa:</strong> {vehicle.placa}</p>
              <p><strong>Chassi:</strong> {vehicle.chassi}</p>
              <p><strong>Renavam:</strong> {vehicle.renavam}</p>
              <p><strong>Marca:</strong> {vehicle.marca}</p>
              <p><strong>Modelo:</strong> {vehicle.modelo}</p>
              <p><strong>Ano:</strong> {vehicle.ano}</p>
            </div>

            <div className="button-group mt-6">
              {!isNew && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => vehicle._id && onDelete(vehicle._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Fechar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}