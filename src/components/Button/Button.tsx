import './Button.scss';


const Button = (props: any) => {
    return (
        <button id={props.id} className='btn' onClick={props.onClick}><img src={props.src} alt=""/><span>{props.text}</span></button>
    )
}

export default Button