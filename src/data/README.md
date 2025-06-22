# Sistema de Proyectos Dinámico

Este directorio contiene los archivos de datos para hacer dinámica la sección de proyectos del portafolio.

## Archivos

- `projects.json`: Contiene la información de todos los proyectos

## Estructura del JSON

Cada proyecto debe tener la siguiente estructura:

```json
{
  "id": 1,
  "title": "Nombre del Proyecto",
  "type": "Tipo (Front, API, etc.)",
  "status": "reciente|desarrollo|completado",
  "statusText": "Texto del badge",
  "description": "Descripción del proyecto",
  "technologies": [
    {
      "name": "Nombre de la tecnología",
      "github": "URL del repositorio (opcional)"
    }
  ],
  "link": "URL del proyecto",
  "linkText": "Texto del botón"
}
```

## Estados disponibles

- `reciente`: Muestra un badge amarillo
- `desarrollo`: Muestra un badge rojo
- `completado`: No muestra badge (opcional)

## Cómo agregar un nuevo proyecto

1. Abre el archivo `projects.json`
2. Agrega un nuevo objeto al final del array
3. Asigna un `id` único
4. Completa todos los campos requeridos
5. Guarda el archivo

El componente `portfolio.astro` automáticamente renderizará el nuevo proyecto.

## Ejemplo de nuevo proyecto

```json
{
  "id": 5,
  "title": "Mi Nuevo Proyecto",
  "type": "Full Stack",
  "status": "reciente",
  "statusText": "Reciente",
  "description": "Descripción de mi nuevo proyecto...",
  "technologies": [
    {
      "name": "React",
      "github": "https://github.com/usuario/repo"
    },
    {
      "name": "Node.js",
      "github": null
    }
  ],
  "link": "https://mi-proyecto.com",
  "linkText": "Visitar"
}
```
