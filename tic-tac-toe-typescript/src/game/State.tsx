
export default
class State
{
    readonly squares: Array<string>;
    readonly xIsNext: boolean;
    readonly winner: string;
    readonly status: string;

    //-----------------------------------------------------------------------------------------------
    constructor(squares: Array<string>, xIsNext: boolean, winner: string, status: string)
    {
        this.squares = squares;
        this.xIsNext = xIsNext;
        this.winner = winner;
        this.status = status;
    }
}