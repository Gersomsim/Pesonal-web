---
title: '¡Crea Tu Propio Blog con Astro: Guía Completa!'
description: Construye un blog rápido y moderno con Astro. Aprende a integrar Markdown, Tailwind CSS y Node.js en esta guía completa paso a paso para desarrolladores.
pubDate: 2025-06-26
author: Gersom Hernandez
slug: 'crear-blog-estatico-con-astro'
tags: ['Astro', 'Blog']
image:
  url: '/assets/blog/blog-astro.png'
  alt: 'Desplegar sitio Astro en Railway'
---

**¡Hola, desarrolladores!** Si estás buscando una forma rápida y eficiente de lanzar tu propio blog, has llegado al lugar correcto. Hoy vamos a construir un blog funcional utilizando Astro, una herramienta increíblemente rápida y flexible.

Una nota importante antes de empezar: este blog no incluirá un sistema de comentarios integrado. Gestionar comentarios de usuarios e invitados requiere un backend robusto (ya sea con la API de **WordPress**, **Node.js**, **Laravel** u otros lenguajes de servidor), y para simplificar, nos centraremos en la creación del contenido estático. ¡Pero no te preocupes, lo que aprenderás aquí te dará una base sólida para futuras expansiones!

### ¿Qué Necesitaremos?

Para seguir este tutorial, asegúrate de tener a mano:

- Node.js v18 o superior
- Tailwind CSS
- Tu editor de código favorito
- Una terminal
- Conocimientos básicos de Astro y Markdown

## Inicializando Nuestro Proyecto con Astro

Llamaremos a nuestro proyecto `md-blog`, haciendo referencia a la facilidad con la que manejaremos archivos Markdown. Para empezar, ejecuta los siguientes comandos en tu terminal. El primero creará el proyecto y el segundo te llevará a la carpeta del mismo. Siéntete libre de elegir otro nombre para tu proyecto, o si prefieres, puedes hacer un fork de mi repositorio (encontrarás el enlace al final del post).

```bash
npm create astro@latest md-blog -- --template basics
cd md-blog
```

Una vez que el proyecto esté inicializado, solo nos quedarán cuatro pasos clave para terminar nuestro blog. ¡Vamos a ello!

### La Hoja de Ruta: 4 Pasos Cruciales

1.- **Archivos de Configuración**: Prepararemos Astro para leer nuestros posts en Markdown.
2.- **Estructura de Carpetas**: Organizaremos nuestro proyecto de manera limpia y eficiente.
3.- **Templates Básicos**: Crearemos las plantillas para la página principal (`index`) y la vista individual de cada post.
4.- **Escribir Nuestro Primer Post**: ¡La parte más emocionante!

Con nuestras tareas claras, ¡manos a la obra!

## Paso 1: Archivos de Configuración

Para que Astro pueda interpretar nuestros archivos `.md` y `.mdx`, necesitamos instalar un paquete adicional:

```bash
npm install @astrojs/mdx
```

Este paquete es fundamental porque nos permite combinar la simplicidad de **Markdown** para escribir contenido con la flexibilidad y el poder de los componentes de UI (JSX) en tu proyecto Astro. Si quieres profundizar, puedes revisar la <a href="https://docs.astro.build/en/guides/integrations-guide/mdx/" target="_blank">documentación oficial.</a>

Ahora, modificaremos nuestro archivo `astro.config.mjs` para integrar el manejo de Markdown y MDX. Abre el archivo y asegúrate de que se vea así:

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [mdx()], // ¡Agregamos la integración MDX aquí!
  markdown: {
    shikiConfig: {
      theme: 'github-dark', // Mi tema favorito, ¡elige el tuyo!
      langs: [], // Deja vacío para carga dinámica o especifica tus lenguajes
    },
    syntaxHighlight: 'shiki',
  },
  site: 'https://blog-asombroso.com', // ¡Importante: cambia esto por tu dominio real!
});
```

#### Un Vistazo a la Configuración de Markdown

Te explico brevemente las opciones que hemos añadido en la sección `markdown`:

- `syntaxHighlight: 'shiki'`: Esto le indica a Astro que usaremos Shiki como motor principal para el resaltado de sintaxis. **Shiki** es popular porque genera HTML con estilos CSS en línea, lo que garantiza que el resaltado se vea perfecto sin configuraciones CSS adicionales de tu parte.

- `shikiConfig`: Este objeto te permite personalizar Shiki.

- `theme: 'github-dark'`: Aquí definimos el tema de color para el resaltado. Shiki incluye muchísimos temas predefinidos (como `nord`, `min-light`, `dracula`, etc.). ¡Experimenta y elige el que mejor se adapte al diseño de tu blog!

- `langs: []`: Esta opción te permite especificar qué lenguajes de programación quieres que Shiki cargue. Si lo dejas como un array vacío (`[]`), Shiki detectará y cargará dinámicamente los lenguajes según los necesite (por ejemplo, si especificas `javascript` en tu bloque de código). Si quieres asegurarte de que ciertos lenguajes estén siempre disponibles, o si tienes bloques de código sin el lenguaje especificado, puedes listarlos aquí (ej:`['javascript', 'typescript']`).

#### Archivo src/content/config.ts

Este archivo es crucial para definir la estructura de nuestro contenido. Lo crearemos en `src/content/config.ts` y agregaremos el siguiente código:

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default('Anónimo'), // Autor por defecto si no se especifica
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(), // La imagen es opcional
    tags: z.array(z.string()).default([]), // Un array de tags, vacío por defecto
  }),
});

// Exportamos la configuración para que Astro la utilice
export const collections = {
  blog: blogCollection,
};
```

#### ¿Qué hace este código?

Básicamente, este código define el "**esquema**" o la estructura de los datos que Astro esperará encontrar en cada uno de los archivos de tu colección de contenido `blog`. Piensa en ello como una "plantilla" o "contrato" que cada entrada de blog debe seguir.

La línea `export const collections = { 'blog': blogCollection, }; `registra nuestra `blogCollection` bajo el nombre **'blog'**. Astro usará este nombre para saber dónde buscar tus entradas de blog (generalmente en `src/content/blog/`).

En resumen, este código es la columna vertebral de cómo Astro gestiona y valida tu contenido estructurado, permitiéndote construir sitios robustos y bien organizados.

## Paso 2: Estructura de Carpetas

Una estructura de carpetas clara y bien definida es fundamental en cualquier proyecto. Nos facilita la implementación de nuevas funcionalidades y el mantenimiento. Para nuestro blog, usaremos la siguiente organización:

```
src/
├── content/
│ ├── blog/
│ │ ├── post1.md
│ │ ├── post2.md
│ │ └── ... (Aquí irán todos tus posts en Markdown)
├── components/
│ ├── atoms/
│ │ ├── Tag.astro
│ ├── molecules/
│ │ ├── Avatar.astro
│ ├── organisms/
│ │ ├── Aside.astro
│ ├── templates/
│ │ ├── BlogPost.astro (Plantilla para previsualizar posts en la lista)
│ │ └── Post.astro (Plantilla para la vista individual de un post)
├── layouts/
│ └── Layout.astro (Layout principal de la página)
├── pages/
│ ├── index.astro (Página de inicio del blog)
│ └── blog/
│ └── [...slug].astro (Página dinámica para cada post)
└── styles/
└── global.css
```

Como verás, en la carpeta `components` estoy aplicando los principios de **Atomic Design** (`atoms`, `molecules`, `organisms`, `templates`). Esto me permite tener un mejor control de los elementos y maximizar la reutilización del código.

Dentro de esta estructura, las carpetas `pages` y `content` son las más importantes para el funcionamiento de nuestro blog.

## Paso 3: Templates Básicos

Ahora, vamos a crear las plantillas esenciales para nuestro blog.

`Layout.astro`

Usaremos el layout que se generó con el boilerplate de Astro. Solo necesitaremos pasarle algunas `props` para el título y la descripción de la página:

```astro
---
const { title, description } = Astro.props;
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    <meta name="description" content={description} />
    </head>
  <body>
    <slot />
  </body>
</html>
```

`BlogPost.astro` (`src/components/templates/BlogPost.astro`)

Esta plantilla se encargará de mostrar una vista previa de cada post en la lista de la página principal.

```astro
---

export interface Props {
post: any; // Considera tipar 'post' más específicamente si usas TypeScript
}

const { post } = Astro.props;
---

<div class="mb-10">
  <a href={`/blog/${post.slug}`} class="no-underline">
    <h2 class="text-xl font-bold hover:text-blue-600">{post.data.title}</h2>
  </a>
  <p class="text-gray-600">{post.data.description}</p>
  <div class="flex items-center text-sm text-gray-500">
    <span>{post.data.pubDate.toLocaleDateString('es-ES')}</span>
    <span class="mx-2">•</span>
    <span>{post.data.author}</span>
  </div>
</div>
```

`index.astro` (`src/pages/index.astro`)

Esta será la página principal de nuestro blog, donde listaremos las publicaciones.

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';
import BlogPost from '../components/templates/BlogPost.astro';

// Obtenemos todas las publicaciones y las ordenamos por fecha de publicación (más reciente primero)
const posts = (await getCollection('blog')).sort(
(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
);
---

<Layout title="Mi Blog Astro" description="Bienvenido a mi blog personal y tutoriales de desarrollo web.">
  <h1 class="text-4xl font-bold mb-8">Bienvenido a mi Blog</h1>

  <div class="grid gap-8">
    {posts.slice(0, 5).map((post) => ( // Mostramos solo los 5 posts más recientes
      <BlogPost post={post} />
    ))}
  </div>
</Layout>
```

`Post.astro` (`src/components/templates/Post.astro`)

Este es el layout que utilizará cada post individual.

```astro
---
import Layout from '../../layouts/Layout.astro';
const { content } = Astro.props;
---

<Layout title={content.data.title} description={content.data.description}>
  <article class="prose lg:prose-xl mx-auto">
    <h1>{content.data.title}</h1>
    <p class="text-gray-500">
      Publicado el {content.data.pubDate.toLocaleDateString('es-ES')} por {content.data.author}
    </p>
    <slot /> {/* Aquí se insertará el contenido Markdown del post */}
  </article>
</Layout>
```

#### Página Dinámica para Posts (`src/pages/blog/[...slug].astro`)

Esta es la pieza clave para que Astro genere una página por cada uno de tus posts en Markdown.

```astro
---
import { getCollection } from 'astro:content';
import Post from '../../components/templates/Post.astro';

// getStaticPaths es esencial para generar rutas estáticas para cada post
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug }, // El slug define la URL del post
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render(); // Renderiza el contenido Markdown
---

<Post content={post}>
  <Content />
</Post>
```

## Paso 4: Escribir Nuestro Primer Post

¡Llegó el momento de crear tu primera publicación! Dirígete a `src/content/blog/` y crea un nuevo archivo llamado `hola-mundo.md`. Pega el siguiente contenido:

````markdown
---
title: Mi Primera Publicación en Astro
pubDate: 2023-11-15
description: Esto es mi primera publicación en el blog usando Astro y Markdown.
author: Tu Nombre
image:
  url: '/images/post1.jpg'
  alt: 'Imagen descriptiva de un blog'
tags:
  - astro
  - blog
  - tutorial
---

# ¡Hola Mundo!

Este es el contenido de mi primera publicación usando **Markdown** con Astro. ¡Es increíblemente fácil!

## Características que me encantan

- **Facilidad de uso**: Escribe tus posts en Markdown de forma sencilla.
- **Rendimiento Rápido**: Astro genera sitios estáticos súper rápidos.
- **SEO Friendly**: Optimizado para motores de búsqueda desde el inicio.

```javascript
// Un pequeño ejemplo de código para mostrar el resaltado de sintaxis
console.log('¡Tu blog está en marcha!');
```
````

## Agregando Estilos con Tailwind CSS

Para darle una apariencia más atractiva a nuestro blog, utilizaremos Tailwind CSS. Si aún no lo has integrado, primero ejecútalo:
Bash

```bash
npx astro add tailwind
```

Ahora, abre tu archivo `src/styles/global.css` y agrega estos estilos básicos que aprovechan las utilidades de Tailwind:

```css
@import 'tailwindcss';

@layer base {
  body {
    @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100;
    @apply min-h-screen font-sans; /* Agrega una fuente base si no tienes */
  }
}

/* Estilos para el contenido Markdown usando @tailwindcss/typography */
.prose {
  @apply max-w-none; /* Permite que el contenido ocupe todo el ancho disponible */
}

.prose img {
  @apply rounded-lg shadow-lg; /* Imágenes con esquinas redondeadas y sombra */
}

/* Opcional: Estilos para enlaces y otros elementos dentro de .prose */
.prose a {
  @apply text-blue-600 hover:underline;
}

.prose h1,
.prose h2,
.prose h3 {
  @apply font-bold mt-8 mb-4;
}
```

#### ¡Listo! Tu Blog Funcional con Astro

**¡Felicidades!** Has configurado y lanzado un blog completamente funcional con Astro. Ahora puedes seguir creando más posts simplemente añadiendo archivos Markdown a la carpeta `src/content/blog/`.

Te comparto el enlace de <a href="https://github.com/Gersomsim/md-blog" target="_blank">repositorio</a> donde subi el proyecto. ¡Siéntete libre de contribuir o de usarlo como punto de partida para tu propio blog personal! Solo haz un fork del repositorio.

Resultado en vercel <a href="https://md-blog-xi.vercel.app" target="_blank">MD Blog</a>

¡Muchas gracias por llegar hasta aquí! Te mando un saludo y recuerda: **nunca es tarde para aprender**.
