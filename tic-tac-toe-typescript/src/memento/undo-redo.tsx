import React from "react";
import State from "./State";
import Subject from "./Subject";
import ChangeListener from "./ChangeListener";


export default
class UndoRedo
    extends React.Component<any,State>
    implements ChangeListener
{
    private subject: Subject;
    readonly state: Readonly<State>;

    constructor(props: { subject: Subject; })
    {
        super(props);

        if(!props.subject)
            throw String('Invalid props');

        this.subject = props.subject;
        this.subject.addSubjectStateChangeListener(this);

        this.state = new State( [],  -1,  false,  false);
    }

    componentDidMount(): void
    {
       this.handleSubjectStateChange();
    }

    //----------------------------------------------------------------------------------------
    handleSubjectStateChange(): void
    {
        console.log("handlingSubjectStateChange");
        const memento = this.subject.createMemento();

        const state:State = this.state;
        const newHistory = state.history.slice(0, state.historyPos + 1).concat(memento);

        const newState = new State(
            newHistory,
            state.historyPos + 1,
            newHistory.length > 1,
            false );

        console.log(newState);
        super.setState(newState);
    }

    //----------------------------------------------------------------------------------------
    undo(): void
    {
        console.log("undoing");

        const state: State = this.state;
        if(!state.undoAble)
            return;

        console.log("undo" , state);

        const newHistoryPos = state.historyPos -1;
        const memento = state.history[newHistoryPos];
        this.subject.setMemento(memento);


        const newState: State = {
            ...state,
            historyPos: newHistoryPos,
            undoAble: (newHistoryPos > 0),
            redoAble: true,
        }
        super.setState(newState);

        console.log('newState', newState);
    }

    //----------------------------------------------------------------------------------------
    redo(): void
    {
        console.log("redoing");

        const state: State = this.state;
        if(!state.redoAble)
            return;

        console.log("redo" , state);
        const newHistoryPos = state.historyPos +1;
        const memento = this.state.history[newHistoryPos];
        this.subject.setMemento(memento);

        const newState: State = {
            ...state,
            historyPos: newHistoryPos,
            undoAble: true,
            redoAble: ((newHistoryPos + 1) < state.history.length),
        }
        super.setState(newState);

        console.log('newState', newState);
    }

    //----------------------------------------------------------------------------------------
    render()
    {
        return (
            <div>
                <button
                    onClick={() => {console.log("invoking undo"); this.undo()}}
                    disabled={ !this.state.undoAble }
                >{'Undo'} </button>
                <button
                    onClick={() => {console.log("invoking redo");this.redo()}}
                    disabled={ !this.state.redoAble}
                >{'Redo'}</button>
            </div>
        );
    }
}