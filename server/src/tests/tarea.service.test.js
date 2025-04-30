import tareaService from '../services/tarea.service.js';
import Tarea from '../models/tarea.model.js';

jest.mock('../models/tarea.model');

describe('Tarea Service', () => {
  it('deberia crear una tarea', async () => {
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

    Tarea.mockImplementation(() => fakeTarea)
    const result = await tareaService.crearTarea(data)
    expect(result).toEqual(data);
    expect(fakeTarea.save).toHaveBeenCalled(); 
  });

  it('deberia manejar errores al crear una tarea', async () => {
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

