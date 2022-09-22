import { ReactElement, useReducer } from "react";
import CellContext from "../context";
import { ActionType } from "../context/actions";
import { cellReducer } from "../context/reducers";
import { CellState, CellType, Direction } from "../context/types";

export const ContextWrapper = (props: any) => {
  const initialCellState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {},
  };

  const [state, dispatch] = useReducer(cellReducer, initialCellState);

  const updateCell = (id: string, content: string) => {
    dispatch({
      type: ActionType.UPDATE_CELL,
      payload: {
        id,
        content,
      },
    });
  };

  const moveCell = (id: string, direction: Direction) => {
    dispatch({
      type: ActionType.MOVE_CELL,
      payload: {
        id,
        direction,
      },
    });
  };

  const insertCellAfter = (id: string, cellType: CellType) => {
    dispatch({
      type: ActionType.INSERT_CELL_AFTER,
      payload: {
        id,
        cellType,
      },
    });
  };

  const deleteCell = (id: string) => {
    dispatch({
      type: ActionType.DELETE_CELL,
      payload: id,
    });
  };

  return (
    <CellContext.Provider
      value={{ state, updateCell, moveCell, deleteCell, insertCellAfter }}
    >
      {props.children}
    </CellContext.Provider>
  );
};
