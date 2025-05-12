import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Configuraciones from '../pages/Configuraciones/Configuraciones';
import { useAuth } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import useEliminarCuenta from '../hooks/useEliminarCuenta';
import '@testing-library/jest-dom';

jest.mock('../context/AuthContext');
jest.mock('../hooks/useEliminarCuenta');
jest.mock('react-toastify', () => ({
  toast: { success: jest.fn() },
  Bounce: jest.fn(),
}));

beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => '123');
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Configuraciones', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      usuario: { nombre: 'Nathalia', correo: 'nathalia@mail.com' },
    });

    useEliminarCuenta.mockReturnValue({
      submitEliminarCuenta: jest.fn((id, cb) => cb && cb()),
      loading: false,
      error: '',
    });
  });

  it('renderiza datos del usuario y abre el modal', async () => {
    render(
      <BrowserRouter>
        <Configuraciones />
      </BrowserRouter>
    )
    expect(screen.getByLabelText(/nombre/i)).toHaveValue('Nathalia')
    expect(screen.getByLabelText(/correo/i)).toHaveValue('nathalia@mail.com')

    const eliminarBtn = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(eliminarBtn)
    await waitFor(() =>
      expect(
        screen.getByText(/¿Estás segura de que quieres eliminar tu cuenta/i)
      ).toBeInTheDocument()
    );
  });
});
