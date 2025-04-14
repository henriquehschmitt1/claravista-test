'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VehicleList from '@/app/components/VehicleList';
import VehicleDetails from '@/app/components/VehicleDetails';
import { IVehicle } from '@/app/types/vehicle';

const initialVehicles: IVehicle[] = [
  {
    _id: '1',
    placa: 'ABC1D23',
    chassi: '9BGVN08JXTM123456',
    renavam: '12345678901',
    modelo: 'Onix',
    marca: 'Chevrolet',
    ano: 2022
  },
  {
    _id: '2',
    placa: 'XYZ9A87',
    chassi: '9BABCD08JXTM654321',
    renavam: '98765432109',
    modelo: 'HB20',
    marca: 'Hyundai',
    ano: 2023
  }
];

export default function Home() {
  const [vehicles, setVehicles] = useState<IVehicle[]>(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleAddNewVehicle = (newVehicle: IVehicle) => {
    const placaExists = vehicles.some(v => v.placa === newVehicle.placa);
    const chassiExists = vehicles.some(v => v.chassi === newVehicle.chassi);
    const renavamExists = vehicles.some(v => v.renavam === newVehicle.renavam);

    if (placaExists) toast.error('Placa já cadastrada!');
    if (chassiExists) toast.error('Chassi já cadastrado!');
    if (renavamExists) toast.error('Renavam já cadastrado!');

    if (!placaExists && !chassiExists && !renavamExists) {
      setVehicles([...vehicles, { ...newVehicle, _id: uuidv4() }]);
      setShowCreateForm(false);
      toast.success('Veículo cadastrado com sucesso!');
    }
  };

  const handleEdit = (updatedVehicle: IVehicle) => {
    setVehicles(vehicles.map(v => v._id === updatedVehicle._id ? updatedVehicle : v));
    setSelectedVehicle(null);
  };

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(v => v._id !== id));
    setSelectedVehicle(null);
    toast.success('Veículo excluído com sucesso!');
  };

  return (
    <main className="container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Veículos</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Novo Veículo
        </button>
      </div>

      <VehicleList vehicles={vehicles} onSelect={setSelectedVehicle} />

      {showCreateForm && (
        <VehicleDetails
          vehicle={{
            _id: 'new',
            placa: '',
            chassi: '',
            renavam: '',
            modelo: '',
            marca: '',
            ano: new Date().getFullYear(),
          }}
          onClose={() => setShowCreateForm(false)}
          onEdit={handleAddNewVehicle}
          onDelete={() => {}}
          isNew
        />
      )}

      {selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </main>
  );
}