const API_URL = 'http://localhost:3000/api/tareas'


export const crearTarea = async (tareaData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tareaData)
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al crear la tarea')
    }
    return res.json()
}

export const getAllUserTareas = async (id) => {
    const res = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al obtener todas las tarea')
    }
    return res.json()
}

export const getTareaById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al obtener la tarea por su id')
    }
    return res.json()
}
export const updateTarea = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al obtener la tarea ')
    }
    return res.json()
}
export const asignarUsuarios = async (tareaId, creadorId, usuarioId) => {
    try {
        const tareaRes = await fetch(`${API_URL}/${tareaId}`);
        if (!tareaRes.ok) {
            const error = await tareaRes.json();
            return { error: error.message || 'No se pudo obtener la tarea' };
        }
        const tarea = await tareaRes.json();
        if (tarea.creador !== creadorId) {
            return { error: 'No tienes permisos para editar esta tarea' };
        }
        if (tarea.creador === creadorId) {
            return { error: 'No puedes asignarte tu propia tarea' };
        }
        const usuariosActuales = tarea.usuarios || [];
        if (usuariosActuales.includes(usuarioId)) {
            return { error: 'El usuario ya está asignado a esta tarea' };
        }

        const { _id, ...tareaSinId } = tarea;
        const usuariosActualizados = Array.from(new Set([...usuariosActuales, usuarioId]));


        const res = await fetch(`${API_URL}/${tareaId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...tareaSinId,
                usuarios: usuariosActualizados
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Error en asignarUsuarios:", errorData);
            return { error: errorData.error || 'Error al asignar la tarea' };
        }

        const tareaActualizada = await res.json();
        return {
            success: true,
            tarea: tareaActualizada,
            message: 'Usuario asignado correctamente a la tarea'
        };
    } catch (error) {
        console.error("Error en servicio asignarUsuarios:", error);
        return { error: error.message || 'Error al procesar la solicitud' };
    }
};


export const getUsuarioId = async (correo) => {
    const res = await fetch(`${API_URL}/usuario/${encodeURIComponent(correo)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al id usuario las tarea')
    }
    return res.json()
}

export const getUsuariosInTarea = async (tareaId) => {
    const res = await fetch(`${API_URL}/usuarios/${tareaId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al obtener la tarea por su id')
    }
    return res.json()
}
