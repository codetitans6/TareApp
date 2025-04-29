import usuarioService from '../services/usuario.service.js'
import Usuario from '../models/usuario.model.js'
import { generateToken } from '../utils/jwt.js'

jest.mock('../models/usuario.model.js')
jest.mock('../utils/jwt.js', () => ({
  generateToken: jest.fn(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tokenEjemplo')
}))

beforeAll(() => {
  process.env.JWT_SECRET = 'prueba';
})

describe('Usuario Service', () => {
  it('deberia crear un usuario', async () => {
    const data = {
      nombre: 'Judy Fajardo',
      correo: 'judy@gmail.com',
      contrasena: 'Contrasena123@'
    };

    const fakeUsuario = {
      _id: '123abc',
      nombre: data.nombre,
      email: data.correo,
      save: jest.fn().mockResolvedValue({
        _id: '123abc',
        nombre: data.nombre,
        email: data.correo
      })
    };

    Usuario.mockImplementation(() => fakeUsuario);

    const resultado = await usuarioService.crearUsuario(data);

    const expectedResult = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tokenEjemplo',
      usuario: {
        idUsuario: '123abc',
        nombreUsuario: data.nombre,
        emailUsuario: data.correo
      }
    };

    expect(resultado).toEqual(expectedResult);
    expect(fakeUsuario.save).toHaveBeenCalled();
  });
});
