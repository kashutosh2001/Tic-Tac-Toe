import React, { useState } from 'react'
import Square from './Square';

const Board = () => {

    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    
    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let logic of winningCombinations) {
            const [a, b, c] = logic;
            if (state[a] === state[b] && state[a] === state[c] && state[a] != null) {
                return state[a];
            }
        }
        return false;
    };

    const isWinner = checkWinner();
    
    // Check for draw condition - all squares filled and no winner
    const isDraw = !isWinner && state.every(square => square !== null);

    const handleClick = (index) => {
        if (state[index] != null || isWinner) {
            return;
        }
        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O";
        setState(copyState);
        setIsXTurn(!isXTurn);
    };

    const handleReset = () => {
        setState(Array(9).fill(null));
        setIsXTurn(true);
    };

    return (
        <div className='board-container'>
            <center><h1><u>Welcome to Tic-Tac-Toe Game</u></h1></center>
            {isWinner ? (
                <div>
                    <h2>Congratulations...!!!!, Player {isWinner} Won..!!!</h2>
                    <button className='play-again' onClick={handleReset}>Play Again</button>
                </div>
            ) : isDraw ? (
                <div>
                    <h2>Match Draw!</h2>
                    <button className='play-again' onClick={handleReset}>Play Again</button>
                </div>
            ) : (
                <>
                    <h4>Player {isXTurn ? "X" : "O"} Turn</h4>
                    <div className='board-row'>
                        <Square onClick={() => handleClick(0)} value={state[0]} />
                        <Square onClick={() => handleClick(1)} value={state[1]} />
                        <Square onClick={() => handleClick(2)} value={state[2]} />
                    </div>
                    <div className='board-row'>
                        <Square onClick={() => handleClick(3)} value={state[3]} />
                        <Square onClick={() => handleClick(4)} value={state[4]} />
                        <Square onClick={() => handleClick(5)} value={state[5]} />
                    </div>
                    <div className='board-row'>
                        <Square onClick={() => handleClick(6)} value={state[6]} />
                        <Square onClick={() => handleClick(7)} value={state[7]} />
                        <Square onClick={() => handleClick(8)} value={state[8]} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Board