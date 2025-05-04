const API_URL = 'http://localhost:3000/api/tareas'


export const crearTarea = async (tareaData) => {
    const res = await fetch(API_URL,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(tareaData)
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al crear la tarea')
    }
    return res.json()
}

export const getAllTareas = async () => {
    const res = await fetch(API_URL,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
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
        headers: { 'Content-Type': 'application/json'}
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
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al obtener la tarea ')
    }
    return res.json()
}