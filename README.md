# FitPlanner 🏋️‍♂️

![FitPlanner Logo](public/images/fitplanner-logo.png)

FitPlanner es una aplicación web diseñada para ayudarte a planificar y realizar un seguimiento de tus entrenamientos de CrossFit. La aplicación está construida con Laravel, React, Inertia.js y Tailwind CSS.

## Características Principales

- 📅 Planificación semanal de entrenamientos
- 🎯 Objetivos personalizados según tus necesidades
- 📊 Seguimiento de progreso
- 📝 Registro de entrenamientos completados
- 👤 Perfil personalizable
- 🏆 Sistema de puntuación para WODs

## Tecnologías Utilizadas

### Backend
- **Framework**: Laravel 12
- **Base de datos**: PostgreSQL 15
- **Autenticación**: Laravel Sanctum
- **Validación**: Laravel Validation
- **Testing**: PHPUnit
- **Manejo de archivos**: Laravel Storage

### Frontend
- **Framework**: React 18
- **Routing**: Inertia.js
- **Estilos**: Tailwind CSS
- **Componentes UI**: 
  - Headless UI
  - Heroicons
- **Testing**: 
  - Jest
  - React Testing Library
- **Manejo de estado**: 
  - React Hooks
  - Inertia.js Forms
- **Optimización de imágenes**: UI Avatars API

### Desarrollo
- **Versionado**: Git
- **Despliegue**: Railway
- **Linting**: ESLint
- **Formateo**: Prettier
- **Bundling**: Vite
- **Transpilación**: Babel

## Requisitos del Sistema

- PHP 8.2 o superior
- Node.js 18 o superior
- PostgreSQL 15 o superior
- Composer
- NPM

## Instalación Local

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/fitplanner.git
cd fitplanner
```

2. Instalar dependencias de PHP:
```bash
composer install
```

3. Instalar dependencias de JavaScript:
```bash
npm install
```

4. Configurar el archivo .env:
```bash
cp .env.example .env
```

5. Configurar las variables de entorno en .env:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=fitplanner
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

6. Generar la clave de aplicación:
```bash
php artisan key:generate
```

7. Ejecutar las migraciones:
```bash
php artisan migrate
```

8. Compilar los assets:
```bash
npm run build
```

9. Iniciar el servidor de desarrollo:
```bash
php artisan serve
```

## Testing

### Tests de PHP
```bash
php artisan test
```

### Tests de JavaScript
```bash
npm test
```

## Despliegue en Railway

El proyecto está configurado para desplegarse en Railway. Para desplegar tu propia instancia:

1. Crea una cuenta en [Railway](https://railway.app/)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno en Railway:
   - `APP_KEY`
   - `DB_CONNECTION`
   - `DB_HOST`
   - `DB_PORT`
   - `DB_DATABASE`
   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `APP_URL`
   - `RAILWAY_STATIC_URL`

4. Railway se encargará automáticamente del despliegue cuando hagas push a tu repositorio.

## Estructura del Proyecto

```
fitplanner/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Requests/
│   ├── Models/
│   └── Services/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   ├── Layouts/
│   │   ├── Pages/
│   │   └── __tests__/
│   └── css/
├── routes/
└── tests/
```

## Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Para cualquier consulta o sugerencia, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️ por [Enrique Cuevas]
