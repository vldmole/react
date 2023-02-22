

export default
class State
{
    constructor(history, historyPos, undoAble, redoAble)
    {
        this.history = history;
        this.historyPos = historyPos;
        this.undoAble = undoAble;
        this.redoAble = redoAble;
    }
}