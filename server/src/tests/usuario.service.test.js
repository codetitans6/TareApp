import usuarioService from '../services/usuario.service.js'
import Usuario from '../models/usuario.model.js'
import { generateToken } from '../utils/jwt.js'
import bcrypt from 'bcryptjs'
import Tarea from '../models/tarea.model.js';

jest.mock('../models/tarea.model.js');


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
        correo: data.correo
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
        correo: data.correo
      }
    };

    expect(resultado).toEqual(expectedResult);
    expect(Usuario.findOne).toHaveBeenCalledWith({ correo: data.correo });
    expect(bcrypt.compare).toHaveBeenCalledWith(data.contrasena, fakeUsuario.contrasena);
  });
  it('debería eliminar la cuenta del usuario y sus relaciones', async () => {
    const userId = '123abc';

    const mockUsuario = {
      _id: userId,
      nombre: 'Judy Fajardo',
      correo: 'judy@gmail.com'
    };

    Usuario.findById = jest.fn().mockResolvedValue(mockUsuario);
    Usuario.findByIdAndDelete = jest.fn().mockResolvedValue();
    Tarea.deleteMany = jest.fn().mockResolvedValue();
    Tarea.updateMany = jest.fn().mockResolvedValue();

    const resultado = await usuarioService.eliminarCuenta(userId);

    expect(Usuario.findById).toHaveBeenCalledWith(userId);
    expect(Usuario.findByIdAndDelete).toHaveBeenCalledWith(userId);
    expect(Tarea.deleteMany).toHaveBeenCalledWith({ creador: userId });
    expect(Tarea.updateMany).toHaveBeenCalledWith(
      { usuarios: userId },
      { $pull: { usuarios: userId } }
    );

    expect(resultado).toEqual({
      message: 'Usuario y sus relaciones eliminadas correctamente'
    });
  });

});
