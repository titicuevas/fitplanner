# Usa la imagen oficial de Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /var/www

# Copiar el archivo package.json
COPY frontend/package.json frontend/package-lock.json ./

# Instalar las dependencias de React
RUN npm install

# Copiar todo el proyecto
COPY frontend/ .

# Exponer el puerto donde React escuchará
EXPOSE 3000

# Comando para ejecutar React
CMD ["npm", "start"]
