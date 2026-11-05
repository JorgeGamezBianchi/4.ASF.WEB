// ====================================================================================
// ISLA DE REACT: src/components/islands/SoporteForm.jsx
// ====================================================================================
// Concepto clave de Astro: "Arquitectura de Islas" (Islands Architecture)
//
// Formulario interactivo con estado local para captura de tickets de soporte.
// Se hidrata en el navegador de manera aislada gracias a Astro, manteniendo la página
// ligera y sin bloquear el hilo principal.
// ====================================================================================

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SoporteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulación de envío de ticket y reseteo
    setTimeout(() => {
      setSubmitted(false);
      setForm({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    }, 6000);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded text-center space-y-2 animate-fade-in">
        <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
        <h3 className="text-lg font-bold">¡Ticket de Soporte Registrado!</h3>
        <p className="text-xs">
          Un ingeniero especialista en automatización revisará su reporte técnico e iniciará el protocolo de diagnóstico.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Tu nombre <span className="text-[#ce1b28]">(requerido)</span>
        </label>
        <input 
          type="text" 
          required
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          placeholder="Nombre del solicitante o planta" 
          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Tu correo electrónico <span className="text-[#ce1b28]">(requerido)</span>
          </label>
          <input 
            type="email" 
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="correo@empresa.com" 
            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Teléfono
          </label>
          <input 
            type="tel" 
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            placeholder="(55) 0000-0000" 
            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Asunto
        </label>
        <input 
          type="text" 
          value={form.asunto}
          onChange={(e) => setForm({ ...form, asunto: e.target.value })}
          placeholder="Incidencia en PLC, SCADA, sensor, variador, etc." 
          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Tu mensaje
        </label>
        <textarea 
          rows={5}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          placeholder="Detalle la falla, equipo involucrado o asistencia requerida..." 
          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
        />
      </div>

      <div>
        <button 
          type="submit" 
          className="w-full sm:w-auto bg-[#ce1b28] hover:bg-[#b3131f] text-white font-bold px-8 py-3 rounded transition uppercase tracking-wider text-xs shadow-xs cursor-pointer"
        >
          Enviar Solicitud
        </button>
      </div>
    </form>
  );
}
