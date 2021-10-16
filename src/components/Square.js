import React from 'react';

const Square = ({onClick, value}) =>
    <button className="square" onClick={onClick}>
        {value}
    </button>

export default Square
