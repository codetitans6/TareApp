import tareaService from '../services/tarea.service.js'
import Tarea from '../models/tarea.model.js'

jest.mock('../models/tarea.model');

describe('Tarea Service', () => {
  it('debería crear una tarea', async () => {
    const data = { titulo: 'Estudiar para física', prioridad: 'alta' };
    const fakeTarea = { ...data, save: jest.fn().mockResolvedValue(data) };
    
    Tarea.mockImplementation(() => fakeTarea);

    const result = await tareaService.crearTarea(data);
    expect(result).toEqual(data);
    expect(fakeTarea.save).toHaveBeenCalled();
  });
});
