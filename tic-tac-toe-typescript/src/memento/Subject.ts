import ChangeListener from "./ChangeListener";
import Memento from "./Memento";

export default
interface Subject
{
    addSubjectStateChangeListener(listener: ChangeListener): void;

    createMemento(): Memento;

    setMemento(memento: Memento): void;
}