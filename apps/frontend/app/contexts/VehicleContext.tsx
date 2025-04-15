"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { IVehicle } from "@/app/types/vehicle";
import { useVehicleAPI } from "@/app/hooks/vehicleApi";
import { toast } from "react-toastify";

type VehicleContextType = {
  vehicles: IVehicle[];
  selectedVehicle: IVehicle | null;
  showCreateForm: boolean;
  loading: boolean;
  setSelectedVehicle: (vehicle: IVehicle | null) => void;
  setShowCreateForm: (show: boolean) => void;
  handleAddNewVehicle: (vehicle: IVehicle) => Promise<void>;
  handleEditVehicle: (vehicle: IVehicle) => Promise<void>;
  handleDeleteVehicle: (id: string) => Promise<void>;
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const { getVehicles, createVehicle, updateVehicle, deleteVehicle } =
    useVehicleAPI();

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        toast.error("Erro ao carregar veículos");
      } finally {
        setLoading(false);
      }
    };
    loadVehicles();
  }, []);

  const handleAddNewVehicle = async (newVehicle: IVehicle) => {
    try {
      await createVehicle(newVehicle);
      const updatedList = await getVehicles();
      setVehicles(updatedList);
      setShowCreateForm(false);
      toast.success("Veículo cadastrado com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEditVehicle = async (updatedVehicle: IVehicle) => {
    try {
      await updateVehicle(updatedVehicle);
      const updatedList = await getVehicles();
      setVehicles(updatedList);
      setSelectedVehicle(null);
      toast.success("Veículo atualizado com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    try {
      await deleteVehicle(id);
      const updatedList = await getVehicles();
      setVehicles(updatedList);
      setSelectedVehicle(null);
      toast.success("Veículo excluído com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        selectedVehicle,
        showCreateForm,
        loading,
        setSelectedVehicle,
        setShowCreateForm,
        handleAddNewVehicle,
        handleEditVehicle,
        handleDeleteVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicleContext must be used within a VehicleProvider");
  }
  return context;
};
