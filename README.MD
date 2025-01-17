### caracteristicas

authenticación

crear, eliminar, editar recetas
crear, eliminar, editar calificationes para cada recetas

los campos de la receta son: title, description, ingredients, image.
los campos de las calificaciones son: rating, review.

### tecnologias

## back

expressjs
zod
cloudinary
jsonwebtoken
prisma

## front

react
zod
shadcnui
vite
tailwindcss
axios

## db

postgresql

## deploys

backend: Render

frontend: Vercel

database: Neon

### iniciar la applicación en local (docker)

asegurense de tener docker instalado.

solo ejecuten el script:

```
  $  ./mount.sh
```

si no funciona:

```
  $  chmod +x ./mount.sh
  $  ./mount.sh
```

si necesitan eliminar los contenedores:

```
  $ docker-compose rm -sf
```

## correr los test

solo agrege test para el modulo de autenticación.
estando en la carpeta /backend

```
  $  pnpm run test
```
