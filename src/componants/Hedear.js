import React from "react";

const Header = ({headText, leftChild, rightChild}) => {
    return (
        <header>
            <div className="headBtnLeft">
                {leftChild}
            </div>
            <div className="headText">
                {headText}
            </div>
            <div className="headBtnRight">
                {rightChild}
            </div>
        </header>
    );
};

export default React.memo(Header);