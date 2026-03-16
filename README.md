This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Diseño V0

Estoy construyendo "Tienda TDEA", un marketplace universitario donde estudiantes publican y venden productos. El contacto comprador-vendedor es directo por WhatsApp — sin pagos en la plataforma.

## Diseño actual
- Inspiración: Vinted y Wallapop
- Estilo: minimalista, limpio, moderno
- Color primario: verde esmeralda oklch(0.55 0.17 160) — color institucional TDEA
- Fuentes: Geist Sans + Geist Mono
- Bordes redondeados: --radius: 0.75rem
- Sistema de colores: shadcn/ui con variables CSS oklch (light + dark mode)
- Componentes: shadcn/ui (Button con variantes: default, destructive, outline, secondary, ghost, link)

## Páginas ya diseñadas e implementadas
1. Home — grid de productos 2col mobile / 3col tablet / 4col desktop, paginación
2. Detalle producto [slug] — dos columnas: slideshow imágenes izquierda, info derecha (título, categoría pill, precio grande, botón WhatsApp verde full width rounded-full)
3. Login — card centrada, form email + password
4. Register — card centrada, form fullName + email + password + WhatsApp (con prefijo +57 estático)

## ProductCard (ya implementada)
- aspect-square imagen con rounded-xl
- hover: scale-105 en imagen
- botón favorito top-right, aparece en hover
- precio bold arriba, título muted debajo, tag pill, nombre vendedor

## Lo que falta diseñar
[AQUÍ describes qué página o componente necesitas]

## Restricciones
- Solo TypeScript y Tailwind CSS
- Mismo design system que las páginas existentes
- Sin librerías de animación externas
- Mobile first
- No incluir flujos de pago



## Arquitectura

Estoy construyendo "Tienda TDEA", un marketplace universitario. Retomamos el desarrollo donde lo dejamos.

## Stack Frontend
- Next.js 14+ App Router, TypeScript strict, Tailwind CSS
- Zustand para estado global de auth
- Axios con interceptor Bearer automático
- React Hook Form + Zod para formularios
- shadcn/ui para componentes base
- Arquitectura por features con separación de responsabilidades

## Estructura
src/
├── app/(auth)/login | register | layout.tsx
├── app/(main)/page.tsx | products/[slug] | dashboard
├── features/auth/ → types, services, hooks, components
├── features/products/ → types, services, hooks, components
├── store/auth.store.ts → Zustand con persist
├── lib/axios.ts + constants.ts
└── components/ui + layout

## Backend (NestJS desplegado en Render)
URL: https://tiendatdeaback.onrender.com/api
- POST /auth/register → { email, password, fullName, WhattsapNumber }
- POST /auth/login → { token, user }
- GET /auth/check-status → revalida sesión, requiere Bearer
- GET /products → listado paginado (limit, offset)
- GET /products/:term → detalle por slug o id
- POST /products → crear, requiere Bearer
- PATCH /products/:id → editar, requiere Bearer
- DELETE /products/:id → eliminar, requiere Bearer
- POST /file/product → subir imagen, requiere Bearer → retorna secure_url

## Decisiones técnicas tomadas
- Sin NextAuth — JWT propio guardado en localStorage (clave: tdea_token)
- Auth store: { user, token, status: checking|authenticated|unauthenticated }
- WhattsapNumber con W mayúscula — igual que el backend
- +57 se agrega en el frontend al construir URL de WhatsApp, no se guarda en BD
- images es array de objetos { id: number, url: string }
- url puede ser nombre de archivo o URL completa de Cloudinary
- Cloudinary cloud name: dtdiyk4iv
- CLOUDINARY_BASE_URL = https://res.cloudinary.com/dtdiyk4iv/image/upload
- resolveImageUrl() maneja 3 casos: URL completa, solo nombre, inválida → fallback

## Estado actual del proyecto
✅ lib/axios.ts + constants.ts
✅ store/auth.store.ts con Zustand persist
✅ features/auth/types.ts + services + hooks (useAuth, useLogin, useRegister)
✅ features/auth/components (LoginForm, RegisterForm)
✅ features/products/types.ts + services + hooks (useProducts, useProduct)
✅ features/products/components (ProductCard, ProductGrid, ImageSlideshow)
✅ app/(auth)/login + register + layout
✅ app/(main)/page.tsx — Home con grid y paginación
✅ app/(main)/products/[slug]/page.tsx — Detalle con WhatsApp
✅ AuthProvider revalida sesión con /auth/check-status al montar
✅ next.config.ts con Cloudinary remotePatterns

🔧 EN PROGRESO: Navbar conectado al estado de auth
⬜ PENDIENTE: Dashboard (mis productos, crear, editar)
⬜ PENDIENTE: Rutas protegidas para dashboard

## Contexto adicional
- Render (backend gratuito) puede tardar en despertar — CORS habilitado para localhost:3000
- El buscador está pendiente — se implementará con búsqueda en backend cuando haya más productos
- Roles: user (estudiante) y admin
