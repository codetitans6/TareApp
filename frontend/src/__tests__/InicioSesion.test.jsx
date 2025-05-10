import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import InicioSesion from '../pages/InicioSesion/InicioSesion';
import { ToastContainer } from 'react-toastify';
const mockSubmitInicioSesion = jest.fn((_, callback) => callback());

jest.mock('../hooks/useInicioSesion', () => ({
    __esModule: true,
    default: () => ({
        submitInicioSesion: mockSubmitInicioSesion,
        loading: false,
        error: null
    })
}));

describe('InicioSesion Component', () => {
    test('Renderiza correctamente el formulario', () => {
        render(
            <BrowserRouter>
                <InicioSesion />
                <ToastContainer />
            </BrowserRouter>
        );

        expect(screen.getByText(/Inicio sesión/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo electronico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
    });

    test('Permite escribir en los campos de entrada', () => {
        render(
            <BrowserRouter>
                <InicioSesion />
            </BrowserRouter>
        );

        const correoInput = screen.getByLabelText(/Correo electronico/i);
        const contrasenaInput = screen.getByLabelText(/Contraseña/i);

        fireEvent.change(correoInput, { target: { value: 'test@example.com' } });
        fireEvent.change(contrasenaInput, { target: { value: '123456' } });

        expect(correoInput.value).toBe('test@example.com');
        expect(contrasenaInput.value).toBe('123456');
    });

    test('Ejecuta el envío del formulario correctamente', () => {
        render(
            <BrowserRouter>
                <InicioSesion />
                <ToastContainer />
            </BrowserRouter>
        );

        const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });
        fireEvent.click(submitButton);

        expect(mockSubmitInicioSesion).toHaveBeenCalledTimes(1);
    });

});
