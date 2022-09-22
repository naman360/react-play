import { Fragment, useContext, useEffect } from "react";
import CellContext from "../context";
import { AddCell } from "./AddCell";
import { CellListItem } from "./CellListItem";

export const CellList = () => {
  const { state, insertCellAfter } = useContext(CellContext);
  const { data, order } = state;
  const orderedList = order.map((id) => data[id]);

  return (
    <div>
      <AddCell forceVisible={orderedList.length === 0} nextCellId={null} />

      {orderedList.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem key={cell.id} cell={cell} />
          <AddCell forceVisible={false} nextCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};
