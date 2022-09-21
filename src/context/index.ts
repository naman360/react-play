import { createContext } from "react";
import { CellState } from "./types";
interface ContextType {
  state: CellState;
  updateCell: Function;
  moveCell: Function;
  insertCellBefore: Function;
  deleteCell: Function;
}

const CellContext = createContext<ContextType>({} as ContextType);

export default CellContext;
