import React from "react";
import Board from "./Board";

class Game extends React.Component
{
   defaultState()
   {
      const state = {
         squares: Array(9).fill(null),
         xIsNext: true,
         winner: null,
         status: 'Next player: X',
      }

      return {
         history: [state],
         historyPos: 0,
         undoable: false,
         redoable: false,
      }
   }

   constructor(props)
   {
      super(props);

      this.state = this.defaultState();
   }

   //----------------------------------------------------------------------------------------
   undo()
   {
      if(!this.state.undoable)
         return;

      console.log("undo" , this.state);
      const newHistoryPos = this.state.historyPos -1;

      const newState = {
         history: [...this.state.history],
         historyPos: newHistoryPos,
         undoable: newHistoryPos > 0,
         redoable: true,
      }

      console.log('newState', newState);

      this.setState(newState);
   }

   //----------------------------------------------------------------------------------------
   redo()
   {
      if(!this.state.redoable)
         return;

      const newHistoryPos = this.state.historyPos + 1;

      const newState = {
         history: [...this.state.history],
         historyPos: newHistoryPos,
         undoable: newHistoryPos > 0,
         redoable: (newHistoryPos < (this.state.history.length -1))
      };

      this.setState(newState);

   }

   //----------------------------------------------------------------------------------------
   handleClick(i)
   {
      const currentState = this.state.history[this.state.historyPos];
      if(currentState.winner || currentState.squares[i])
         return;

      const newSquares = [...currentState.squares];
      newSquares[i] =  currentState.xIsNext ? 'X' : 'O';

      const winner = this.calculateWinner(newSquares);
      const xIsNext= !currentState.xIsNext
      const status =  winner ? `Winner ${winner}`
         : `Next player: ${xIsNext ? 'X' : 'O'}`;

      const newHistory = this.state.history.slice(0, this.state.historyPos +1);
      newHistory.push({
         squares: newSquares,
         xIsNext: xIsNext,
         winner: winner,
         status: status,
      });

      const newState = {
         history: newHistory,
         historyPos: newHistory.length - 1,
         undoable: newHistory.length > 1,
         redoable: false,
      }
      this.setState(newState);
      console.log("handleClick", newState);
   }

   //----------------------------------------------------------------------------------------
   calculateWinner(squares)
   {
      const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8],
         [0, 3, 6], [1, 4, 7], [2, 5, 8],
         [0, 4, 8], [2, 4, 6], ];

      for (let i = 0; i < lines.length; i++)
      {
         const [a, b, c] = lines[i];

         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
         {
            return squares[a];
         }
      }

      return null;
   }

   //----------------------------------------------------------------------------------------
   jumpTo(index)
   {

   }

   //----------------------------------------------------------------------------------------
   moves()
   {
      return this.state.history.map((state, move) =>
      {
         const desc = move ? 'Go to move #' + move : 'Go to game start';
         return (
            <li key={move}>
               <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
         )
      });
   }
   //----------------------------------------------------------------------------------------
    render()
    {

       const currentState = this.state.history[this.state.historyPos];

       return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={currentState.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{currentState.status}</div>
                   <button
                      onClick={() => this.undo()}
                      disabled={ !this.state.undoable }
                   >{'Undo'} </button>
                   <button
                      onClick={() => this.redo()}
                      disabled={ !this.state.redoable}
                   >{'Redo'}</button>
                </div>
            </div>
        );
    }
}

export default Game;