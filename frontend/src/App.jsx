import './App.css'
import Home from './pages/Home/Home'
import Nav from './components/Nav/Nav'
import Tareas from './pages/Tareas/Tareas'
import CrearTarea from './pages/CrearTarea/CrearTarea'
import Registro from './pages/Registro/Registro'
import EditarTarea from './pages/EditarTarea/EditarTarea'
import InicioSesion from './pages/InicioSesion/InicioSesion'
import Configuraciones from './pages/Configuraciones/Configuraciones'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
    return (
        <>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/tareas' element={<Tareas />} />
                    <Route path='/crear-tarea' element={<CrearTarea />} />
                    <Route path='/registro' element={<Registro />} />
                    <Route path='/inicio-sesion' element={<InicioSesion />} />
                    <Route path='/editar/:id' element={<EditarTarea />} />
                    <Route path='/configuraciones' element={<Configuraciones />} />
                </Routes>
                <ToastContainer
                    position="top-center"
                    autoClose={1200}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce}
                />
            </BrowserRouter>
        </>
    )
}

export default App
