import express from 'express'
import mongoose from 'mongoose'
import connectDB from './src/config/database.js'
import cors from 'cors'
import tareaRoutes from './src/routes/tarea.routes.js'
import usuarioRoutes from './src/routes/usuario.routes.js'
const app = express();
const port = 3000

connectDB()
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/tareas', tareaRoutes)
app.use('/api/usuario', usuarioRoutes)

app.get('/', (req, res) => {
    res.json({ 'message': `Hello the server` })
    
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
