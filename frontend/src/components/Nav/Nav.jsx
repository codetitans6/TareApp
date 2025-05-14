import style from './Nav.module.css'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { toast, Bounce } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import { useNotificaciones } from '../../hooks/useNotificaciones';

function Nav() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { cerrarSesion } = useAuth();
    const [openMenu, setOpenMenu] = useState(false)
    const [openNoty, setOpenNoty] = useState(false)
    const [notificaciones, setNotificaciones] = useState([]);
    const usuarioId = localStorage.getItem('id')
    const { marcarComoLeida, loading, error } = useNotificaciones();
    const notify = () => toast.success("Cerraste sesión correctamente", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    })

    const menuRef = useRef(null);
    const notyRef = useRef(null);
    const menuBtnRef = useRef(null);
    const notyBtnRef = useRef(null);

    useEffect(() => {
        const fetchNotificaciones = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/notificaciones/${usuarioId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!res.ok) {
                    throw new Error('Error al obtener las notificaciones');
                }
                const data = await res.json();
                if (!data || data.length === 0) {
                    console.log('No hay notificaciones');
                    setNotificaciones([]);
                } else {
                    setNotificaciones(data);
                }
            } catch (error) {
                console.error('Error al obtener las notificaciones:', error);
            }
        }
        fetchNotificaciones();
        const intervalId = setInterval(fetchNotificaciones, 10000)
        return () => clearInterval(intervalId);
    }, [usuarioId]);

    const notificacionesNoLeidas = notificaciones.filter(noty => !noty.leida).length;
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                openMenu &&
                !menuRef.current.contains(e.target) &&
                !menuBtnRef.current.contains(e.target)
            ) {
                setOpenMenu(false);
            }

            if (
                openNoty &&
                !notyRef.current.contains(e.target) &&
                !notyBtnRef.current.contains(e.target)
            ) {
                setOpenNoty(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenu, openNoty])

    const handleLogout = () => {
        notify()
        cerrarSesion()
        navigate('/')

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
                                <li className={style.user_icon}>
                                    <button
                                        ref={notyBtnRef}
                                        className={style.user_icon_button}
                                        onClick={() => {
                                            setOpenNoty(prev => !prev)
                                            setOpenMenu(false);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="#fff" d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22m7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A1 1 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a1 1 0 0 0-.293-.707z" /></svg>
                                        {notificacionesNoLeidas > 0 && (
                                            <span className={style.noty_badge}>
                                                {notificacionesNoLeidas > 9 ? '9+' : notificacionesNoLeidas}
                                            </span>
                                        )}
                                    </button>
                                </li>

                                <li className={style.user_icon}>
                                    <button
                                        ref={menuBtnRef}
                                        className={style.user_icon_button}
                                        onClick={() => {
                                            setOpenMenu(prev => !prev);
                                            setOpenNoty(false);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="9" r="3" /><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5" /></g></svg>
                                    </button>
                                </li>

                                {openMenu && (
                                    <div ref={menuRef} className={style.menu}>
                                        <ul>
                                            <li onClick={() => { handleLogout(); setOpenMenu(false); }}>Salir</li>
                                            <Link to="/configuraciones" className={style.link}>
                                                <li>Configuraciones</li>
                                            </Link>
                                        </ul>
                                    </div>
                                )}

                                {openNoty && (
                                    <div ref={notyRef} className={style.noty_menu}>
                                        <h5>Notificaciones</h5>
                                        <ul>
                                            {notificaciones.length > 0 ? (
                                                notificaciones.map((noty) => (
                                                    <li key={noty._id}>
                                                        <div className={`${style.noty_container} ${noty.leida ? style.noty_leida : ''}`}>
                                                            <p className={style.noty_title}>{noty.mensaje}</p>
                                                            <p className={style.noty_icon} data-tooltip-id="vista" data-tooltip-content="Marcar como vista" data-tooltip-place="top" onClick={() => marcarComoLeida(noty._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                                    <path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" />
                                                                </svg>
                                                            </p>
                                                            <p className={style.noty_body}>
                                                                {new Date(noty.createdAt).toLocaleString()}
                                                                 {
                                                                    noty.leida && (
                                                                        <span className={style.vista}>Vista</span>
                                                                    )
                                                                }
                                                            </p>

                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                <p className={style.noty_title}>No tienes notificaciones</p>
                                            )}
                                        </ul>
                                    </div>
                                )}

                            </div>
                        </>
                    )
                    }
                </ul>
                <Tooltip id="vista" />
            </nav>

        </>
    )
}
export default Nav