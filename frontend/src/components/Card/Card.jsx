import style from './Card.module.css'
function Card(props) {
    return (
        <>
            <div className={style.card_container}>
                <div>
                    {props.icono}
                </div>
                <h3>{props.titulo}</h3>
                <p>{props.texto}</p>
            </div>

        </>
    )
}

export default Card