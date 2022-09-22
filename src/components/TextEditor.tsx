import MDEditor from "@uiw/react-md-editor";
import { useContext, useEffect, useRef, useState } from "react";
import CellContext from "../context";
import { Cell } from "../context/types";
import "../css/text-editor.css";

interface TextEditorProps {
  cell: Cell;
}

export const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  const [editing, setEditing] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useContext(CellContext);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      )
        return;
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v)}
        />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};
