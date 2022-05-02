

const Button = ({type, text, onClick}) => {
    const filtered_type = ["positive", "negative"].includes(type) ? type : "default";

    return (
        <button className={`Button Button_${filtered_type}`}  onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;