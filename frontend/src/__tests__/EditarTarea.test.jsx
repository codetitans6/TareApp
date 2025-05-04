import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditarTarea from '../pages/EditarTarea/EditarTarea';
import { MemoryRouter } from 'react-router-dom';
import { updateTarea } from '../services/tareaService';

import React from 'react';


jest.mock('../hooks/useEditarTarea', () => {
    const mockTarea = {
        _id: '123',
        titulo: 'Tarea de prueba',
        descripcion: 'Descripción inicial',
        fechaCierre: '2025-12-31',
        recordatorio: true,
        prioridad: 'alta',
        materia: 'Matemáticas',
    };
    
    return () => {
        const setTarea = jest.fn(nuevoValor => {
            if (typeof nuevoValor === 'function') {
                Object.assign(mockTarea, nuevoValor(mockTarea));
            } else {
                Object.assign(mockTarea, nuevoValor);
            }
        });
        
        return {
            tarea: mockTarea,
            setTarea,
            loading: false,
            error: null,
        };
    };
});

jest.mock('../services/tareaService', () => ({
    updateTarea: jest.fn(() => Promise.resolve()),
}));

describe('EditarTarea component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza correctamente el formulario con datos cargados', () => {
        render(
            <MemoryRouter>
                <EditarTarea />
            </MemoryRouter>
        );

        expect(screen.getByDisplayValue('Tarea de prueba')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Descripción inicial')).toBeInTheDocument()
        expect(screen.getByDisplayValue('2025-12-31')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Matemáticas')).toBeInTheDocument()
    });

    it('envía datos correctamente al actualizar', async () => {
        render(
            <MemoryRouter>
                <EditarTarea />
            </MemoryRouter>
        )
        const tituloInput = screen.getByDisplayValue('Tarea de prueba')
        fireEvent.change(tituloInput, { target: { value: 'Nuevo titulo' } })
        fireEvent.click(screen.getByRole('button', { name: /actualizar/i }))

        await waitFor(() => {
            expect(updateTarea).toHaveBeenCalledWith(
                '123',
                expect.objectContaining({
                    titulo: 'Nuevo titulo',
                    descripcion: 'Descripción inicial',
                    fechaCierre: '2025-12-31',
                    recordatorio: true,
                    prioridad: 'alta',
                    materia: 'Matemáticas',
                })
            );
        });
    });
});