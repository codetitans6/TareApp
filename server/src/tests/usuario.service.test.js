import usuarioService from '../services/usuario.service.js'
import Usuario from '../models/usuario.model.js'
import { generateToken } from '../utils/jwt.js'
import bcrypt from 'bcryptjs'

jest.mock('../models/usuario.model.js')
jest.mock('../utils/jwt.js', () => ({
  generateToken: jest.fn(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tokenEjemplo')
}))
jest.mock('bcryptjs', () => ({
  compare: jest.fn()
}));
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
      correo: data.correo, 
      save: jest.fn().mockResolvedValue({
        _id: '123abc',
        nombre: data.nombre,
        correo: data.correo
      })
    };


    Usuario.mockImplementation(() => fakeUsuario);

    const resultado = await usuarioService.crearUsuario(data);

    const expectedResult = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tokenEjemplo',
      usuario: {
        id: '123abc',
        nombre: data.nombre,
        email: data.correo
      }
    };

    expect(resultado).toEqual(expectedResult);
    expect(fakeUsuario.save).toHaveBeenCalled();
  });
  it('debería iniciar sesión correctamente con credenciales válidas', async () => {
    const data = {
      nombre: 'Judy Fajardo',
      correo: 'judy@gmail.com',
      contrasena: 'Contrasena123@'
    };

    const fakeUsuario = {
      _id: '123abc',
      nombre: data.nombre,
      correo: data.correo,
      contrasena: 'hashedPassword123'
    };

    Usuario.findOne = jest.fn().mockResolvedValue(fakeUsuario);

    bcrypt.compare.mockResolvedValue(true);

    const resultado = await usuarioService.inicioSesion(data.correo, data.contrasena);

    const expectedResult = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tokenEjemplo',
      usuario: {
        id: '123abc',
        nombre: data.nombre,
        email: data.correo
      }
    };

    expect(resultado).toEqual(expectedResult);
    expect(Usuario.findOne).toHaveBeenCalledWith({ correo: data.correo });
    expect(bcrypt.compare).toHaveBeenCalledWith(data.contrasena, fakeUsuario.contrasena);
  });

});
