import Square from "./Square";

const Board = ({squares, onClick, winner}) => {
    return <div>
        {squares.map((row, i) =>
            <div key={i} className="board-row">
                {row.map((_, j) => <Square key={squares.length * i + j}
                                           value={squares[i][j]}
                                           onClick={() => onClick(i, j)}
                                           color={winner && winner.has(i * squares.length + j) ? 'green' : 'black'}
                />)}
            </div>
        )}
    </div>
}

export default Board
