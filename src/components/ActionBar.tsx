import React, { useContext } from "react";
import CellContext from "../context";

interface ActionBarProps {
  id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useContext(CellContext);
  return (
    <div>
      <button onClick={() => moveCell(id, "up")}>Up</button>
      <button onClick={() => moveCell(id, "down")}>Down</button>
      <button onClick={() => deleteCell(id)}>Delete</button>
    </div>
  );
};
