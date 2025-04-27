import './App.css'
import Home from './pages/Home/Home'
import Nav from './components/Nav/Nav'
import Tareas from './pages/Tareas/Tareas'
import CrearTarea from './pages/CrearTarea/CrearTarea'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
    return (
        <>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/tareas' element={<Tareas />} />
                    <Route path='/crear-tarea' element={<CrearTarea />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
