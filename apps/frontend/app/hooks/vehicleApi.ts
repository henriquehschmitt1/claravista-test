import { IVehicle } from "@/app/types/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useVehicleAPI = () => {
  const getVehicles = async (): Promise<IVehicle[]> => {
    const response = await fetch(`${API_URL}/cars`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao carregar veículos");
    }
    return response.json();
  };

  const createVehicle = async (vehicle: IVehicle): Promise<IVehicle> => {
    const response = await fetch(`${API_URL}/car`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar veículo");
    }
    return response.json();
  };

  const updateVehicle = async (vehicle: IVehicle): Promise<IVehicle> => {
    const response = await fetch(`${API_URL}/car/${vehicle._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar veículo");
    }
    return response.json();
  };

  const deleteVehicle = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/car/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao excluir veículo");
    }
  };

  return {
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
};
