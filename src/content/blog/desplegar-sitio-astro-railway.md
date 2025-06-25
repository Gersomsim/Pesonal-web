---
title: Cómo desplegar un sitio Astro estático en Railway
description: Aprende paso a paso cómo desplegar tu sitio web estático creado con Astro en Railway de forma sencilla y rápida. Esta guía te muestra cómo configurar tu proyecto, conectar con GitHub y publicar tu sitio en minutos. Ideal para desarrolladores que buscan una solución alterna.
pubDate: 2025-06-25
author: Gersom Hernandez
slug: 'desplegar-sitio-estatico-en-astro-en-railway'
tags: ['Railway', 'Astro', 'Deploy']
image:
  url: '/assets/blog/deploy-astro-in-railway.png'
  alt: 'Desplegar sitio Astro en Railway'
---

Antes de comenzar, ten en cuenta que hay dos formas de desplegar un sitio hecho con Astro en Railway:

- **Sitios con SSR**: Si tu sitio usa renderizado del lado del servidor o adaptadores
- **Sitios estáticos**: Si tu sitio es completamente estático

Este post se enfoca en la segunda opción: desplegar un sitio Astro completamente estático en Railway.

## 1. Inicializa tu proyecto Astro

Primero, crea tu proyecto con Astro. Abre la terminal y ejecuta:

```bash
npm create astro@latest
```

Sigue las instrucciones para configurar un sitio estático. En mi caso, estoy construyendo un portafolio personal para mostrar mis proyectos.

Puedes hacer fork o contribuir a mi repositorio aquí: [https://github.com/Gersomsim/Pesonal-web](https://github.com/Gersomsim/Pesonal-web)

## 2. Prepara tu sitio para el despliegue

Una vez que tu sitio esté listo, modifica el archivo `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "start": "npx serve dist"
  }
}
```

> **Nota**: El script `start` es crucial para sitios Astro estáticos en Railway.

Luego, agrega esto al final del `package.json`:

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

Esto indica a Railway la versión mínima de Node.js requerida.

## 3. Archivos de configuración

### 3.1 astro.config.mjs

Los proyectos generados con Astro ya están configurados para salida estática por defecto. Solo asegúrate de que esté así:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // output: "static" (valor por defecto)
});
```

Descomenta la línea de `output` si tienes dudas, pero ya viene como `static` por defecto.

### 3.2 Crea el archivo de configuración de Railway (railway.json)

Agrega este archivo para indicarle al builder de Railway cómo proceder:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@railway/nixpacks"
    }
  ]
}
```

### 3.3 Opcional: static.json (Configuración del servidor estático)

Crea este archivo si quieres definir cómo se sirven los archivos estáticos:

```json
{
  "root": "dist",
  "clean_urls": true,
  "routes": {
    "**": "index.html"
  }
}
```

## ¡Listo para desplegar!

Con estos pasos, tu sitio estático ya está preparado para Railway.

El despliegue es muy sencillo:

1. Inicia sesión en Railway con tu cuenta de GitHub
2. Da acceso al repositorio
3. Selecciona tu repo
4. Railway se encarga del resto automáticamente

## ¿Por qué usar Railway?

Quizá te preguntes: "¿Por qué Railway y no Vercel o Netlify?" Aunque hay buenas alternativas, elegí Railway por su **plan Hobby de $5 USD al mes**. Con eso puedo alojar:

- Proyectos frontend
- APIs backend (Laravel, NestJS, etc.)
- Todo mi portafolio personal

Por el precio de un café, evito usar varios servicios distintos.

---

¡Gracias por leer mi primer post! 🚀

¡Saludos!
