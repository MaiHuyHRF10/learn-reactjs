import React, { useState } from 'react';
import './style.scss';

function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'black', 'green', 'blue', 'yellow'];
    const randomIndex = Math.trunc(Math.random() * 5);

    return COLOR_LIST[randomIndex];
}

function ColorBox() {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box-color') || 'deeppink';
        return initColor;
    });

    function handleBoxClick() {
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('box-color', newColor);
    }


    return (
        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >

        </div>
    );
}

export default ColorBox;