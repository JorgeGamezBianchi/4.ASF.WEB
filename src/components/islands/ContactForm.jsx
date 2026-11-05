import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    numero: '',
    asunto: '',
    mensaje: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setForm({
      nombre: '',
      correo: '',
      numero: '',
      asunto: '',
      mensaje: ''
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-[#091b3b] border border-cyan-500/50 text-cyan-100 p-6 sm:p-8 rounded-lg text-center space-y-4 animate-fade-in shadow-lg">
        <div className="w-14 h-14 bg-cyan-950/80 border border-cyan-400/50 rounded-full flex items-center justify-center mx-auto text-cyan-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">¡Mensaje Recibido!</h3>
          <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
            Gracias por contactar a <span className="font-semibold text-cyan-300">Softlution</span>. Uno de nuestros ingenieros o directores se comunicará contigo a la brevedad.
          </p>
        </div>

        <div className="bg-[#061228] p-4 rounded border border-[#1b315d] text-left text-xs space-y-1.5 max-w-sm mx-auto text-slate-300">
          <p><span className="font-bold text-white">Nombre:</span> {form.nombre}</p>
          <p><span className="font-bold text-white">Correo:</span> {form.correo}</p>
          <p><span className="font-bold text-white">Número:</span> {form.numero}</p>
          <p><span className="font-bold text-white">Asunto:</span> {form.asunto}</p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-4 inline-flex items-center justify-center bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-extrabold py-2.5 px-6 rounded transition shadow-md cursor-pointer"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {/* NOMBRE */}
      <div>
        <label htmlFor="nombre" className="block text-slate-300 font-semibold mb-1">
          Nombre Completo <span className="text-cyan-400">*</span>
        </label>
        <input 
          id="nombre"
          type="text" 
          required
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          placeholder="Ej. Ing. Carlos Mendoza" 
          className="w-full px-3.5 py-2.5 border border-[#1e3466] rounded focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-hidden text-sm bg-[#061026] text-white placeholder:text-slate-500 transition"
        />
      </div>

      {/* CORREO Y NÚMERO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="correo" className="block text-slate-300 font-semibold mb-1">
            Correo Electrónico <span className="text-cyan-400">*</span>
          </label>
          <input 
            id="correo"
            type="email" 
            required
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
            placeholder="contacto@empresa.com" 
            className="w-full px-3.5 py-2.5 border border-[#1e3466] rounded focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-hidden text-sm bg-[#061026] text-white placeholder:text-slate-500 transition"
          />
        </div>
        <div>
          <label htmlFor="numero" className="block text-slate-300 font-semibold mb-1">
            Número Telefónico <span className="text-cyan-400">*</span>
          </label>
          <input 
            id="numero"
            type="tel" 
            required
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
            placeholder="(55) 1234-5678" 
            className="w-full px-3.5 py-2.5 border border-[#1e3466] rounded focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-hidden text-sm bg-[#061026] text-white placeholder:text-slate-500 transition"
          />
        </div>
      </div>

      {/* ASUNTO */}
      <div>
        <label htmlFor="asunto" className="block text-slate-300 font-semibold mb-1">
          Asunto <span className="text-cyan-400">*</span>
        </label>
        <input 
          id="asunto"
          type="text" 
          required
          value={form.asunto}
          onChange={(e) => setForm({ ...form, asunto: e.target.value })}
          placeholder="Cotización de proyecto, soporte técnico, tableros PLC, etc." 
          className="w-full px-3.5 py-2.5 border border-[#1e3466] rounded focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-hidden text-sm bg-[#061026] text-white placeholder:text-slate-500 transition"
        />
      </div>

      {/* MENSAJE */}
      <div>
        <label htmlFor="mensaje" className="block text-slate-300 font-semibold mb-1">
          Mensaje <span className="text-cyan-400">*</span>
        </label>
        <textarea 
          id="mensaje"
          rows={5}
          required
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          placeholder="Describe los requerimientos de tu proyecto, dudas o el soporte técnico que necesitas..." 
          className="w-full px-3.5 py-2.5 border border-[#1e3466] rounded focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-hidden text-sm bg-[#061026] text-white placeholder:text-slate-500 transition resize-y"
        />
      </div>

      {/* BOTÓN ENVIAR */}
      <div className="pt-2">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 text-slate-950 font-extrabold px-8 py-3.5 rounded transition duration-200 uppercase tracking-wider text-xs shadow-md shadow-cyan-400/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Enviando...' : 'Enviar Mensaje'}</span>
        </button>
      </div>
    </form>
  );
}
