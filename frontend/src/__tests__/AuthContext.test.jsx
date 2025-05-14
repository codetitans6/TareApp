import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '@testing-library/jest-dom';


const TestComponent = () => {
    const { token, setToken, cerrarSesion } = useAuth();

    return (
        <div>
            <p>Token: {token}</p>
            <button onClick={() => setToken('fake-token')}>Login</button>
            <button onClick={cerrarSesion}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('guarda el token en localStorage al hacer login', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText('Login'));

        expect(localStorage.getItem('token')).toBe('fake-token');
        expect(screen.getByText(/Token: fake-token/i)).toBeInTheDocument();
    });

  it('elimina el token del estado y localStorage al hacer logout', () => {
    localStorage.setItem('token', 'fake-token');

    render(
        <AuthProvider>
            <TestComponent />
        </AuthProvider>
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('id')).toBeNull(); 
});

});
