import React, { useState } from 'react'
import { 
  ChevronRight, 
  Menu, 
  X, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  ImageIcon,
  Send,
  Layers,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react'

// Componente para imágenes en blanco (placeholders listos para implementar después)
function ImagePlaceholder({ label, className = "", width = "w-full", height = "h-48", note = "", borderDashed = true }) {
  return (
    <div 
      className={`bg-white ${borderDashed ? 'border-2 border-dashed border-gray-300' : 'border border-gray-200'} rounded flex flex-col items-center justify-center p-4 text-center transition hover:border-[#ce1b28] hover:shadow-xs group select-none ${width} ${height} ${className}`}
      title={label}
    >
      <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-2 text-gray-400 group-hover:text-[#ce1b28] group-hover:border-[#ce1b28] transition">
        <ImageIcon className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase px-2 line-clamp-1">{label}</span>
      {note && <span className="text-[11px] text-gray-400 mt-1 italic">{note}</span>}
      <span className="text-[10px] text-gray-300 mt-1 font-mono">[ Espacio en blanco ]</span>
    </div>
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false)
  
  // Estados para formularios
  const [ventasSubmitted, setVentasSubmitted] = useState(false)
  const [ventasForm, setVentasForm] = useState({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })

  const [soporteSubmitted, setSoporteSubmitted] = useState(false)
  const [soporteForm, setSoporteForm] = useState({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })

  const [searchTerm, setSearchTerm] = useState('')
  const [searchFeedback, setSearchFeedback] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    const term = searchTerm.toLowerCase()
    if (term.includes('quien') || term.includes('empresa') || term.includes('mision') || term.includes('valor')) {
      setCurrentPage('nosotros')
    } else if (term.includes('servicio') || term.includes('plc') || term.includes('auto') || term.includes('desarrollo')) {
      setCurrentPage('servicios')
    } else if (term.includes('cliente') || term.includes('nestle') || term.includes('femsa') || term.includes('modelo')) {
      setCurrentPage('clientes')
    } else if (term.includes('demo') || term.includes('bacheo') || term.includes('cip') || term.includes('diversey')) {
      setCurrentPage('demo')
    } else if (term.includes('venta') || term.includes('cotiz')) {
      setCurrentPage('ventas')
    } else if (term.includes('soporte') || term.includes('ayuda') || term.includes('ticket')) {
      setCurrentPage('soporte')
    } else {
      setCurrentPage('contacto')
    }
    setSearchFeedback(`Resultados para "${searchTerm}"`)
    setTimeout(() => setSearchFeedback(''), 4000)
    setSearchTerm('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateTo = (page) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    setContactDropdownOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#444444]">
      {/* ================= BARRA SUPERIOR / HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo y Nombre de la Empresa */}
            <div 
              className="cursor-pointer select-none flex flex-col justify-center"
              onClick={() => navigateTo('home')}
            >
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#222222]">
                Softlution<span className="text-[#ce1b28]">!</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                Automatización Industrial
              </p>
            </div>

            {/* Menú de Navegación Desktop */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-semibold text-[#555555]">
              <button 
                onClick={() => navigateTo('home')}
                className={`px-3 py-2 transition border-b-2 ${currentPage === 'home' ? 'text-[#ce1b28] border-[#ce1b28]' : 'border-transparent hover:text-[#ce1b28]'}`}
              >
                Inicio
              </button>

              <button 
                onClick={() => navigateTo('nosotros')}
                className={`px-3 py-2 transition border-b-2 ${currentPage === 'nosotros' ? 'text-[#ce1b28] border-[#ce1b28]' : 'border-transparent hover:text-[#ce1b28]'}`}
              >
                Quienes Somos
              </button>

              <button 
                onClick={() => navigateTo('servicios')}
                className={`px-3 py-2 transition border-b-2 ${currentPage === 'servicios' ? 'text-[#ce1b28] border-[#ce1b28]' : 'border-transparent hover:text-[#ce1b28]'}`}
              >
                Servicios
              </button>

              <button 
                onClick={() => navigateTo('clientes')}
                className={`px-3 py-2 transition border-b-2 ${currentPage === 'clientes' ? 'text-[#ce1b28] border-[#ce1b28]' : 'border-transparent hover:text-[#ce1b28]'}`}
              >
                Nuestros Clientes
              </button>

              {/* Dropdown de Contacto */}
              <div className="relative">
                <button 
                  onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                  onBlur={() => setTimeout(() => setContactDropdownOpen(false), 200)}
                  className={`px-3 py-2 flex items-center transition border-b-2 ${['contacto', 'ventas', 'soporte'].includes(currentPage) ? 'text-[#ce1b28] border-[#ce1b28]' : 'border-transparent hover:text-[#ce1b28]'}`}
                >
                  <span>Contacto</span>
                  <ChevronRight className={`ml-1 w-4 h-4 transform transition-transform ${contactDropdownOpen ? 'rotate-90' : ''}`} />
                </button>

                {contactDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 shadow-lg rounded-sm py-1 z-50">
                    <button 
                      onClick={() => navigateTo('contacto')}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 hover:text-[#ce1b28] ${currentPage === 'contacto' ? 'text-[#ce1b28] font-bold bg-gray-50' : 'text-gray-700'}`}
                    >
                      General Contacto
                    </button>
                    <button 
                      onClick={() => navigateTo('ventas')}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 hover:text-[#ce1b28] ${currentPage === 'ventas' ? 'text-[#ce1b28] font-bold bg-gray-50' : 'text-gray-700'}`}
                    >
                      Ventas
                    </button>
                    <button 
                      onClick={() => navigateTo('soporte')}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 hover:text-[#ce1b28] ${currentPage === 'soporte' ? 'text-[#ce1b28] font-bold bg-gray-50' : 'text-gray-700'}`}
                    >
                      Soporte
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Botón Móvil */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#ce1b28] focus:outline-hidden"
                aria-label="Alternar la navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-4 space-y-1 text-sm font-semibold">
            <button 
              onClick={() => navigateTo('home')}
              className={`block w-full text-left px-3 py-2 rounded ${currentPage === 'home' ? 'text-[#ce1b28] bg-gray-50' : 'text-gray-700'}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => navigateTo('nosotros')}
              className={`block w-full text-left px-3 py-2 rounded ${currentPage === 'nosotros' ? 'text-[#ce1b28] bg-gray-50' : 'text-gray-700'}`}
            >
              Quienes Somos
            </button>
            <button 
              onClick={() => navigateTo('servicios')}
              className={`block w-full text-left px-3 py-2 rounded ${currentPage === 'servicios' ? 'text-[#ce1b28] bg-gray-50' : 'text-gray-700'}`}
            >
              Servicios
            </button>
            <button 
              onClick={() => navigateTo('clientes')}
              className={`block w-full text-left px-3 py-2 rounded ${currentPage === 'clientes' ? 'text-[#ce1b28] bg-gray-50' : 'text-gray-700'}`}
            >
              Nuestros Clientes
            </button>
            <button 
              onClick={() => navigateTo('demo')}
              className={`block w-full text-left px-3 py-2 rounded ${currentPage === 'demo' ? 'text-[#ce1b28] bg-gray-50' : 'text-gray-700'}`}
            >
              Demo
            </button>
            <div className="border-t border-gray-100 my-1 pt-1">
              <span className="block px-3 py-1 text-xs text-gray-400 uppercase tracking-wider font-bold">Contacto</span>
              <button 
                onClick={() => navigateTo('contacto')}
                className={`block w-full text-left px-3 py-2 rounded pl-6 ${currentPage === 'contacto' ? 'text-[#ce1b28] bg-gray-50' : 'text-gray-700'}`}
              >
                Información de Contacto
              </button>
              <button 
                onClick={() => navigateTo('ventas')}
                className={`block w-full text-left px-3 py-2 rounded pl-6 ${currentPage === 'ventas' ? 'text-[#ce1b28] bg-gray-50' : 'text-gray-700'}`}
              >
                Ventas
              </button>
              <button 
                onClick={() => navigateTo('soporte')}
                className={`block w-full text-left px-3 py-2 rounded pl-6 ${currentPage === 'soporte' ? 'text-[#ce1b28] bg-gray-50' : 'text-gray-700'}`}
              >
                Soporte
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= BANNER / HEADER DE PÁGINA INTERIOR ================= */}
      {currentPage !== 'home' && (
        <section className="bg-[#eceff1] border-b border-gray-300 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-2xl font-bold text-[#222222] capitalize">
              {currentPage === 'nosotros' && 'Quienes Somos'}
              {currentPage === 'servicios' && 'Servicios'}
              {currentPage === 'clientes' && 'Nuestros Clientes'}
              {currentPage === 'demo' && 'Demo'}
              {currentPage === 'contacto' && 'Contacto'}
              {currentPage === 'ventas' && 'Ventas'}
              {currentPage === 'soporte' && 'Soporte'}
            </h1>
            <ol className="flex items-center text-xs text-gray-600 space-x-2">
              <li 
                onClick={() => navigateTo('home')}
                className="cursor-pointer hover:text-[#ce1b28]"
              >
                Inicio
              </li>
              <li>/</li>
              <li className="text-[#ce1b28] font-semibold">
                {currentPage === 'nosotros' && 'Quienes Somos'}
                {currentPage === 'servicios' && 'Servicios'}
                {currentPage === 'clientes' && 'Nuestros Clientes'}
                {currentPage === 'demo' && 'Demo'}
                {currentPage === 'contacto' && 'Contacto'}
                {currentPage === 'ventas' && 'Ventas'}
                {currentPage === 'soporte' && 'Soporte'}
              </li>
            </ol>
          </div>
        </section>
      )}

      {/* Notificación de búsqueda */}
      {searchFeedback && (
        <div className="bg-red-50 border-b border-red-200 text-red-700 text-xs py-2 px-4 text-center">
          {searchFeedback}
        </div>
      )}

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="flex-1">
        {/* ================= VISTA: HOME / BIENVENIDO ================= */}
        {currentPage === 'home' && (
          <div>
            {/* Slider / Hero Principal */}
            <section className="relative w-full bg-slate-900 border-b border-gray-300 overflow-hidden" style={{ minHeight: '65vh' }}>
              {/* Espacio en blanco para la imagen de fondo del slider */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90 z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-30 select-none">
                <div className="text-center p-8 border-2 border-dashed border-slate-700 rounded-lg text-slate-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold uppercase tracking-wider">[ Espacio para Imagen de Portada: SOFTLUTION-2019-FEMSA.jpg ]</p>
                  <p className="text-xs text-slate-500 mt-1">Fondo de bienvenida a pantalla completa</p>
                </div>
              </div>

              {/* Texto y Botón sobre el Slider */}
              <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col items-center justify-center text-center py-24 sm:py-32">
                <div className="bg-black/60 px-8 py-5 border-l-4 border-[#ce1b28] backdrop-blur-xs max-w-xl mb-6">
                  <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-wider uppercase font-['Dosis',sans-serif]">
                    Bienvenido
                  </h1>
                </div>

                <button 
                  onClick={() => {
                    const el = document.getElementById('seccion-interior')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="bg-[#ce1b28] hover:bg-[#b3131f] text-white font-bold text-sm uppercase px-8 py-3 tracking-widest transition duration-300 shadow-md transform hover:scale-105"
                >
                  Entrar
                </button>
              </div>
            </section>

            {/* Layout de Contenido Home: 2 Columnas (Principal + Barra Lateral) */}
            <div id="seccion-interior" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna Principal (8 columnas) */}
                <div className="lg:col-span-8 bg-white border border-gray-200 p-6 sm:p-8 rounded shadow-xs">
                  {/* Logo de la empresa en blanco */}
                  <div className="flex justify-center sm:justify-start mb-8">
                    <ImagePlaceholder 
                      label="Logo ASF (ASF-LOGO.png)" 
                      width="w-48" 
                      height="h-36" 
                      note="Automation Solutions Factory"
                    />
                  </div>

                  {/* Título de Galería / Proyectos */}
                  <div className="border-b-2 border-gray-200 pb-3 mb-6">
                    <h2 className="text-xl font-bold text-[#222222] flex items-center">
                      <span className="w-2.5 h-6 bg-[#ce1b28] inline-block mr-2.5"></span>
                      Galería de Proyectos e Implementaciones Industriales
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Desarrollos en automatización, sistemas SCADA y control de procesos en planta.
                    </p>
                  </div>

                  {/* Grid de Imágenes de la Galería (en blanco) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <ImagePlaceholder 
                      label="SOFTLUTION 2018 FEMSA" 
                      height="h-56" 
                      note="Sistema de automatización en planta de bebidas"
                    />
                    <ImagePlaceholder 
                      label="Proyecto 1 - Integración de Línea" 
                      height="h-56" 
                      note="Arquitectura de control y tableros PLC"
                    />
                    <ImagePlaceholder 
                      label="Proyecto 2 - Paneles de Control" 
                      height="h-56" 
                      note="Interfaz HMI / SCADA en tiempo real"
                    />
                    <ImagePlaceholder 
                      label="Proyecto 3 - Dosificación y Bacheo" 
                      height="h-56" 
                      note="Instrumentación y ruteo de fluidos"
                    />
                    <div className="sm:col-span-2">
                      <ImagePlaceholder 
                        label="Proyecto 4 - Puesta en Marcha" 
                        height="h-56" 
                        note="Sistemas de alta confiabilidad"
                      />
                    </div>
                  </div>

                  {/* Banner de Sistemas Permitidos */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <ImagePlaceholder 
                      label="Banner: Sistemas Permitidos (Sistemas-permitidos.png)" 
                      height="h-28" 
                      note="Plataformas y estándares certificados"
                    />
                  </div>
                </div>

                {/* Columna Lateral / Sidebar (4 columnas) */}
                <aside className="lg:col-span-4 space-y-6">
                  {/* Widget: Buscador */}
                  <div className="bg-white border border-gray-200 p-5 rounded shadow-xs">
                    <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">
                      Buscar en el sitio
                    </h3>
                    <form onSubmit={handleSearch} className="flex">
                      <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar..." 
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded-l focus:outline-hidden focus:border-[#ce1b28]"
                      />
                      <button 
                        type="submit" 
                        className="bg-[#ce1b28] hover:bg-[#b3131f] text-white px-3 py-2 rounded-r transition"
                        title="Buscar"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                  {/* Widget: Entradas Recientes */}
                  <div className="bg-white border border-gray-200 p-5 rounded shadow-xs">
                    <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">
                      Entradas recientes
                    </h3>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <button 
                          onClick={() => navigateTo('home')}
                          className="text-left text-gray-700 hover:text-[#ce1b28] transition flex items-center"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-[#ce1b28] mr-1 shrink-0" />
                          <span>Bienvenido al portal Softlution!</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => navigateTo('demo')}
                          className="text-left text-gray-700 hover:text-[#ce1b28] transition flex items-center"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-[#ce1b28] mr-1 shrink-0" />
                          <span>Sistema automático de Bacheo Diversey-Mexico</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => navigateTo('servicios')}
                          className="text-left text-gray-700 hover:text-[#ce1b28] transition flex items-center"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-[#ce1b28] mr-1 shrink-0" />
                          <span>Integración de PLC, Variadores y CCM</span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Widget: Categorías */}
                  <div className="bg-white border border-gray-200 p-5 rounded shadow-xs">
                    <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">
                      Categorías
                    </h3>
                    <ul className="space-y-2 text-xs">
                      <li className="flex justify-between items-center text-gray-700">
                        <span 
                          onClick={() => navigateTo('servicios')}
                          className="cursor-pointer hover:text-[#ce1b28] transition"
                        >
                          Automatización Industrial
                        </span>
                        <span className="text-gray-400 font-mono">(4)</span>
                      </li>
                      <li className="flex justify-between items-center text-gray-700">
                        <span 
                          onClick={() => navigateTo('clientes')}
                          className="cursor-pointer hover:text-[#ce1b28] transition"
                        >
                          Clientes y Casos de Éxito
                        </span>
                        <span className="text-gray-400 font-mono">(8)</span>
                      </li>
                      <li className="flex justify-between items-center text-gray-700">
                        <span 
                          onClick={() => navigateTo('home')}
                          className="cursor-pointer hover:text-[#ce1b28] transition"
                        >
                          Sin categoría
                        </span>
                        <span className="text-gray-400 font-mono">(1)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Widget: Contacto Directo */}
                  <div className="bg-white border border-gray-200 p-5 rounded shadow-xs">
                    <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">
                      Atención Inmediata
                    </h3>
                    <div className="text-xs text-gray-600 space-y-2.5">
                      <p className="flex items-start">
                        <Phone className="w-4 h-4 text-[#ce1b28] mr-2 shrink-0 mt-0.5" />
                        <span>Teléfono: <strong>5378-2110</strong></span>
                      </p>
                      <p className="flex items-start">
                        <Mail className="w-4 h-4 text-[#ce1b28] mr-2 shrink-0 mt-0.5" />
                        <span>ventas@softlution.com.mx</span>
                      </p>
                      <div className="pt-2">
                        <button 
                          onClick={() => navigateTo('ventas')}
                          className="w-full bg-gray-100 hover:bg-[#ce1b28] hover:text-white text-gray-800 text-xs font-semibold py-2 px-3 rounded transition text-center"
                        >
                          Solicitar Cotización
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        )}

        {/* ================= VISTA: QUIENES SOMOS ================= */}
        {currentPage === 'nosotros' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded shadow-xs">
              {/* Encabezado con Logos */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                <ImagePlaceholder 
                  label="Logo Softlution (Softlution.png)" 
                  width="w-64" 
                  height="h-24" 
                  note="Encabezado de identidad corporativa"
                />
                <ImagePlaceholder 
                  label="Logo ASF (ASF-LOGO.png)" 
                  width="w-32" 
                  height="h-24" 
                  note="Automation Solutions Factory"
                />
              </div>

              {/* Párrafo Principal con Letra Capital */}
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed mb-8">
                <p>
                  <span className="drop-cap text-[#ce1b28]">E</span>
                  s una empresa con más de 16 años de experiencia, líder en el desarrollo de sistemas de automatización e información industrial. Con una clara vocación de servicio al cliente, nuestro objetivo fundamental es:
                </p>

                {/* Cita Destacada */}
                <blockquote className="my-6 p-4 bg-gray-50 border-l-4 border-[#ce1b28] text-gray-800 font-serif italic text-base">
                  “Ofrecer a nuestros clientes soluciones innovadoras que los hagan más productivos y eficientes en sus respectivas industrias.”
                </blockquote>

                <p>
                  Contamos con un equipo de profesionales que trabajan en entender y superar las perspectivas de nuestros clientes.
                  Durante estos años, hemos desarrollado con éxito más de 100 sistemas para clientes de diversas empresas multinacionales en industrias que incluyen Alimentos y Bebidas, Química, Metalmecánica y Petroquímica entre otras.
                </p>
                <p>
                  Gracias a la implementación tecnológica y capital humano altamente calificado, conformamos una empresa con amplia experiencia en sistemas de control e instrumentación de procesos industriales.
                </p>
              </div>

              {/* Título de Sección Servicios Orientados */}
              <div className="text-center my-10">
                <h2 className="text-xl sm:text-2xl font-serif italic font-bold text-[#000080] mb-4">
                  Servicios orientados a nuestros clientes.
                </h2>
                <div className="max-w-md mx-auto">
                  <ImagePlaceholder 
                    label="Diagrama: Servicios orientados a nuestros clientes (Servicios1-1.png)" 
                    height="h-64" 
                    note="Diagrama de flujo de valor y satisfacción"
                  />
                </div>
              </div>

              {/* Misión y Visión */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="space-y-3">
                  <ImagePlaceholder 
                    label="Banner: Misión (Mision.png)" 
                    height="h-32" 
                    note="Misión corporativa Softlution"
                  />
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded text-xs text-gray-600">
                    Proveer SOLUCIONES integrales en tecnologías de automatización y control de procesos con seguridad y confiabilidad, impulsando el crecimiento y eficiencia de la industria mexicana.
                  </div>
                </div>

                <div className="space-y-3">
                  <ImagePlaceholder 
                    label="Banner: Visión (vision.png)" 
                    height="h-32" 
                    note="Visión corporativa Softlution"
                  />
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded text-xs text-gray-600">
                    Ser la empresa líder y referente en integración de sistemas de control, reconocida nacional e internacionalmente por su excelencia técnica, innovación y compromiso humano.
                  </div>
                </div>
              </div>

              {/* Día a día */}
              <div className="my-10 pt-6 border-t border-gray-200">
                <div className="mb-4">
                  <ImagePlaceholder 
                    label="Banner: Día a Día (dia-adia.png)" 
                    width="w-full sm:w-80" 
                    height="h-20" 
                    note="Nuestros objetivos permanentes"
                  />
                </div>

                <ul className="space-y-3 text-sm text-gray-700 pl-4 list-disc marker:text-[#ce1b28]">
                  <li>Proveer SOLUCIONES en tecnologías de automatización y control de procesos con seguridad y confiabilidad.</li>
                  <li>Hacer nuestro el compromiso de mejora, productividad y eficiencia de los procesos de nuestros clientes en sus respectivas industrias.</li>
                  <li>Mejorar las prácticas de la organización para aumentar nuestra presencia y capacidad de respuesta ante la demanda y ser reconocidos como una compañía enfocada a brindar soluciones con calidad.</li>
                  <li>Desarrollar sistemas de productividad que entreguen en tiempo real la información necesaria para conocer el desempeño de su proceso y ayude en la toma de mejores decisiones.</li>
                  <li>Brindar a nuestros colaboradores las oportunidades de desarrollo profesional y humano que les permita tener una vida plena y productiva.</li>
                </ul>
              </div>

              {/* Prácticas */}
              <div className="my-10 pt-6 border-t border-gray-200">
                <div className="mb-6 flex justify-center">
                  <ImagePlaceholder 
                    label="Banner: Prácticas (Practicas-1.png)" 
                    width="w-full sm:w-80" 
                    height="h-20" 
                    note="Metodología de ejecución y calidad"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                    <p className="font-bold text-[#222222] text-sm">Determinar las Necesidades del Cliente</p>
                    <p className="text-xs text-gray-500 italic mt-1">(Cuando el Cliente pierde la razón necesita de los expertos)</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                    <p className="font-bold text-[#222222] text-sm">Evaluar factibilidad y lograr aceptación</p>
                    <p className="text-xs text-gray-500 italic mt-1">(¿Lo podemos hacer?, ¿Cómo, Cuándo, Para qué, Cuánto?)</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                    <p className="font-bold text-[#222222] text-sm">Hacerlo bien y a la primera</p>
                    <p className="text-xs text-gray-500 italic mt-1">(Calidad y eficiencia, depende de buena planeación)</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                    <p className="font-bold text-[#222222] text-sm">Superar las expectativas del Cliente</p>
                    <p className="text-xs text-gray-500 italic mt-1">(¿Por qué no? Soluciones con valor agregado)</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 rounded sm:col-span-2 lg:col-span-1">
                    <p className="font-bold text-[#222222] text-sm">Evidenciar la Satisfacción del Cliente</p>
                    <p className="text-xs text-gray-500 italic mt-1">(¿Hicimos bien?, ¿Hicimos mal?, ¿Qué podemos mejorar?)</p>
                  </div>
                </div>
              </div>

              {/* Valores Corporativos */}
              <div className="my-10 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-[#222222] uppercase tracking-wider mb-6 text-center">
                  Nuestros Valores Fundamentales
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 border-l-4 border-[#1fdbdb] bg-slate-50">
                    <p className="font-serif italic font-bold text-lg text-[#1fdbdb]">Honestidad</p>
                    <p className="text-gray-700 text-xs mt-1">Actuamos y Promovemos la Honestidad como nuestro valor principal para generar confianza.</p>
                  </div>

                  <div className="p-4 border-l-4 border-[#133dbd] bg-slate-50">
                    <p className="font-['Impact',sans-serif] tracking-wider text-lg text-[#133dbd]">Compromiso</p>
                    <p className="text-gray-700 text-xs mt-1">Nuestro Compromiso es asegurar el éxito de nuestros clientes, por ello estamos 100% conscientes de las obligaciones de nuestros acuerdos.</p>
                  </div>

                  <div className="p-4 border-l-4 border-[#1fdbdb] bg-slate-50">
                    <p className="font-serif italic font-bold text-lg text-[#1fdbdb]">Dedicación</p>
                    <p className="text-gray-700 text-xs mt-1">En Softlution trabajamos con gran Dedicación en el cumplimiento de objetivos de nuestros clientes y propios.</p>
                  </div>

                  <div className="p-4 border-l-4 border-[#133dbd] bg-slate-50">
                    <p className="font-['Impact',sans-serif] tracking-wider text-lg text-[#133dbd]">Confianza</p>
                    <p className="text-gray-700 text-xs mt-1">Generamos Confianza porque somos congruentes con lo que pensamos, decimos y hacemos, buscando siempre el bien común, con apego a nuestros valores.</p>
                  </div>

                  <div className="p-4 border-l-4 border-[#1fdbdb] bg-slate-50">
                    <p className="font-serif italic font-bold text-lg text-[#1fdbdb]">Lealtad</p>
                    <p className="text-gray-700 text-xs mt-1">Con Lealtad hacia nuestros clientes y colaboradores valoramos los esfuerzos de todos y cada uno de los que hacen posible el brindar el mejor de los servicios.</p>
                  </div>

                  <div className="p-4 border-l-4 border-[#133dbd] bg-slate-50">
                    <p className="font-['Impact',sans-serif] tracking-wider text-lg text-[#133dbd]">Profesionalismo</p>
                    <p className="text-gray-700 text-xs mt-1">Trabajamos con Profesionalismo agregando valor en cada actividad para garantizar servicios de excelencia.</p>
                  </div>
                </div>
              </div>

              {/* Banner Sistemas Permitidos */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <ImagePlaceholder 
                  label="Banner: Sistemas Permitidos (Sistemas-permitidos.png)" 
                  height="h-28" 
                  note="Certificaciones y solvencia técnica"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= VISTA: SERVICIOS ================= */}
        {currentPage === 'servicios' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded shadow-xs space-y-10">
              
              {/* 1. Consultoría */}
              <div className="space-y-4">
                <ImagePlaceholder 
                  label="Banner: Consultoría (consultoria-2.png)" 
                  height="h-20" 
                  note="Servicios de consultoría técnica y diagnósticos"
                />
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="drop-cap text-[#ce1b28]">N</span>
                  uestra experiencia garantiza que la tecnología funcione para usted. Proporcionándole tecnología experta, ingeniería de software, diseño e implementación para que pueda centrarse en el negocio en cuestión. Desde el concepto hasta la puesta en marcha de su proyecto, nos aseguraremos de que haya implementado las tecnologías correctas.
                </p>
              </div>

              {/* 2. Desarrollo */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5">
                    <ImagePlaceholder 
                      label="Imagen: Desarrollo e Ingeniería (Imagen1.png)" 
                      height="h-56" 
                      note="Ingeniería y arquitectura de control"
                    />
                  </div>
                  <div className="md:col-span-7 space-y-4">
                    <ImagePlaceholder 
                      label="Banner: Desarrollo (desarrollo.png)" 
                      height="h-16" 
                      note="Desarrollo de software y firmware de procesos"
                    />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="drop-cap text-[#133dbd]">C</span>
                      ontamos con el mejor equipo de Ingeniería que se enorgullece de garantizar que reciba soluciones integrales para usted.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Después de haber implementado cientos de proyectos, nuestro equipo de ingeniería está totalmente involucrado en los procesos asegurándose de que realmente entiende sus necesidades y les permita administrar de manera experta la implementación e integración de soluciones, con el claro objetivo de crear y transformar proyectos eficientes y con bajo costo.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Automatización */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <ImagePlaceholder 
                      label="Banner: Automatización (automatización.png)" 
                      height="h-16" 
                      note="Control industrial automático"
                    />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="drop-cap text-[#ce1b28]">E</span>
                      n <strong>Softlution!</strong> contamos con soporte profesional en la automatización y desarrollamos gran variedad de equipos para procesos industriales e integramos los siguientes conceptos:
                    </p>
                    <ul className="text-xs text-gray-700 space-y-1.5 list-disc pl-5 marker:text-[#ce1b28]">
                      <li>Controladores Lógicos Programables (PLC's)</li>
                      <li>Variadores de Frecuencia (VFD) y Arrancadores Suaves</li>
                      <li>Centro de Control de Motores (CCM)</li>
                      <li>Redes de Control y Comunicación Industrial (Ethernet/IP, Modbus, Profinet)</li>
                      <li>Dispositivos de Seguridad en Máquinas y Líneas</li>
                      <li>Sensores e Instrumentación de Proceso</li>
                    </ul>
                    <p className="text-gray-700 text-sm leading-relaxed pt-2">
                      Además de una amplia experiencia en el desarrollo, instalación y puesta en marcha de sistemas de producción por lotes (Batch), Ruteo y Extrusión, en industrias Química, Alimentos y Bebidas entre otras.
                    </p>
                  </div>
                  <div className="md:col-span-5">
                    <ImagePlaceholder 
                      label="Imagen: Gabinetes y CCM (iamgen2.png)" 
                      height="h-56" 
                      note="Paneles y tableros de automatización"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Instalaciones */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4">
                    <ImagePlaceholder 
                      label="Imagen: Instalaciones Eléctricas (iamgen3.png)" 
                      height="h-56" 
                      note="Canalización y cableado estructurado"
                    />
                  </div>
                  <div className="md:col-span-8 space-y-4">
                    <ImagePlaceholder 
                      label="Banner: Instalaciones (instalaciones.png)" 
                      height="h-16" 
                      note="Instalaciones eléctricas industriales"
                    />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="drop-cap text-[#133dbd]">T</span>
                      enemos personal altamente capacitado en la elaboración de ingeniería e instalaciones eléctricas para aplicaciones industriales en baja tensión. Cumpliendo con las normas nacionales e internacionales para cada aplicación.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. Integradores Autorizados */}
              <div className="pt-8 border-t border-gray-200 text-center">
                <h3 className="text-xl font-serif italic font-bold text-[#222222] mb-6">
                  Somos Integradores Autorizados:
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <ImagePlaceholder 
                    label="CSIA" 
                    height="h-32" 
                    note="Control System Integrators Association"
                  />
                  <ImagePlaceholder 
                    label="Schneider Electric" 
                    height="h-32" 
                    note="Integrador Autorizado"
                  />
                  <ImagePlaceholder 
                    label="Rockwell Automation" 
                    height="h-32" 
                    note="Allen-Bradley Solutions"
                  />
                  <ImagePlaceholder 
                    label="Wonderware by SE" 
                    height="h-32" 
                    note="SCADA & InTouch Solutions"
                  />
                  <ImagePlaceholder 
                    label="Danfoss" 
                    height="h-32" 
                    note="Drives & Power Solutions"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= VISTA: NUESTROS CLIENTES ================= */}
        {currentPage === 'clientes' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded shadow-xs">
              
              {/* Banner superior */}
              <div className="flex justify-center mb-8">
                <ImagePlaceholder 
                  label="Banner: Nuestros Clientes (nuestros-clientes.png)" 
                  width="w-full sm:w-96" 
                  height="h-24" 
                  note="Empresas multinacionales que confían en Softlution"
                />
              </div>

              <p className="text-center text-sm text-gray-600 max-w-2xl mx-auto mb-10">
                Durante más de 16 años hemos implementado proyectos y soluciones para empresas líderes en los sectores de Alimentos, Bebidas, Químico, Cosmético y Manufactura.
              </p>

              {/* Grid de Clientes (en blanco para implementar logos después) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                <ImagePlaceholder 
                  label="Nestlé" 
                  height="h-40" 
                  note="Industria de Alimentos y Nutrición"
                />
                <ImagePlaceholder 
                  label="ATVM" 
                  height="h-40" 
                  note="Soluciones de Manufactura y Logística"
                />
                <ImagePlaceholder 
                  label="Grupo Modelo" 
                  height="h-40" 
                  note="Industria Cervecera y Bebidas"
                />
                <ImagePlaceholder 
                  label="FEMSA" 
                  height="h-40" 
                  note="Embotellado y Distribución Industrial"
                />
                <ImagePlaceholder 
                  label="Colgate-Palmolive" 
                  height="h-40" 
                  note="Cuidado Personal y Químico"
                />
                <ImagePlaceholder 
                  label="L'Oréal Professionnel" 
                  height="h-40" 
                  note="Industria Cosmética y Capilar"
                />
                <ImagePlaceholder 
                  label="Diversey" 
                  height="h-40" 
                  note="Higiene y Limpieza Industrial"
                />
                <ImagePlaceholder 
                  label="Pinturas Prisa" 
                  height="h-40" 
                  note="Recubrimientos y Esmaltes"
                />
              </div>

              {/* Banner Sistemas Permitidos */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <ImagePlaceholder 
                  label="Banner: Sistemas Permitidos (Sistemas-permitidos.png)" 
                  height="h-28" 
                  note="Compatibilidad y estándares de industria"
                />
              </div>

            </div>
          </div>
        )}

        {/* ================= VISTA: DEMO ================= */}
        {currentPage === 'demo' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded shadow-xs space-y-8">
              
              <div className="text-center border-b border-gray-200 pb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">
                  Sistema automático de Bacheo Diversey-Mexico
                </h2>
                <p className="text-sm text-gray-500 mt-1">Planta Tlalnepantla, Estado de México</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                  A continuación se muestran los módulos operativos correspondientes a la simulación y arquitectura del sistema de dosificación, bacheo y lavado CIP implementado para la planta de Diversey México:
                </p>

                {/* Lista de Módulos Demo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 p-4 rounded hover:border-[#ce1b28] transition shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#222222]">1. Operación (Batch)</span>
                      <ExternalLink className="w-4 h-4 text-[#ce1b28]" />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Módulo de control de bacheo, selección de recetas y arranque de reactores.</p>
                    <a 
                      href="http://softlution.com.mx/2%20-%20Batch-output/Web/2%20-%20Batch.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-[#ce1b28] font-bold hover:underline inline-flex items-center"
                    >
                      Abrir simulación de Operación &rarr;
                    </a>
                  </div>

                  <div className="bg-white border border-gray-200 p-4 rounded hover:border-[#ce1b28] transition shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#222222]">2. Validación y descarga</span>
                      <ExternalLink className="w-4 h-4 text-[#ce1b28]" />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Verificación de parámetros de calidad y secuencia segura de descarga a tanques.</p>
                    <a 
                      href="http://softlution.com.mx/3%20-%20Validacion-output/Web/3%20-%20Validacion.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-[#ce1b28] font-bold hover:underline inline-flex items-center"
                    >
                      Abrir Validación y Descarga &rarr;
                    </a>
                  </div>

                  <div className="bg-white border border-gray-200 p-4 rounded hover:border-[#ce1b28] transition shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#222222]">3. Limpieza CIP</span>
                      <ExternalLink className="w-4 h-4 text-[#ce1b28]" />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Ciclo automatizado de limpieza en sitio (Cleaning In Place) y enjuagues.</p>
                    <a 
                      href="http://softlution.com.mx/4%20-%20CIP-output/Web/4%20-%20CIP.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-[#ce1b28] font-bold hover:underline inline-flex items-center"
                    >
                      Abrir Ciclo CIP &rarr;
                    </a>
                  </div>

                  <div className="bg-white border border-gray-200 p-4 rounded hover:border-[#ce1b28] transition shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#222222]">4. Operación Simultánea</span>
                      <ExternalLink className="w-4 h-4 text-[#ce1b28]" />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Gestión concurrente de múltiples reactores y líneas sin cuellos de botella.</p>
                    <a 
                      href="http://softlution.com.mx/5%20-%20Operacion%20Simultanea-output/Web/5%20-%20Operacion%20Simultanea.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-[#ce1b28] font-bold hover:underline inline-flex items-center"
                    >
                      Abrir Operación Simultánea &rarr;
                    </a>
                  </div>

                  <div className="bg-white border border-gray-200 p-4 rounded hover:border-[#ce1b28] transition shadow-xs sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#222222]">5. Reporte de Consumos</span>
                      <ExternalLink className="w-4 h-4 text-[#ce1b28]" />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">DataLogger para trazabilidad de materias primas, energía y tiempos de ciclo.</p>
                    <a 
                      href="http://softlution.com.mx/DataLogger-output/Web/DataLogger.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-[#ce1b28] font-bold hover:underline inline-flex items-center"
                    >
                      Abrir Reporte DataLogger &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Banner Sistemas Permitidos */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <ImagePlaceholder 
                  label="Banner: Sistemas Permitidos (Sistemas-permitidos.png)" 
                  height="h-28" 
                  note="Software validado para entornos industriales"
                />
              </div>

            </div>
          </div>
        )}

        {/* ================= VISTA: CONTACTO GENERAL ================= */}
        {currentPage === 'contacto' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded shadow-xs space-y-8">
              
              {/* Encabezado y Logo */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#222222]">Ponte en Contacto</h2>
                  <p className="text-xs text-gray-500 mt-1">Estamos listos para atender tus requerimientos de ingeniería y soporte.</p>
                </div>
                <ImagePlaceholder 
                  label="Logo ASF (ASF-LOGO.png)" 
                  width="w-32" 
                  height="h-24" 
                  note="Softlution"
                />
              </div>

              {/* Mensaje de Bienvenida */}
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="drop-cap text-[#ce1b28]">N</span>
                uestro Equipo profesional está a su disposición, así que no dude en ponerse en contacto con nosotros si tiene alguna pregunta, problema o tal vez alguna sugerencia. Nos encantaría saber de usted. Puede comunicarse con nosotros a través de la dirección de correo electrónico, o reunirse con nosotros en persona en nuestra dirección a continuación. Sólo asegúrese de hacer una cita primero. La información de contacto se muestra a continuación.
              </p>

              {/* Accesos directos a Ventas y Soporte */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#222222] mb-1">Información para Ventas y Cotizaciones</h3>
                    <p className="text-xs text-gray-500">¿Requiere cotizar un proyecto nuevo, integración o modernización de tableros?</p>
                  </div>
                  <button 
                    onClick={() => navigateTo('ventas')}
                    className="mt-4 bg-[#1717b0] hover:bg-blue-900 text-white text-xs font-bold py-2 px-4 rounded transition self-start"
                  >
                    Info. Ventas &rarr;
                  </button>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#222222] mb-1">Soporte Técnico Especializado</h3>
                    <p className="text-xs text-gray-500">Nuestro equipo de ingenieros está a su disposición para brindar soporte y diagnóstico.</p>
                  </div>
                  <button 
                    onClick={() => navigateTo('soporte')}
                    className="mt-4 bg-[#ce1b28] hover:bg-[#b3131f] text-white text-xs font-bold py-2 px-4 rounded transition self-start"
                  >
                    Info. Soporte &rarr;
                  </button>
                </div>
              </div>

              {/* Tarjetas de Información de Contacto (con placeholders de iconos gráficos originales) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <ImagePlaceholder 
                    label="Icono: Dirección (dirección.png)" 
                    height="h-24" 
                    note="Ubicación física de la empresa"
                  />
                  <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="font-bold text-[#222222] mb-1">Oficinas Principales:</p>
                    <p>H. Ayuntamiento No. 4</p>
                    <p>Col. San Juan Xocotla, Tultepec</p>
                    <p>Edo. México . C.P. 54960</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <ImagePlaceholder 
                    label="Icono: Teléfono (telefono.png)" 
                    height="h-24" 
                    note="Línea de atención telefónica"
                  />
                  <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="font-bold text-[#222222] mb-1">Central Telefónica:</p>
                    <p className="text-base font-bold text-[#ce1b28]">5378-2110</p>
                    <p className="text-gray-500 mt-1">Horario: Lunes a Viernes de 8:00 a 18:00 hrs</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <ImagePlaceholder 
                    label="Icono: Correo (correo.png)" 
                    height="h-24" 
                    note="Cuentas de correo electrónico"
                  />
                  <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="font-bold text-[#222222] mb-1">Correos de Contacto:</p>
                    <p>ventas@softlution.com.mx</p>
                    <p>soporte@softlution.com.mx</p>
                    <p className="text-gray-500 mt-1">Respuesta en menos de 24 horas</p>
                  </div>
                </div>
              </div>

              {/* Placeholder de Mapa */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-3">
                  Ubicación en el Mapa
                </h3>
                <div className="bg-gray-100 border border-gray-300 rounded h-64 flex flex-col items-center justify-center text-center p-4 text-gray-500">
                  <MapPin className="w-8 h-8 text-[#ce1b28] mb-2 animate-bounce" />
                  <p className="font-bold text-sm text-gray-700">Tultepec, Estado de México</p>
                  <p className="text-xs text-gray-500 mt-1">H. Ayuntamiento No. 4, Col. San Juan Xocotla, C.P. 54960</p>
                  <p className="text-[11px] text-gray-400 mt-2 font-mono">[ Espacio para mapa interactivo Google Maps / Leaflet ]</p>
                </div>
              </div>

              {/* Banner Sistemas Permitidos */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <ImagePlaceholder 
                  label="Banner: Sistemas Permitidos (Sistemas-permitidos.png)" 
                  height="h-28" 
                  note="Solvetic / Certificaciones"
                />
              </div>

            </div>
          </div>
        )}

        {/* ================= VISTA: VENTAS ================= */}
        {currentPage === 'ventas' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#222222]">Formulario de Ventas y Proyectos</h2>
                  <p className="text-xs text-gray-500 mt-1">Su dirección de correo permanecerá anónima. Los campos señalados con (*) son obligatorios.</p>
                </div>
                <ImagePlaceholder 
                  label="Logo ASF (ASF-LOGO.png)" 
                  width="w-28" 
                  height="h-20" 
                  note="Softlution"
                />
              </div>

              {ventasSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                  <h3 className="text-lg font-bold">¡Mensaje Enviado con Éxito!</h3>
                  <p className="text-xs">Gracias por escribirnos. Nuestro departamento de ventas revisará su información y se comunicará a la brevedad.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    setVentasSubmitted(true)
                    setTimeout(() => {
                      setVentasSubmitted(false)
                      setVentasForm({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
                    }, 5000)
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Tu nombre <span className="text-[#ce1b28]">(*)</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={ventasForm.nombre}
                      onChange={(e) => setVentasForm({...ventasForm, nombre: e.target.value})}
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
                        value={ventasForm.email}
                        onChange={(e) => setVentasForm({...ventasForm, email: e.target.value})}
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
                        value={ventasForm.telefono}
                        onChange={(e) => setVentasForm({...ventasForm, telefono: e.target.value})}
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
                      value={ventasForm.asunto}
                      onChange={(e) => setVentasForm({...ventasForm, asunto: e.target.value})}
                      placeholder="Cotización de proyecto, modernización, etc." 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Tu mensaje
                    </label>
                    <textarea 
                      rows={5}
                      value={ventasForm.mensaje}
                      onChange={(e) => setVentasForm({...ventasForm, mensaje: e.target.value})}
                      placeholder="Describa los requerimientos de su proceso o proyecto..." 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
                    />
                  </div>

                  <div>
                    <button 
                      type="submit" 
                      className="bg-[#ce1b28] hover:bg-[#b3131f] text-white font-bold px-6 py-2.5 rounded transition uppercase tracking-wider text-xs shadow-xs"
                    >
                      Enviar Mensaje
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

        {/* ================= VISTA: SOPORTE ================= */}
        {currentPage === 'soporte' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#222222]">Mesa de Ayuda y Soporte Técnico</h2>
                  <p className="text-xs text-gray-500 mt-1">Ingrese su requerimiento o reporte para ser atendido por nuestros ingenieros.</p>
                </div>
                <ImagePlaceholder 
                  label="Firma Softlution (firma_softlution.png)" 
                  width="w-32" 
                  height="h-20" 
                  note="Soporte y Garantía"
                />
              </div>

              {soporteSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                  <h3 className="text-lg font-bold">¡Ticket de Soporte Registrado!</h3>
                  <p className="text-xs">Un ingeniero especialista en automatización revisará su reporte técnico.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSoporteSubmitted(true)
                    setTimeout(() => {
                      setSoporteSubmitted(false)
                      setSoporteForm({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
                    }, 5000)
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Tu nombre <span className="text-[#ce1b28]">(requerido)</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={soporteForm.nombre}
                      onChange={(e) => setSoporteForm({...soporteForm, nombre: e.target.value})}
                      placeholder="Nombre del solicitante" 
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
                        value={soporteForm.email}
                        onChange={(e) => setSoporteForm({...soporteForm, email: e.target.value})}
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
                        value={soporteForm.telefono}
                        onChange={(e) => setSoporteForm({...soporteForm, telefono: e.target.value})}
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
                      value={soporteForm.asunto}
                      onChange={(e) => setSoporteForm({...soporteForm, asunto: e.target.value})}
                      placeholder="Incidencia en PLC, SCADA, sensor, etc." 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Tu mensaje
                    </label>
                    <textarea 
                      rows={5}
                      value={soporteForm.mensaje}
                      onChange={(e) => setSoporteForm({...soporteForm, mensaje: e.target.value})}
                      placeholder="Detalle la falla, equipo involucrado o asistencia requerida..." 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#ce1b28] focus:outline-hidden text-sm"
                    />
                  </div>

                  <div>
                    <button 
                      type="submit" 
                      className="bg-[#ce1b28] hover:bg-[#b3131f] text-white font-bold px-6 py-2.5 rounded transition uppercase tracking-wider text-xs shadow-xs"
                    >
                      Enviar Solicitud
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}
      </main>

      {/* ================= PIE DE PÁGINA / FOOTER (COPIA EXACTA) ================= */}
      <footer className="bg-[#1e1e1e] text-[#aaaaaa] text-xs py-8 border-t-2 border-[#ce1b28]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center leading-relaxed space-y-3">
          <p className="text-gray-300">
            2021© Automation Solutions Factory S.A. de C.V., Todos los derechos reservados. | H. Ayuntamiento No. 4
            Col. San Juan Xocotla, Tultepec, Edo. México . C.P. 54960 Tel: 5378-2110
          </p>
          <div className="flex justify-center space-x-6 text-[11px] text-gray-400">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition">Bienvenido</button>
            <span>•</span>
            <button onClick={() => navigateTo('nosotros')} className="hover:text-white transition">Quienes Somos</button>
            <span>•</span>
            <button onClick={() => navigateTo('servicios')} className="hover:text-white transition">Servicios</button>
            <span>•</span>
            <button onClick={() => navigateTo('clientes')} className="hover:text-white transition">Nuestros Clientes</button>
            <span>•</span>
            <button onClick={() => navigateTo('demo')} className="hover:text-white transition">Demo</button>
            <span>•</span>
            <button onClick={() => navigateTo('contacto')} className="hover:text-white transition">Contacto</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
