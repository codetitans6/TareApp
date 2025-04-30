import style from './Nav.module.css'
import { Link } from 'react-router-dom'
function Nav() {
    return (
        <>
            <nav className={style.nav}>
                <h1 className={style.logo}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"> <g fill="none" stroke="#c1f4be" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="#65a30d"> <path d="M7.998 16h4m-4-5h8M7.5 3.5c-1.556.047-2.483.22-3.125.862c-.879.88-.879 2.295-.879 5.126v6.506c0 2.832 0 4.247.879 5.127C5.253 22 6.668 22 9.496 22h5c2.829 0 4.243 0 5.121-.88c.88-.879.88-2.294.88-5.126V9.488c0-2.83 0-4.246-.88-5.126c-.641-.642-1.569-.815-3.125-.862" /> <path d="M7.496 3.75c0-.966.784-1.75 1.75-1.75h5.5a1.75 1.75 0 1 1 0 3.5h-5.5a1.75 1.75 0 0 1-1.75-1.75" /> </g></svg>
                    TareApp
                </h1>
                <ul className={style.nav__list}>
                    <li className={style.nav__list_item}><Link to='/' className={style.link}>Home</Link></li>
                    <li className={style.nav__list_item}>Iniciar sesión</li>
                    <li className={style.nav__list_item}><Link to='/registro' className={style.link}>Registrate</Link></li>
                    <li className={style.nav__list_item}><Link to='/tareas' className={style.link}>Mis tareas</Link></li>
                </ul>
            </nav>

        </>
    )
}
export default Nav