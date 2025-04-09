<?php
// Este archivo es completamente independiente de cualquier framework

// Desactivar todos los mensajes de error
ini_set('display_errors', '0');
error_reporting(0);
?>
<!DOCTYPE html>
<html>
<head>
    <title>FitPlanner - Planificación de entrenamientos CrossFit</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; line-height: 1.6; }
        .container { width: 90%; max-width: 1000px; margin: 0 auto; padding: 20px; }
        header { text-align: center; padding: 30px 0; }
        h1 { color: #4CAF50; font-size: 2.5em; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2em; margin-bottom: 30px; }
        .main-content { background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); }
        .features { display: flex; flex-wrap: wrap; justify-content: space-between; margin: 40px 0; }
        .feature { flex-basis: 48%; margin-bottom: 30px; background: #f9f9f9; padding: 20px; border-radius: 5px; border-left: 4px solid #4CAF50; }
        .button { display: inline-block; background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .button:hover { background: #45a049; }
        .notice { background: #ffe8e8; padding: 15px; border-radius: 5px; border-left: 5px solid #ff5252; margin: 30px 0; }
        .footer { text-align: center; margin-top: 50px; padding: 20px; color: #666; }
        
        @media (max-width: 768px) {
            .feature { flex-basis: 100%; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>FitPlanner</h1>
            <p class="subtitle">Tu planificador de entrenamientos CrossFit personal</p>
        </header>
        
        <div class="main-content">
            <h2>Bienvenido a FitPlanner</h2>
            <p>Esta aplicación te permite planificar, seguir y registrar tus entrenamientos de CrossFit de manera efectiva y organizada.</p>
            
            <div class="notice">
                <h3>⚠️ Sitio en Mantenimiento</h3>
                <p>Estamos realizando mejoras en nuestra plataforma. Disculpa las molestias. El servicio estará completamente disponible próximamente.</p>
            </div>
            
            <div class="features">
                <div class="feature">
                    <h3>📅 Planificación Semanal</h3>
                    <p>Organiza tus WODs (Workout of the Day) para toda la semana con nuestra interfaz intuitiva.</p>
                </div>
                <div class="feature">
                    <h3>📊 Seguimiento de Progreso</h3>
                    <p>Registra tus tiempos, repeticiones y pesos para monitorear tu mejora constante.</p>
                </div>
                <div class="feature">
                    <h3>🎯 Objetivos Personales</h3>
                    <p>Establece metas y observa cómo te acercas a ellas en cada entrenamiento.</p>
                </div>
                <div class="feature">
                    <h3>📱 Acceso Móvil</h3>
                    <p>Accede a tus rutinas y registros desde cualquier dispositivo, en cualquier momento.</p>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="diagnose.php" class="button">Verificar Estado del Sistema</a>
            </div>
        </div>
        
        <div class="footer">
            <p>FitPlanner &copy; 2024 - Desarrollado con Laravel y React</p>
            <p><small>Versión de demostración alojada en Railway</small></p>
        </div>
    </div>
</body>
</html> 