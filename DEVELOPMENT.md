# Guía de Desarrollo para FitPlanner

Este documento proporciona instrucciones para trabajar con FitPlanner tanto en desarrollo local como en despliegue a Railway.

## Configuración para Desarrollo Local

Para desarrollar localmente, sigue estos pasos:

1. **Restaurar el archivo index.php original**:
   ```bash
   cp public/index.php.local public/index.php
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Actualizar configuración de BD en .env**:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=tu_base_de_datos
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```

4. **Instalar dependencias y compilar assets**:
   ```bash
   composer install
   npm install
   npm run dev
   ```

5. **Ejecutar migraciones**:
   ```bash
   php artisan migrate
   ```

6. **Iniciar servidor de desarrollo**:
   ```bash
   php artisan serve
   ```

## Despliegue a Railway

Para desplegar a Railway, sigue estos pasos:

1. **Asegúrate de tener la versión de Railway de index.php**:
   ```bash
   # Si estás en desarrollo local y quieres volver a la versión para Railway
   git checkout origin/main -- public/index.php
   ```

2. **Commit de tus cambios**:
   ```bash
   git add .
   git commit -m "Descripción de tus cambios"
   git push
   ```

3. Railway automáticamente desplegará tu aplicación basándose en:
   - El archivo Procfile en la raíz del proyecto
   - Las variables de entorno configuradas en el panel de Railway

## Alternando entre entornos

- **De desarrollo a Railway**: Simplemente haz commit y push de tus cambios.
- **De Railway a desarrollo**: Ejecuta `cp public/index.php.local public/index.php` antes de comenzar a desarrollar.

## Estructura de archivos específicos de Railway

- `Procfile`: Define cómo se ejecuta la aplicación en Railway
- `public/index.php`: Versión con manejo de errores para producción
- `public/index.php.local`: Versión simplificada para desarrollo local
- `.env.example`: Template para variables de entorno de Railway 