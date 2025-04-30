const API_URL = 'http://localhost:3000/api/usuario'


export const crearUsuario = async (usuarioData) => {
    console.log(usuarioData)
    const res = await fetch(API_URL,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(usuarioData)
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al crear al usuario')
    }
    return res.json()
}