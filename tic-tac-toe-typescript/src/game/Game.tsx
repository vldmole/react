import React from "react";
import Board from "./Board";
import State from "./State";
import UndoRedo from "../memento/undo-redo";
import Memento from "../memento/Memento";
import ChangeListener from "../memento/ChangeListener";


export default
class Game extends React.Component<any, State>
{
   private stateChangeListener: Array<ChangeListener>;

   //----------------------------------------------------------------------------------------
   private defaultState(): State
   {
      return new State( Array<string>(9).fill(null),
         true, null,'Next player: X');
   }

   //----------------------------------------------------------------------------------------
   constructor(props: any)
   {
      super(props);

      this.state = this.defaultState();
   }

   //----------------------------------------------------------------------------------------
   handleClick(i)
   {
      console.log("handleClick");

      const state: State = this.state;
      if(state.winner || state.squares[i])
         return;

      const newSquares = [...state.squares];
      newSquares[i] =  state.xIsNext ? 'X' : 'O';

      const winner = this.calculateWinner(newSquares);
      const xIsNext= !state.xIsNext
      const status =  winner ? `Winner ${winner}`
         : `Next player: ${xIsNext ? 'X' : 'O'}`;

      const newState: State = new State(newSquares, xIsNext, winner, status);
      this.setState(newState, () =>
      {
         console.log("firingStateChangeListeners");
         this.stateChangeListener.forEach( (element, index) => {
            console.log("listener " + index);
            element.handleSubjectStateChange();
         });
      });

      console.log(newState);
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
   createMemento(): Memento
   {
      return new Memento(this.state);
   }

   //----------------------------------------------------------------------------------------
   setMemento(memento): void
   {
      this.setState(memento.memo);
   }

   //----------------------------------------------------------------------------------------
   addSubjectStateChangeListener(listener): void
   {
      if(!this.stateChangeListener)
         this.stateChangeListener = [];

      if(this.stateChangeListener.indexOf(listener) < 0)
         this.stateChangeListener.push(listener);
   }

   //----------------------------------------------------------------------------------------
    render()
    {
       console.log("game rendering");

       const state = this.state;

       return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={state.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{state.status}</div>
                    <UndoRedo subject = {this} />
                </div>
            </div>
        );
    }
}