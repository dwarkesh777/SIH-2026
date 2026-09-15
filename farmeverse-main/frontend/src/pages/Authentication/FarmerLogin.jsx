import React from 'react';
import { AuthSwitch } from '../../components/ui/auth-switch';

export const FarmerLogin = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-green-100/40 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <AuthSwitch defaultMode="login" redirectOnLogin="/farmer/dashboard" />
        </div>
    );
};

export default FarmerLogin;
