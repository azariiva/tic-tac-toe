import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from "./components/Game";

// ========================================

ReactDOM.render(
    <Game fieldWidth={6} fieldHeight={4} winCondition={3}/>
    , document.getElementById("root"));

