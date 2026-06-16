# BitFree

Sitio web informativo sobre GNU/Linux con 4 secciones: Landing page, ¿Qué es Linux?, Encuesta y Timeline.

## Requisitos

- Node.js (v12+)
- MySQL (XAMPP, WAMP o similar)

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Matheuzz-underdog/BitFree.git
cd BitFree

# 2. Instalar dependencias
npm install

# 3. Ejecutar migraciones (crea tabla y datos de prueba)
npm run db:estructura
npm run db:prueba
```

## Uso

```bash
# Producción
npm start

# Desarrollo 
npm run dev
```

El servidor corre en `http://localhost:3000`.

### Rutas

 `/` | Landing page |
 `/que-es-linux` | Información sobre GNU/Linux + carrusel de distribuciones |
 `/encuesta` | Formulario de encuesta + top 3 distribuciones |
 `/timeline` | Línea de tiempo interactiva con SVG |