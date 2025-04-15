import React from 'react';
import { Head } from '@inertiajs/react';

export default function Diagnostico({ diagnostico }) {
    return (
        <>
            <Head title="Diagnóstico - FitPlanner" />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-green-600">Diagnóstico de FitPlanner</h1>
                
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Estado de la Conexión</h2>
                    <div className={`p-4 rounded-lg ${diagnostico.estado === 'OK' ? 'bg-green-100' : 'bg-red-100'}`}>
                        <p className="font-medium">
                            Estado: {diagnostico.estado === 'OK' ? 
                                <span className="text-green-600">✓ Conectado</span> : 
                                <span className="text-red-600">✗ Error</span>
                            }
                        </p>
                        {diagnostico.conexion_db && (
                            <p className="mt-2">{diagnostico.conexion_db}</p>
                        )}
                        {diagnostico.error && (
                            <p className="text-red-600 mt-2">{diagnostico.error}</p>
                        )}
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Configuración de Base de Datos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium">Host:</p>
                            <p className="text-gray-600">{diagnostico.config.host}</p>
                        </div>
                        <div>
                            <p className="font-medium">Puerto:</p>
                            <p className="text-gray-600">{diagnostico.config.port}</p>
                        </div>
                        <div>
                            <p className="font-medium">Base de datos:</p>
                            <p className="text-gray-600">{diagnostico.config.database}</p>
                        </div>
                        <div>
                            <p className="font-medium">Usuario:</p>
                            <p className="text-gray-600">{diagnostico.config.username}</p>
                        </div>
                    </div>
                </div>

                {Object.keys(diagnostico.tablas).length > 0 && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Tablas en la Base de Datos</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-6 py-3 text-left">Tabla</th>
                                        <th className="px-6 py-3 text-left">Registros</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(diagnostico.tablas).map(([tabla, count]) => (
                                        <tr key={tabla} className="border-t">
                                            <td className="px-6 py-4">{tabla}</td>
                                            <td className="px-6 py-4">{count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <a 
                        href="/"
                        className="text-green-600 hover:text-green-800 font-medium"
                    >
                        ← Volver al inicio
                    </a>
                </div>
            </div>
        </>
    );
} 