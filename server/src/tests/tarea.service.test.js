import tareaService from '../services/tarea.service.js';
import Tarea from '../models/tarea.model.js';

jest.mock('../models/tarea.model');

describe('Tarea Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('crearTarea', () => {
    it('debería crear una tarea correctamente', async () => {
      const data = {
        titulo: 'estudiar para física',
        prioridad: 'alta',
        descripcion: 'estudiar los temas del examen parcial',
        materia: 'Física',
        fechaCierre: new Date(),
        recordatorio: true,
      };

      const fakeTarea = {
        ...data,
        save: jest.fn().mockResolvedValue(data),
      };

      Tarea.mockImplementation(() => fakeTarea);
      const result = await tareaService.crearTarea(data);
      expect(result).toEqual(data);
      expect(fakeTarea.save).toHaveBeenCalled();
    });

    it('debería manejar errores al crear una tarea', async () => {
      const data = {
        titulo: 'Estudiar quimica',
        prioridad: 'media',
      };

      const errorMessage = 'Error al guardar la tarea';
      Tarea.mockImplementation(() => ({
        ...data,
        save: jest.fn().mockRejectedValue(new Error(errorMessage)),
      }));
      await expect(tareaService.crearTarea(data)).rejects.toThrow(errorMessage);
    });
  });

  describe('getTareaById', () => {
    it('debería obtener una tarea por ID correctamente', async () => {
      const mockTarea = {
        _id: '123abc',
        titulo: 'Tarea específica',
        prioridad: 'media',
        materia: 'Historia'
      };

      Tarea.findById = jest.fn().mockResolvedValue(mockTarea);

      const result = await tareaService.getTareaById('123abc');
      expect(result).toEqual(mockTarea);
      expect(Tarea.findById).toHaveBeenCalledWith('123abc');
    });

    it('debería devolver null si no encuentra la tarea', async () => {
      Tarea.findById = jest.fn().mockResolvedValue(null);

      const result = await tareaService.getTareaById('id_inexistente');
      expect(result).toBeNull();
      expect(Tarea.findById).toHaveBeenCalledWith('id_inexistente');
    });

    it('debería manejar errores al buscar una tarea por ID', async () => {
      const errorMessage = 'Error al obtener la tarea por el ID';

      Tarea.findById = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(tareaService.getTareaById('123')).rejects.toThrow(errorMessage);
      expect(Tarea.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('updateTarea', () => {
    it('debería actualizar una tarea correctamente', async () => {
      const tareaId = '456def';
      const datosTarea = {
        titulo: 'Título actualizado',
        descripcion: 'Nueva descripción'
      };

      const tareaActualizada = {
        _id: tareaId,
        ...datosTarea,
        prioridad: 'alta',
        materia: 'Ciencias'
      };

      Tarea.findByIdAndUpdate = jest.fn().mockResolvedValue(tareaActualizada);

      const result = await tareaService.updateTarea(tareaId, datosTarea);
      expect(result).toEqual(tareaActualizada);
      expect(Tarea.findByIdAndUpdate).toHaveBeenCalledWith(tareaId, datosTarea, { new: true });
    });

    it('debería devolver null si no encuentra la tarea para actualizar', async () => {
      const tareaId = 'id_inexistente';
      const datosTarea = { titulo: 'Actualización' };

      Tarea.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const result = await tareaService.updateTarea(tareaId, datosTarea);
      expect(result).toBeNull();
      expect(Tarea.findByIdAndUpdate).toHaveBeenCalledWith(tareaId, datosTarea, { new: true });
    });

    it('debería manejar errores al actualizar una tarea', async () => {
      const tareaId = '789ghi';
      const datosTarea = { titulo: 'Nuevo título' };
      const errorMessage = 'Error al actualizar la tarea';

      Tarea.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(tareaService.updateTarea(tareaId, datosTarea)).rejects.toThrow(errorMessage);
      expect(Tarea.findByIdAndUpdate).toHaveBeenCalledWith(tareaId, datosTarea, { new: true });
    });
  });
  describe('getUsuariosInTarea', () => {
    it('debería retornar la lista de usuarios relacionados con la tarea', async () => {
      const tareaId = 'tarea123';
      const mockUsuarios = [
        { nombre: 'Ana', correo: 'ana@mail.com' },
        { nombre: 'Luis', correo: 'luis@mail.com' }
      ];

      const mockPopulate = jest.fn().mockResolvedValue({ usuarios: mockUsuarios });
      const mockFindById = jest.fn(() => ({ populate: mockPopulate }));
      Tarea.findById = mockFindById;

      const result = await tareaService.getUsuariosInTarea(tareaId);

      expect(result).toEqual(mockUsuarios);
      expect(Tarea.findById).toHaveBeenCalledWith(tareaId);
      expect(mockPopulate).toHaveBeenCalledWith({
        path: 'usuarios',
        select: 'nombre correo'
      });
    });

    it('debería retornar un array vacío si no se encuentra la tarea', async () => {
      const tareaId = 'inexistente';

      const mockPopulate = jest.fn().mockResolvedValue(null);
      const mockFindById = jest.fn(() => ({ populate: mockPopulate }));
      Tarea.findById = mockFindById;

      const result = await tareaService.getUsuariosInTarea(tareaId);

      expect(result).toEqual([]);
      expect(Tarea.findById).toHaveBeenCalledWith(tareaId);
    });

    it('debería lanzar un error si ocurre una excepción', async () => {
      const tareaId = 'fallo123';
      const errorMsg = 'Falla inesperada';

      Tarea.findById = jest.fn(() => ({
        populate: jest.fn().mockRejectedValue(new Error(errorMsg))
      }));

      await expect(tareaService.getUsuariosInTarea(tareaId)).rejects.toThrow(errorMsg);
    });
  });

});

