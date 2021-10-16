import Square from "./Square";

const Board = ({squares, onClick}) =>
    <div>
        {squares.map((row, i) =>
            <div className="board-row">
                {row.map((_, j) => <Square
                    value={squares[i][j]}
                    onClick={() => onClick(i, j)}
                />)}
            </div>
        )}
    </div>

export default Board
