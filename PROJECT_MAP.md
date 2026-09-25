# PROJECT_MAP: Gave Propiedades

## 1. Arquitectura y Grafo del Proyecto

```mermaid
graph TD
    %% Rutas Principales
    subgraph Rutas ["Páginas Web (HTML)"]
        Index["index.html (Página Principal)"]
        Catalog["catalog.html (Catálogo y Filtros)"]
        Property["property.html (Ficha Detalle Inmueble)"]
    end

    %% Módulos JS y Lógica
    subgraph ModulosJS ["Lógica de Negocio y Scripts"]
        MainJS["main.js / main.jsx"]
        CatalogJS["catalog.js"]
        PropertyJS["property.js"]
        DataJS["data.js (Base de Datos Inmuebles)"]
        GaveCarousel["src/components/GaveCarousel.jsx"]
    end

    %% Estilos y Frameworks
    subgraph UI_UX ["Estilos y Bibliotecas UI"]
        StyleCSS["style.css (Tailwind CSS v3 / Custom)"]
        LeafletCSS["leaflet/dist/leaflet.css"]
        GSAP["GSAP + ScrollTrigger (Animaciones)"]
        LeafletJS["Leaflet.js (Mapas Interactivos OSM/CartoDB)"]
        LucideIcons["Lucide Icons"]
        React19["React 19 + React-DOM"]
    end

    %% Base de Datos de Inmuebles
    subgraph Inmuebles ["Propiedades Registradas"]
        Ref002["ref-002: Apartaestudio Nuevo en Pinares ($130M COP)"]
    end

    %% Servicios Ofrecidos
    subgraph Servicios ["Servicios Inmobiliarios & Adicionales"]
        Srv1["Venta de Propiedades"]
        Srv2["Asesoría de Compra"]
        Srv3["Acompañamiento Legal"]
        Srv4["Arquitectura y Diseño (Servicio Adicional)"]
    end

    %% Recursos y Multimedia
    subgraph Assets ["Archivos Multimedia"]
        TeamImgs["public/Adriana.jpeg & public/Jhormary.jpeg (Carrusel de Asesoras)"]
        Ref002_Imgs["public/properties/ref-002/ (Fotos 1-8 Fachada a Interior)"]
        BrandLogo["public/logo.png / logo.svg"]
    end

    %% Relaciones
    Index --> MainJS
    Catalog --> CatalogJS
    Property --> PropertyJS

    MainJS --> DataJS
    MainJS --> GaveCarousel
    MainJS --> LeafletJS
    MainJS --> GSAP
    MainJS --> LucideIcons

    GaveCarousel --> TeamImgs

    CatalogJS --> DataJS
    PropertyJS --> DataJS
    PropertyJS --> LeafletJS

    Index --> Servicios

    DataJS --> Ref002
    Ref002 --> Ref002_Imgs

    Index --> StyleCSS
    Catalog --> StyleCSS
    Property --> StyleCSS
    MainJS --> LeafletCSS
    PropertyJS --> LeafletCSS
```

## 2. Descripción de Módulos y Nodos

- **`index.html` & `main.js`**:
  - Landing page institucional de Gave Propiedades.
  - Hero interactivo con llamada a la acción y animaciones GSAP.
  - Sección de Propiedad Destacada (`ref-002`) con ficha directa.
  - Mapa interactivo de cobertura con Leaflet.js centrado en las zonas activas.
  - Carrusel de equipo interactivo montado en React (`GaveCarousel.jsx`) con las fotos de **Adriana** (`/Adriana.jpeg`) y **Jhormary** (`/Jhormary.jpeg`).
  - Sección de **Servicios Inmobiliarios** con 4 tarjetas de alto impacto:
    1. Venta de Propiedades
    2. Asesoría de Compra
    3. Acompañamiento Legal
    4. **Arquitectura y Diseño** *(Servicio Adicional con botón de contacto directo)*.
  - Testimonios, proceso de compra/venta y FAQ.

- **`catalog.html` & `catalog.js`**:
  - Buscador y catálogo completo con filtros dinámicos (Tipo: Casas, Apartaestudios, Apartamentos, Lotes; Habitaciones; Rango de área en m²; Ordenamiento por precio).
  - Renderizado reactivo desde `data.js` con estados vacíos y feedback visual.

- **`property.html` & `property.js`**:
  - Ficha técnica completa del inmueble obtenido por parámetro `?id=ref-XXX` (por defecto `ref-002`).
  - Galería de imágenes interactiva organizada en la secuencia exacta solicitada:
    1. `foto_1.jpg` (Fachada - Portada)
    2. `foto_3.jpg` (Sala-comedor)
    3. `foto_6.jpg` (Habitación)
    4. `foto_4.jpg` (Cocina integral)
    5. `foto_5.jpg` (Zona de ropas / patio)
    6. `foto_7.jpg` (Alcoba)
    7. `foto_8.jpg` (Baño)
    8. `foto_2.jpg` (Acceso / Entrada)
  - Selector de imágenes con miniaturas y visualizador principal en alta resolución sin fotos duplicadas.
  - Reproductor de video tour integrado y modal lightbox a pantalla completa.
  - Mapa interactivo con Leaflet.js delimitando el radio de influencia y georreferenciación.
  - Botón de contacto directo por WhatsApp con mensaje preconfigurado con el título y referencia del inmueble.

- **`data.js`**:
  - Fuente única de la verdad con las propiedades publicadas:
    - `ref-002`: Apartaestudio Nuevo en Sector Pinares, Armenia (39 m², 1 hab, 1 baño, cocina integral, pisos en porcelanato, $130.000.000 COP).

## 3. Despliegue y Hosting
- **Plataforma**: Surge.sh (`https://gave-propiedades.surge.sh`)
- **Repositorio**: `github.com/RedbrickSeven8/gave-propiedades`
