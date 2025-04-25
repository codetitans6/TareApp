import style from './Home.module.css'
import Card from '../../components/Card/Card'
function Home() {
    const firstCard = {
        icono: (<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path fill="none" stroke="#0284c7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.268 21a2 2 0 0 0 3.464 0m-10.47-5.674A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>),
        titulo: 'Recodatorios',
        texto: 'Te recordamos dias y horas previas a tu entrega de la tarea'
    }
    const secondCard = {
        icono: (<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path fill="#0284c7" d="m16 21l-.3-1.5q-.3-.125-.562-.262T14.6 18.9l-1.45.45l-1-1.7l1.15-1q-.05-.35-.05-.65t.05-.65l-1.15-1l1-1.7l1.45.45q.275-.2.538-.337t.562-.263L16 11h2l.3 1.5q.3.125.563.275t.537.375l1.45-.5l1 1.75l-1.15 1q.05.3.05.625t-.05.625l1.15 1l-1 1.7l-1.45-.45q-.275.2-.537.338t-.563.262L18 21zM2 20v-2.8q0-.825.425-1.55t1.175-1.1q1.275-.65 2.875-1.1T10 13h.35q.15 0 .3.05q-.725 1.8-.6 3.575T11.25 20zm15-2q.825 0 1.413-.587T19 16t-.587-1.412T17 14t-1.412.588T15 16t.588 1.413T17 18m-7-6q-1.65 0-2.825-1.175T6 8t1.175-2.825T10 4t2.825 1.175T14 8t-1.175 2.825T10 12"/></svg>),
        titulo: 'Gestion de tus tareas',
        texto: 'Te ofrecemos un espacio para que gestiones y crees tus tareas'
    }
    const thirthCard = {
        icono: (<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path fill="#0284c7" d="M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22"/></svg>),
        titulo: 'Compartir',
        texto: 'Puedes asignar tu misma tarea a tus compañeros de curso'
    }
    return (
        <>
            <section className={style.home_container}>
                <article className={style.section__inicial}>
                    <div className={style.texto__inicial}>
                        <h2> Somos los mejores recordando </h2>
                        <p>No te preocupes más por no recordar tus tareas, traemos para ti una solucion muy simple, solo registra tus tareas, dinos su fecha de cierre y nosotros nos encargaremos de recordarte días antes de que cumplas con tu meta</p>
                        <button className={style.inicial__button}>Empezar</button>
                    </div>
                    <img className={style.img__inicial} src="https://www.sweetprocess.com/wp-content/uploads/2022/10/task-management-30-1.png" alt="Icono de calentario" />
                </article>
                <article className={style.section__segunda}>
                    <div className={style.texto_segundo}>
                        <h2>Lo que ofrecemos</h2>
                        <p>Encontraras una gran variedad de servicios para ti</p>
                    </div>
                    <div className={style.card_container}>
                        <Card icono={firstCard.icono} titulo={firstCard.titulo} texto={firstCard.texto} />
                        <Card icono={secondCard.icono} titulo={secondCard.titulo} texto={secondCard.texto} />
                        <Card icono={thirthCard.icono} titulo={thirthCard.titulo} texto={thirthCard.texto} />
                    </div>
                </article>
            </section >
        </>

    )
}

export default Home