
const API_URL = 'http://localhost:3000/api/usuario'


export const crearUsuario = async (usuarioData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData)
    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Error al crear al usuario')
    }
    return data
}