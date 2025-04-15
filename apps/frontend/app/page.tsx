"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleList from "@/app/components/VehicleList";
import VehicleDetails from "@/app/components/VehicleDetails";
import { useVehicleContext } from "@/app/contexts/VehicleContext";

export default function Home() {
  const {
    vehicles,
    selectedVehicle,
    showCreateForm,
    loading,
    setSelectedVehicle,
    setShowCreateForm,
    handleAddNewVehicle,
    handleEditVehicle,
    handleDeleteVehicle,
  } = useVehicleContext();

  if (loading) {
    return (
      <div className="container text-center py-8">
        <p>Carregando veículos...</p>
      </div>
    );
  }

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
            placa: "",
            chassi: "",
            renavam: "",
            modelo: "",
            marca: "",
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
          onEdit={handleEditVehicle}
          onDelete={handleDeleteVehicle}
        />
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </main>
  );
}
