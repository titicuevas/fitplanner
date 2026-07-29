<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>FitPlanner CrossFit</title>
        <link rel="icon" type="image/png" href="{{ asset('images/fitplanner-logo.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        {{-- Evita flash de tema claro al cargar en modo oscuro --}}
        <script>
            (function () {
                try {
                    var theme = localStorage.getItem('fitplanner-theme') || 'system';
                    var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                    if (dark) document.documentElement.classList.add('dark');
                } catch (e) {}
            })();
        </script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @php
            $pageComponent = $page['component'];
            $tsxPath = resource_path("js/Pages/{$pageComponent}.tsx");
            $pageEntry = file_exists($tsxPath)
                ? "resources/js/Pages/{$pageComponent}.tsx"
                : "resources/js/Pages/{$pageComponent}.jsx";
        @endphp
        @vite(['resources/js/app.jsx', $pageEntry])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        @inertia
    </body>
</html>
