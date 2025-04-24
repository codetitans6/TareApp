const tareaService = require('../services/tarea.service');
const Tarea = require('../models/tarea.model');

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
