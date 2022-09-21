import { useContext, useEffect } from "react";
import CellContext from "../context";
import { CellListItem } from "./CellListItem";

export const CellList = () => {
  const { state, insertCellBefore } = useContext(CellContext);
  const { data, order } = state;
  const orderedList = order.map((id) => data[id]);
  console.log(data);
  useEffect(() => {
    insertCellBefore(null, "text");
  }, []);

  return (
    <div>
      {orderedList.map((cell) => (
        <CellListItem key={cell.id} cell={cell} />
      ))}
    </div>
  );
};
