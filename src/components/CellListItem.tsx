import { ReactElement } from "react";
import { Cell } from "../context/types";
import { ActionBar } from "./ActionBar";
import { CodeCell } from "./CodeCell";
import { TextEditor } from "./TextEditor";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: ReactElement;
  if (cell.type === "code") {
    child = <CodeCell cell={cell} />;
  } else child = <TextEditor cell={cell} />;

  return (
    <div>
      <ActionBar id={cell.id} />
      {child}
    </div>
  );
};
