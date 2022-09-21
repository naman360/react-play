import { Cell, CellState } from "./types";
import { ActionType } from "./actions";
export const cellReducer = (state: CellState, action: any): CellState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex(
        (id: string) => id === action.payload.id
      );
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      const modifiedOrder = state.order;
      if (targetIndex > 0 || targetIndex < state.order.length - 1) {
        modifiedOrder[index] = modifiedOrder[targetIndex];
        modifiedOrder[targetIndex] = action.payload.id;
      }
      return {
        ...state,
        order: modifiedOrder,
      };
    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        type: action.payload.type,
        content: "",
        id: randomId(),
      };
      const foundIndex = state.order.findIndex(
        (id: string) => id === action.payload.id
      );
      const newCellOrder = state.order;
      if (foundIndex < 0) {
        newCellOrder.push(cell.id);
      } else {
        newCellOrder.splice(foundIndex, 0, cell.id);
      }
      return {
        ...state,
        data: {
          ...state.data,
          [cell.id]: cell,
        },
        order: newCellOrder,
      };
    case ActionType.DELETE_CELL:
      const newOrder = state.order.filter((id: string) => id != action.payload);
      const newState = {
        ...state,
      };
      delete newState.data[action.payload];
      return {
        ...newState,
        order: newOrder,
      };
    default:
      return state;
  }
};

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};
