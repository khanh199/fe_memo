import React from 'react';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

const routers = [
    {
        path: '/',
        private: true,
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/login',
        private: false,
        exact: true,
        main: () => <LoginPage />
    }
]

export default routers;