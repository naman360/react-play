import { createContext, Dispatch } from "react";
import { Action, CellState } from "./types";

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export const updateCell = (id: string, content: string) => {};

const CellContext = createContext(initialState);

export default CellContext;
