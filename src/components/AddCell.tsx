import { useContext } from "react";
import CellContext from "../context";
import "../css/add-cell.css";
interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

export const AddCell: React.FC<AddCellProps> = ({
  forceVisible,
  nextCellId,
}) => {
  const { insertCellAfter } = useContext(CellContext);
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellAfter(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellAfter(nextCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};
