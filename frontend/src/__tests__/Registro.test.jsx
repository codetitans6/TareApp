import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Registro from '../pages/Registro/Registro';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const mockSubmit = jest.fn();

jest.mock('../hooks/useRegistroUsuario.js', () => () => ({
  submitUsuarioNuevo: mockSubmit,
  loading: false,
  error: null,
  success: false,
}));

beforeEach(() => {
  mockSubmit.mockClear()
});

describe('Registro component', () => {
  it('muestra errores al enviar el formulario vacío', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /registrate/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/tu nombre es necesario para continuar/i)).toBeInTheDocument();
      expect(screen.getByText(/por favor ingresa un correo válido/i)).toBeInTheDocument();
    });
  });

  it('envía los datos correctamente si el formulario es válido', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/nombre/i), {
      target: { value: 'Nathalia' },
    });
    fireEvent.input(screen.getByLabelText(/correo/i), {
      target: { value: 'nathalia@email.com' },
    });
    fireEvent.input(screen.getByLabelText(/^contraseña$/i), {
      target: { value: 'Password123@' },
    });
    fireEvent.input(screen.getByLabelText(/confirmar contraseña/i), {
      target: { value: 'Password123@' }, 
    });

    fireEvent.click(screen.getByRole('button', { name: /registrate/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        {
          nombre: 'Nathalia',
          correo: 'nathalia@email.com',
          contrasena: 'Password123@', 
        },
        expect.any(Function)
      );
    });
  });
});