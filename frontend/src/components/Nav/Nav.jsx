import style from './Nav.module.css'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
function Nav() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { cerrarSesion } = useAuth();
    const [openMenu, setOpenMenu] = useState(false)

    const handleLogout = () => {
        navigate('/')
        cerrarSesion()
        
    };
    return (
        <>
            <nav className={style.nav}>
                <h1 className={style.logo}>
                    <Link className={style.logo_link} to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"> <g fill="none" stroke="#c1f4be" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="#65a30d"> <path d="M7.998 16h4m-4-5h8M7.5 3.5c-1.556.047-2.483.22-3.125.862c-.879.88-.879 2.295-.879 5.126v6.506c0 2.832 0 4.247.879 5.127C5.253 22 6.668 22 9.496 22h5c2.829 0 4.243 0 5.121-.88c.88-.879.88-2.294.88-5.126V9.488c0-2.83 0-4.246-.88-5.126c-.641-.642-1.569-.815-3.125-.862" /> <path d="M7.496 3.75c0-.966.784-1.75 1.75-1.75h5.5a1.75 1.75 0 1 1 0 3.5h-5.5a1.75 1.75 0 0 1-1.75-1.75" /> </g></svg>
                        TareApp
                    </Link>
                </h1>
                <ul className={style.nav__list}>
                    <li className={style.nav__list_item}><Link to='/' className={style.link}>Home</Link></li>
                    {!token && (
                        <>
                            <li className={style.nav__list_item}><Link to='/inicio-sesion' className={style.link}>Inicio sesión</Link></li>
                            <li className={style.nav__list_item}><Link to='/registro' className={style.link}>Registrate</Link></li>
                        </>
                    )}
                    {token && (
                        <>
                            <li className={style.nav__list_item}><Link to='/tareas' className={style.link}>Mis tareas</Link></li>
                            <div className={style.user_menu}>
                                <li className={style.user_icon}><button className={style.user_icon_button} onClick={() => setOpenMenu(!openMenu)}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="9" r="3" /><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5" /></g></svg></button></li>
                                {openMenu && (
                                    <div className={style.menu}>
                                        <ul>
                                            <li onClick={handleLogout}>Salir</li>
                                            <li>Configuraciones</li>
                                        </ul>
                                    </div>
                                )}

                            </div>

                        </>
                    )
                    }

                </ul>
            </nav>

        </>
    )
}
export default Nav