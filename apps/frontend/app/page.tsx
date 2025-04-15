"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleList from "@/app/components/VehicleList";
import VehicleDetails from "@/app/components/VehicleDetails";
import { IVehicle } from "@/app/types/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Home() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${API_URL}/cars`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      toast.error("Erro ao carregar veículos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddNewVehicle = async (newVehicle: IVehicle) => {
    try {
      const response = await fetch(`${API_URL}/car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const createdVehicle = await response.json();
      await fetchVehicles();
      setShowCreateForm(false);
      toast.success("Veículo cadastrado com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = async (updatedVehicle: IVehicle) => {
    try {
      const response = await fetch(`${API_URL}/car/${updatedVehicle._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVehicle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedData = await response.json();
      await fetchVehicles();
      setSelectedVehicle(null);
      toast.success("Veículo atualizado com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/car/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      await fetchVehicles();
      setSelectedVehicle(null);
      toast.success("Veículo excluído com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </main>
  );
}
