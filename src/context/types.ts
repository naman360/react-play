import { ActionType } from "./actions";

export type Direction = "up" | "down";
export type CellType = "code" | "text";
export interface Cell {
  id: string;
  type: "code" | "text";
  content: string;
}

export interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}
