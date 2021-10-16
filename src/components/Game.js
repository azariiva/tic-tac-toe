import React, {useState} from 'react';
import Board from "./Board";

const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(3).fill(Array(3).fill(null))
    }])
    const [stepNumber, setStepNumber] = useState(0)
    const [winner, setWinner] = useState(null)


    const makeTurn = (i, j) => {
        const current = history[stepNumber]
        const squares = current.squares.map((row) => row.slice())
        if ((winner && history.length - 1 === stepNumber) || squares[i][j]) {
            return
        }
        squares[i][j] = stepNumber % 2 ? 'O' : 'X';
        setHistory(
            history.slice(0, stepNumber + 1).concat([{
                squares: squares,
                description: {
                    value: squares[i][j],
                    row: i,
                    column: j,
                }
            }])
        )
        setStepNumber(stepNumber + 1)
        setWinner(calculateWinner(squares))
    }

    const moves = history.map((step, move) => {
        const desc = move !== 0 ?
            `Switch to turn #${move}\n` +
            `${step.description.value}: (col: ${step.description.column}, row: ${step.description.row})` :
            `Switch to start of the game`;
        return (
            <li key={move}>
                <button onClick={() => setStepNumber(move)}>
                    <span style={move === stepNumber ? {fontWeight: 800} : {fontWeight: 400}}>
                        {desc}
                    </span>
                </button>
            </li>
        );
    });

    return (
        <div className='game'>
            <div className="game-board">
                <Board
                    squares={history[stepNumber].squares}
                    onClick={(i, j) => makeTurn(i, j)}
                />
            </div>
            <div className="game-info">
                <div>{winner ? `Winner: ${winner}` : `Next player: ${stepNumber % 2 ? 'O' : 'X'}`}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

// this logic works only for square fields with corresponding winCondition
function calculateWinner(squares) {
    const winCondition = 3;

    // check rows
    for (let row of squares) {
        const savedValue = row[0];
        if (savedValue) {
            let ctr = 0;
            for (let elem of row) {
                if (elem === savedValue) {
                    ctr++;
                } else {
                    break;
                }
                if (ctr === winCondition) {
                    return savedValue;
                }
            }
        }
    }

    // check columns
    for (let i = 0; i < squares[0].length; ++i) {
        const savedValue = squares[0][i];
        if (savedValue) {
            let ctr = 0;
            for (let j = 0; j < squares.length; ++j) {
                const elem = squares[j][i];
                if (elem === savedValue) {
                    ctr++;
                } else {
                    break;
                }
                if (ctr === winCondition) {
                    return savedValue;
                }
            }
        }
    }

    // check diagonals
    let savedValue = squares[0][0];
    if (savedValue) {
        let ctr = 0;
        for (let i = 0; i < squares.length; ++i) {
            if (squares[i][i] === savedValue) {
                ctr++;
            } else {
                break;
            }
            if (ctr === winCondition) {
                return savedValue;
            }
        }
    }
    savedValue = squares[0][squares.length - 1];
    if (savedValue) {
        let ctr = 0;
        for (let i = squares.length - 1; i >= 0; i--) {
            if (squares[squares.length - i - 1][i] === savedValue) {
                ctr++;
            } else {
                break;
            }
            if (ctr === winCondition) {
                return savedValue;
            }
        }
    }
    return null;
}

export default Game
