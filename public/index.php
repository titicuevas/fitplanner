<?php
// Este es un archivo de respaldo estático que se muestra cuando Laravel no puede iniciarse
// Desactivar todos los mensajes de error
ini_set('display_errors', '0');
error_reporting(0);

// Imprimir una página HTML estática
echo '<!DOCTYPE html>
<html>
<head>
    <title>FitPlanner - En mantenimiento</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #333; line-height: 1.6; }
        .container { max-width: 800px; margin: 40px auto; padding: 20px; }
        .card { background: white; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #4CAF50; margin-top: 0; }
        .logo { text-align: center; margin-bottom: 30px; }
        .logo h1 { font-size: 2.5em; margin-bottom: 5px; }
        .subtitle { color: #666; font-size: 1.2em; text-align: center; margin-bottom: 30px; }
        .status { margin: 20px 0; padding: 15px; background: #fdf7f7; border-left: 5px solid #d9534f; }
        .button { display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; 
                 text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 15px; }
        .button:hover { background: #45a049; }
        .footer { text-align: center; margin-top: 40px; font-size: 0.9em; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <h1>FitPlanner</h1>
            <p class="subtitle">Planificación de entrenamientos CrossFit</p>
        </div>
        
        <div class="card">
            <h2>Sitio en mantenimiento</h2>
            <p>Estamos realizando mejoras en nuestro sistema para ofrecerte una mejor experiencia. Disculpa las molestias.</p>
            
            <div class="status">
                <h3 style="margin-top: 0;">⚠️ Estado: Mantenimiento en progreso</h3>
                <p>Nuestro equipo está trabajando para restablecer el servicio lo antes posible.</p>
                <p>Fecha estimada de finalización: Próximamente</p>
            </div>
            
            <p>FitPlanner es una aplicación para gestionar tus entrenamientos de CrossFit, permitiéndote:</p>
            <ul>
                <li>Organizar tus WODs semanales</li>
                <li>Registrar tus resultados y progreso</li>
                <li>Establecer objetivos de entrenamiento</li>
                <li>Visualizar estadísticas de rendimiento</li>
            </ul>
            
            <p style="text-align: center;">
                <a href="mailto:info@fitplanner.com" class="button">Contactar soporte</a>
            </p>
        </div>
        
        <div class="footer">
            <p>FitPlanner &copy; 2024 | Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>';
exit();
