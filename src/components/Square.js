import React from 'react';

const Square = ({onClick, value, color}) =>
    <button className="square" onClick={onClick} style={{color}}>
        {value}
    </button>

export default Square
