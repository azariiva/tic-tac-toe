import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Text, StyleSheet } from 'react-native';

const textStyles = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },
    default: {
        fontWeight: 'normal'
    }
})

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i, j) {
        return (
            <Square
                value={this.props.squares[i][j]}
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    render() {
        return (
            <div>
                {this.props.squares.map((row, i) =>
                    <div className="board-row">
                        {row.map((_, j) => this.renderSquare(i, j))}
                    </div>
                )}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(3).fill(Array(3).fill(null)),
                turn: null
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move !== 0 ?
                `Switch to turn #${move}\n` +
                `${step.description.value}: (col: ${step.description.column}, row: ${step.description.row})`:
                `Switch to start of the game`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        <Text style={move === this.state.stepNumber ? textStyles.bold : textStyles.default}>
                            {desc}
                        </Text>
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i, j) => this.handleClick(i, j)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.map(row => row.slice());

        if (calculateWinner(squares) || squares[i][j]) {
            return;
        }
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                description: {
                    value: squares[i][j],
                    row: i,
                    column: j,
                }
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

