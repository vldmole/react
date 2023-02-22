import React from "react";
import State from "./State";


export default
class UndoRedo extends React.Component
{
    constructor(props)
    {
        super(props);
        if(!props.subject)
            throw String('Invalid props');

        this.subject = props.subject;
        this.subject.addSubjectStateChangeListener(this);

        this.state = new State([], -1,false, false);
    }

    componentDidMount()
    {
       this.handleSubjectStateChange();
    }

    //----------------------------------------------------------------------------------------
    handleSubjectStateChange()
    {
        console.log("handlingSubjectStateChange");
        const memento = this.subject.createMemento();

        const state = this.state;
        const newHistory = state.history.slice(0, state.historyPos + 1).concat(memento);

        const newState = new State(
            newHistory,
            state.historyPos + 1,
            newHistory.length > 1,
            false );

        console.log(newState);
        this.setState(newState);
    }

    //----------------------------------------------------------------------------------------
    undo()
    {
        console.log("undoing");

        const state = this.state;
        if(!state.undoAble)
            return;

        console.log("undo" , state);

        const newHistoryPos = state.historyPos -1;
        const memento = state.history[newHistoryPos];
        this.subject.setMemento(memento);


        const newState = {
            ...state,
            historyPos: newHistoryPos,
            undoAble: (newHistoryPos > 0),
            redoAble: true,
        }
        this.setState(newState);

        console.log('newState', newState);
    }

    //----------------------------------------------------------------------------------------
    redo()
    {
        console.log("redoing");

        const state = this.state;
        if(!state.redoAble)
            return;

        console.log("redo" , state);
        const newHistoryPos = state.historyPos +1;
        const memento = this.state.history[newHistoryPos];
        this.subject.setMemento(memento);

        const newState = {
            ...state,
            historyPos: newHistoryPos,
            undoAble: true,
            redoAble: ((newHistoryPos + 1) < state.history.length),
        }
        this.setState(newState);

        console.log('newState', newState);
    }

    //----------------------------------------------------------------------------------------
    render()
    {
        return (
            <div>
                <button
                    onClick={() => {console.log("invocking undo"); this.undo()}}
                    disabled={ !this.state.undoAble }
                >{'Undo'} </button>
                <button
                    onClick={() => {console.log("invocking redo");this.redo()}}
                    disabled={ !this.state.redoAble}
                >{'Redo'}</button>
            </div>
        );
    }
}