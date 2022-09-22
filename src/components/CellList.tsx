import { Fragment, useContext, useEffect } from "react";
import CellContext from "../context";
import { AddCell } from "./AddCell";
import { CellListItem } from "./CellListItem";

export const CellList = () => {
  const { state, insertCellBefore } = useContext(CellContext);
  const { data, order } = state;
  const orderedList = order.map((id) => data[id]);
  console.log(data);
  useEffect(() => {
    // insertCellBefore(null, "text");
  }, []);

  return (
    <div>
      {orderedList.map((cell) => (
        <Fragment key={cell.id}>
          <AddCell forceVisible={false} nextCellId={cell.id} />
          <CellListItem key={cell.id} cell={cell} />
        </Fragment>
      ))}
      <AddCell forceVisible={orderedList.length === 0} nextCellId={null} />
    </div>
  );
};
