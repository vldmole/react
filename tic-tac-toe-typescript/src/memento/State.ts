import Memento from "./Memento";


export default
class State
{
    readonly history: any;
    readonly historyPos: number;
    readonly undoAble: boolean;
    readonly redoAble: boolean;

    //---------------------------------------------------------------------------------------------
    constructor(history: Array<Memento>, historyPos: number, undoAble: boolean, redoAble: boolean)
    {
        this.history = history;
        this.historyPos = historyPos;
        this.undoAble = undoAble;
        this.redoAble = redoAble;
    }
}