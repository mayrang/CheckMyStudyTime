import React from "react";

const Button = ({type, text, onClick, option}) => {
    const filtered_type = ["positive", "negative"].includes(type) ? type : "default";
    const filtered_option = option ? "disabled" : ""
    return (
        <button className={`Button Button_${filtered_type}`}  onClick={onClick} disabled={filtered_option}>
            {text}
        </button>
    )
}

export default React.memo(Button);