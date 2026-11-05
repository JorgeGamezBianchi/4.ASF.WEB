// ====================================================================================
// ISLA DE REACT: src/components/islands/VentasForm.jsx
// ====================================================================================
// Concepto clave de Astro: "Arquitectura de Islas" (Islands Architecture)
//
// 1. Este componente es una "Isla" interactiva desarrollada con React.
// 2. En lugar de convertir todo el sitio en una aplicación SPA pesada, Astro permite
//    aislar la interactividad exclusivamente en este formulario.
// 3. Cuando se invoca en un archivo .astro mediante:
//       <VentasForm client:load />
//    Astro solo descarga e hidrata el JavaScript correspondiente a este componente,
//    manteniendo el resto del HTML 100% estático y ultrarrápido.
// ====================================================================================

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function VentasForm() {
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
    // Simulación de envío exitoso y reseteo
    setTimeout(() => {
      setSubmitted(false);
      setForm({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    }, 6000);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded text-center space-y-2 animate-fade-in">
        <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
        <h3 className="text-lg font-bold">¡Mensaje Enviado con Éxito!</h3>
        <p className="text-xs">
          Gracias por escribirnos. Nuestro departamento de ventas revisará su información técnica y se comunicará a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Tu nombre <span className="text-[#ce1b28]">(*)</span>
        </label>
        <input 
          type="text" 
          required
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          placeholder="Ingrese su nombre completo" 
          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Tu correo electrónico <span className="text-[#ce1b28]">(*)</span>
          </label>
          <input 
            type="email" 
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ejemplo@empresa.com" 
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
          placeholder="Cotización de proyecto, modernización de tableros, etc." 
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
          placeholder="Describa los requerimientos de su proceso o proyecto..." 
          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
        />
      </div>

      <div>
        <button 
          type="submit" 
          className="w-full sm:w-auto bg-[#ce1b28] hover:bg-[#b3131f] text-white font-bold px-8 py-3 rounded transition uppercase tracking-wider text-xs shadow-xs cursor-pointer"
        >
          Enviar Mensaje
        </button>
      </div>
    </form>
  );
}
