<div align="center">
  <img src="public/images/fitplanner-logo.png" alt="FitPlanner Logo" width="200"/>
</div>

# FitPlanner

FitPlanner es una aplicación web moderna diseñada para la gestión y seguimiento de entrenamientos CrossFit. Permite a los usuarios planificar sus WODs (Workout of the Day), realizar un seguimiento de sus progresos y gestionar sus objetivos de forma eficiente.

## 🚀 Características

- Planificación semanal de WODs
- Registro de resultados y notas
- Seguimiento de objetivos personales
- Diferentes categorías de entrenamiento (RX, Escalado, Élite)
- Interfaz moderna y responsive
- Notificaciones en tiempo real
- Modo oscuro

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - React
  - Tailwind CSS
  - SweetAlert2
  - Heroicons
  - DaisyUI

- **Backend:**
  - Laravel 12
  - PHP 8.2
  - SQLite
  - Redis
  - Nginx

## 🐳 Instalación con Docker

### Requisitos Previos
- Docker instalado en tu sistema ([Instalar Docker](https://docs.docker.com/get-docker/))
- Docker Compose instalado ([Instalar Docker Compose](https://docs.docker.com/compose/install/))
- Git instalado

### Pasos de Instalación

1. **Clonar el Repositorio**
```bash
git clone https://github.com/titicuevas/fitplanner.git
cd fitplanner
```

2. **Configurar el Entorno**
```bash
# Copiar el archivo de entorno
cp .env.example .env
```

3. **Construir y Levantar los Contenedores**
```bash
# Esto puede tomar unos minutos la primera vez
docker-compose up -d --build
```

4. **Instalar Dependencias y Configurar la Aplicación**
```bash
# Instalar dependencias de PHP
docker-compose exec app composer install

# Generar clave de la aplicación
docker-compose exec app php artisan key:generate

# Ejecutar migraciones
docker-compose exec app php artisan migrate

# Instalar dependencias de Node.js
docker-compose exec app npm install

# Compilar assets
docker-compose exec app npm run build
```

### Acceso a la Aplicación

Una vez completados los pasos anteriores, puedes acceder a:
- 🌐 **Aplicación Web**: [http://localhost:8000](http://localhost:8000)

### Comandos Útiles de Docker

```bash
# Ver el estado de los contenedores
docker-compose ps

# Ver logs de los contenedores
docker-compose logs -f

# Detener los contenedores
docker-compose down

# Reiniciar los contenedores
docker-compose restart

# Acceder al contenedor de la aplicación
docker-compose exec app bash
```

### Estructura de Docker

El proyecto utiliza tres servicios principales:

1. **App (PHP-FPM)**
   - PHP 8.2 con todas las extensiones necesarias
   - Composer para gestión de dependencias PHP
   - Node.js y NPM para assets

2. **Nginx**
   - Servidor web
   - Configurado para Laravel
   - Expone el puerto 8000

3. **Redis**
   - Caché y colas
   - Expone el puerto 6379

### Solución de Problemas Comunes

1. **Error de permisos**
```bash
# Ajustar permisos de storage
docker-compose exec app chmod -R 775 storage bootstrap/cache
```

2. **Error de base de datos**
```bash
# Recrear base de datos
docker-compose exec app php artisan migrate:fresh
```

3. **Error de dependencias**
```bash
# Limpiar caché de dependencias
docker-compose exec app composer clear-cache
docker-compose exec app composer install
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, lee el archivo CONTRIBUTING.md para más detalles.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE.md para más detalles.

## 👥 Autor

- **Nombre**: [Enrique Cuevas]
- **GitHub**: [@titicuevas](https://github.com/titicuevas)

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.
