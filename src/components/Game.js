import React, {useState} from 'react';
import Board from "./Board";
import SliderSwitch from "./SliderSwitch";

const styles = {
    ul: {
        listStyle: "none",
        margin: 0,
        padding: 0
    },
    status: {
        win: {fontWeight: '800', color: 'green'},
        draw: {fontWeight: '800', color: 'blue'},
    }
};

const Game = ({fieldWidth, fieldHeight, winCondition}) => {
    const [history, setHistory] = useState([{
        squares: Array(fieldWidth).fill(Array(fieldHeight).fill(null))
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [winner, setWinner] = useState(null);
    const totalNumberOfTurns = fieldHeight * fieldWidth;
    const [movesListOrder, setMovesListOrder] = useState('asc')

    const calculateWinner = (i, j, squares) => {
        const currentPlayer = squares[i][j]

        const calcRow = () => {
            let lineSet = []

            for (let k = j - 1; k >= 0; k--) {
                if (squares[i][k] !== currentPlayer) {
                    break;
                }
                lineSet.push(i * squares.length + k);
            }
            for (let k = j + 1; k < squares[i].length; k++) {
                if (squares[i][k] !== currentPlayer) {
                    break;
                }
                lineSet.push(i * squares.length + k);
            }
            return lineSet;
        }

        const calcColumn = () => {
            let lineSet = []

            for (let k = i - 1; k >= 0; k--) {
                if (squares[k][j] !== currentPlayer) {
                    break;
                }
                lineSet.push(k * squares.length + j);
            }
            for (let k = i + 1; k < squares.length; k++) {
                if (squares[k][j] !== currentPlayer) {
                    break;
                }
                lineSet.push(k * squares.length + j);
            }
            return lineSet;
        }

        const calcLeftDiag = () => {
            let lineSet = []

            for (let [k, l] = [i - 1, j - 1]; k >= 0 && l >= 0; k--, l--) {
                if (squares[k][l] !== currentPlayer) {
                    break;
                }
                lineSet.push(k * squares.length + l);
            }
            for (let [k, l] = [i + 1, j + 1]; k < squares.length && l < squares[i].length; k++, l++) {
                if (squares[k][l] !== currentPlayer) {
                    break;
                }
                lineSet.push(k * squares.length + l);
            }
            return lineSet;
        }

        const calcRightDiag = () => {
            let lineSet = []

            for (let [k, l] = [i + 1, j - 1]; k < squares.length && l >= 0; k++, l--) {
                if (squares[k][l] !== currentPlayer) {
                    break;
                }
                lineSet.push(k * squares.length + l);
            }
            for (let [k, l] = [i - 1, j + 1]; k >= 0 && l < squares[k].length; k--, l++) {
                if (squares[k][l] !== currentPlayer) {
                    break;
                }
                lineSet.push(k * squares.length + l);
            }
            return lineSet;
        }

        let result = [calcRow(), calcColumn(), calcLeftDiag(), calcRightDiag()]
            .filter(lineSet => lineSet.length + 1 >= winCondition)
        result = result.length ? result.reduce((pv, cv) => pv.concat(cv)) : []
        result.push(i * squares.length + j)
        return (result.length > 1 ? [currentPlayer, new Set(result)] : null);
    };

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
        setWinner(calculateWinner(i, j, squares))
    };


    const moves = history.map((step, move) => {
        const desc = move !== 0 ?
            `Switch to turn #${move}\n` +
            `${step.description.value}: (col: ${step.description.column}, row: ${step.description.row})` :
            `Switch to start of the game`;
        return (
            <li key={move}>
                <strong>{move + 1}</strong>
                &nbsp;
                <button onClick={() => setStepNumber(move)}>
                    <span style={move === stepNumber ? {fontWeight: 800} : {fontWeight: 400}}>
                        {desc}
                    </span>
                </button>
            </li>
        );
    });
    if (movesListOrder === 'desc') {
        moves.reverse()
    }

    const getStatusText = () => {
        if (winner && history.length - 1 === stepNumber) {
            return (
                <plaintext style={styles.status.win}>{`Winner: ${winner[0]}`}</plaintext>
            )
        } else if (stepNumber === totalNumberOfTurns) {
            return (
                <plaintext style={styles.status.draw}>Draw</plaintext>
            );
        }
        return (
            <plaintext>{`Next player: ${stepNumber % 2 ? 'O' : 'X'}`}</plaintext>
        );
    }

    return (
        <div className='game'>
            <div className="game-board">
                <Board
                    squares={history[stepNumber].squares}
                    onClick={(i, j) => makeTurn(i, j)}
                    winner={winner ? winner[1] : null}
                />
                <SliderSwitch onChange={() => movesListOrder === 'asc' ? setMovesListOrder('desc') : setMovesListOrder('asc')}/>
            </div>
            <div className="game-info">
                {getStatusText()}
                <ul style={styles.ul}>{moves}</ul>
            </div>
        </div>
    );
}

export default Game
