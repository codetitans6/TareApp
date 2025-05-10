import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShareTarea from '../components/ShareTarea/ShareTarea';
import '@testing-library/jest-dom';

jest.mock('../hooks/useUsuarioId', () => () => ({
  email: 'test@example.com',
  setEmail: jest.fn(),
  submitUsuarioEmail: jest.fn().mockResolvedValue('usuario123'),
  loading: false,
}));

jest.mock('../hooks/useAsignarTarea', () => () => ({
  asignar: jest.fn().mockResolvedValue({ message: 'Tarea compartida correctamente.' }),
  loading: false,
  data: null,
}));

jest.mock('../hooks/useUsuariosInTarea', () => () => ({
  usuarios: [{ _id: '1', nombre: 'Juan Pérez', correo: 'juan@example.com' }],
  loading: false,
  error: null,
  refetch: jest.fn(),
}));


beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => 'creador123');
});

describe('ShareTarea Component', () => {
  it('renderiza y comparte la tarea correctamente', async () => {
    render(<ShareTarea isOpen={true} onClose={jest.fn()} tareaId="tarea456" />);
    expect(screen.getByPlaceholderText(/ejemplo@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Compartir/i)).toBeInTheDocument();

    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => {
      expect(screen.getByText(/Tarea compartida correctamente/i)).toBeInTheDocument();
    });
  });
});
