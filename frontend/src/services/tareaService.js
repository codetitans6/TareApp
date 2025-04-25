const API_URL = 'http://localhost:3000/api/tareas'


export const crearTarea = async (tareaData) => {
    console.log(tareaData)
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


