import { createContext } from "react";

interface Cell {
  id: string;
  type: "code" | "text";
  content: string;
}

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}
const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const CellContext = createContext(initialState);

export default CellContext;
