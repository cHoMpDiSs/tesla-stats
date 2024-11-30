"use client"

import React, { useState } from 'react';

const RegisterTeslaFleet = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setSuccess('Fleet registered successfully!');
            console.log('Response:', data);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Register Tesla Fleet
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Click the button below to register your Tesla fleet through our backend.
                </p>
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {loading ? 'Registering...' : 'Register Fleet'}
                </button>
                {success && (
                    <div className="mt-4 p-2 text-green-700 bg-green-100 rounded-lg text-center">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-2 text-red-700 bg-red-100 rounded-lg text-center">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterTeslaFleet;
