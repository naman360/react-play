import { ReactElement } from "react";
import { Cell } from "../context/types";
import { ActionBar } from "./ActionBar";
import { CodeCell } from "./CodeCell";
import { TextEditor } from "./TextEditor";
import "./cell-list-item.css";
interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: ReactElement;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );

  return <div className="cell-list-item">{child}</div>;
};
