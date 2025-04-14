'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { IVehicle } from '@/app/types/vehicle';
import { z } from 'zod';
import { toast } from 'react-toastify';

const vehicleSchema = z.object({
  placa: z.string()
    .regex(/^[A-Z]{3}[-]?[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida (AAA9A99 ou AAA-9999)'),
  chassi: z.string()
    .length(17, 'Chassi deve ter 17 caracteres')
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'Chassi inválido'),
  renavam: z.string()
    .length(11, 'Renavam deve ter 11 dígitos')
    .regex(/^\d+$/, 'Apenas números permitidos'),
  modelo: z.string()
    .max(64, 'Máximo 64 caracteres')
    .min(1, 'Modelo é obrigatório'),
  marca: z.string()
    .max(64, 'Máximo 64 caracteres')
    .min(1, 'Marca é obrigatória'),
  ano: z.number()
    .min(1900, 'Ano mínimo: 1900')
    .max(new Date().getFullYear() + 1, 'Ano futuro inválido')
});

interface Props {
  initialData: IVehicle;
  onSubmit: (data: IVehicle) => void;
  onCancel: () => void;
  isNew?: boolean;
}

export default function VehicleForm({ initialData, onSubmit, onCancel, isNew }: Props) {
  const [formData, setFormData] = useState<IVehicle>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ano' ? Number(value) : value.toUpperCase()
    }));
  };

  const validateForm = () => {
    try {
      vehicleSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(newErrors);
        Object.values(newErrors).forEach(msg => toast.error(msg));
      }
      return false;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Placa */}
      <div className="form-group">
        <label>Placa *</label>
        <input
          name="placa"
          value={formData.placa}
          onChange={handleChange}
          className="form-input"
          placeholder="AAA1A11 ou AAA-1111"
        />
        {errors.placa && <p className="error-message">{errors.placa}</p>}
      </div>

      {/* Chassi */}
      <div className="form-group">
        <label>Chassi *</label>
        <input
          name="chassi"
          value={formData.chassi}
          onChange={handleChange}
          className="form-input"
          maxLength={17}
        />
        {errors.chassi && <p className="error-message">{errors.chassi}</p>}
      </div>

      {/* Renavam */}
      <div className="form-group">
        <label>Renavam *</label>
        <input
          name="renavam"
          value={formData.renavam}
          onChange={handleChange}
          className="form-input"
          maxLength={11}
        />
        {errors.renavam && <p className="error-message">{errors.renavam}</p>}
      </div>

      {/* Marca */}
      <div className="form-group">
        <label>Marca *</label>
        <input
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          className="form-input"
          maxLength={64}
        />
        {errors.marca && <p className="error-message">{errors.marca}</p>}
      </div>

      {/* Modelo */}
      <div className="form-group">
        <label>Modelo *</label>
        <input
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          className="form-input"
          maxLength={64}
        />
        {errors.modelo && <p className="error-message">{errors.modelo}</p>}
      </div>

      {/* Ano */}
      <div className="form-group">
        <label>Ano *</label>
        <input
          type="number"
          name="ano"
          value={formData.ano}
          onChange={handleChange}
          className="form-input"
          min="1900"
          max={new Date().getFullYear() + 1}
        />
        {errors.ano && <p className="error-message">{errors.ano}</p>}
      </div>

      <div className="button-group">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isNew ? 'Cadastrar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}