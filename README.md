# Softlution! – Automatización Industrial (Migrado a Astro)

Sitio web corporativo de **Softlution! (Automation Solutions Factory S.A. de C.V.)**, especialistas en automatización industrial, control de procesos, tableros PLC, sistemas SCADA e instalaciones de baja tensión.

Este proyecto ha sido completamente migrado de una arquitectura monolítica SPA (React 19 en un único archivo de más de 1,400 líneas) a **Astro**, aprovechando el **renderizado estático (SSG)** y la **Arquitectura de Islas (Islands Architecture)**.

---

## 🚀 Guía de Aprendizaje: Conceptos Clave de Astro

Astro es un framework web diseñado para sitios centrados en contenido que ofrece **0 KB de JavaScript en el cliente por defecto**. A continuación se detallan los conceptos implementados en esta base de código:

### 1. Anatomía de un Componente `.astro`
Cada archivo `.astro` se divide en dos partes:

```astro
---
// 1. COMPONENT SCRIPT (Frontmatter delimitado por ---)
// Se ejecuta EXCLUSIVAMENTE en tiempo de compilación en tu máquina o servidor.
// Nunca se envía al navegador del usuario final.
import Layout from '../layouts/Layout.astro';
import MiComponente from '../components/MiComponente.astro';

interface Props {
  titulo: string;
}

const { titulo } = Astro.props;
---

<!-- 2. COMPONENT TEMPLATE (HTML con sintaxis declarativa tipo JSX) -->
<!-- Se compila directamente a HTML plano y optimizado. -->
<div class="tarjeta">
  <h2>{titulo}</h2>
  <slot />
</div>
```

### 2. Enrutamiento Basado en Archivos (*File-based Routing*)
No necesitas configurar enrutadores manuales (`react-router-dom` ni estados `useState`). Cada archivo dentro de `src/pages/` genera automáticamente su propia URL:

| Archivo | Ruta generada en el navegador |
|---|---|
| `src/pages/index.astro` | `/` (Página de inicio) |
| `src/pages/nosotros.astro` | `/nosotros` (Quiénes Somos) |
| `src/pages/servicios.astro` | `/servicios` (Servicios industriales) |
| `src/pages/clientes.astro` | `/clientes` (Portafolio de clientes) |
| `src/pages/demo.astro` | `/demo` (Simulaciones SCADA Diversey) |
| `src/pages/contacto/index.astro` | `/contacto` (Información de contacto) |
| `src/pages/contacto/ventas.astro` | `/contacto/ventas` (Formulario de cotizaciones) |
| `src/pages/contacto/soporte.astro` | `/contacto/soporte` (Mesa de ayuda y tickets) |
| `src/pages/404.astro` | Página 404 automática para enlaces rotos |

### 3. Plantillas Maestras (*Layouts*) y la etiqueta `<slot />`
Para no duplicar el `<head>`, las tipografías de Google Fonts (`Dosis`, `Open Sans`), el `Header` ni el `Footer`, se utiliza `src/layouts/Layout.astro`.

La etiqueta `<slot />` funciona de manera análoga al `children` de React: es el contenedor donde se inyecta el contenido específico de cada página.

```astro
<Layout title="Mi Título">
  <!-- Todo lo que esté aquí se inserta en el <slot /> del Layout -->
  <h1>Contenido de la página</h1>
</Layout>
```

### 4. Arquitectura de Islas (*Islands Architecture*)
En lugar de convertir todo el sitio en una aplicación SPA con React, Astro mantiene el 99% del portal como HTML estático ultrarrápido y solo hidrata componentes interactivos donde sea estrictamente necesario.

En este proyecto, los formularios interactivos residen en `src/components/islands/`:
- `VentasForm.jsx` (React con validación y estados locales)
- `SoporteForm.jsx` (React para captura de incidencias)

Se invocan en los archivos `.astro` con la directiva `client:load`:
```astro
---
import VentasForm from '../../components/islands/VentasForm.jsx';
---

<!-- Solo este formulario descargará e hidratará JavaScript en el cliente -->
<VentasForm client:load />
```

Directivas de cliente comunes en Astro:
- `client:load`: Se hidrata inmediatamente en la carga de la página.
- `client:idle`: Se hidrata una vez que el navegador termina de renderizar las tareas prioritarias.
- `client:visible`: Se hidrata únicamente cuando el usuario hace scroll y el componente entra en el viewport.

### 5. Scripts de Cliente Ligeros (`<script>`)
En componentes como `Header.astro`, para alternar el menú móvil o los menús desplegables sin cargar React, se utiliza una etiqueta `<script>` estándar:
Astro empaqueta, minifica y optimiza automáticamente este script con un peso de menos de 1 KB.

---

## 📁 Estructura del Proyecto

```
4.ASF.WEB/
├── astro.config.mjs            # Configuración de integraciones (React + Tailwind v4)
├── package.json                # Dependencias del proyecto
├── dist/                       # Salida compilada lista para producción
├── src/
│   ├── assets/                 # Recursos gráficos
│   ├── components/             # Componentes reutilizables
│   │   ├── Header.astro        # Barra de navegación principal y responsive
│   │   ├── Footer.astro        # Pie de página corporativo
│   │   ├── PageBanner.astro    # Migas de pan y título de sección
│   │   ├── ImagePlaceholder.astro # Marcador para imágenes pendientes
│   │   └── islands/            # Islas de interactividad (React)
│   │       ├── VentasForm.jsx  # Formulario de cotización de proyectos
│   │       └── SoporteForm.jsx # Formulario de tickets de soporte técnico
│   ├── layouts/
│   │   └── Layout.astro        # Estructura maestra HTML
│   ├── pages/                  # Enrutamiento basado en archivos
│   │   ├── index.astro         # /
│   │   ├── nosotros.astro      # /nosotros
│   │   ├── servicios.astro     # /servicios
│   │   ├── clientes.astro      # /clientes
│   │   ├── demo.astro          # /demo
│   │   ├── 404.astro           # /404
│   │   └── contacto/
│   │       ├── index.astro     # /contacto
│   │       ├── ventas.astro    # /contacto/ventas
│   │       └── soporte.astro   # /contacto/soporte
│   └── styles/
│       └── global.css          # Tailwind CSS v4 y estilos de marca (#ce1b28)
```

---

## 🛠️ Comandos de Desarrollo y Construcción

Para ejecutar comandos en Windows PowerShell, utiliza `npm.cmd`:

```bash
# Iniciar servidor de desarrollo local con HMR (Hot Module Replacement)
npm run dev

# Compilar para producción (genera la carpeta dist/ con HTML estático)
npm run build

# Previsualizar la versión compilada de producción localmente
npm run preview
```
