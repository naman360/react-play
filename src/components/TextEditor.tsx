import MDEditor from "@uiw/react-md-editor";
import { useContext, useEffect, useRef, useState } from "react";
import CellContext from "../context";
import "./text-editor.css";
export const TextEditor = () => {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  const [editing, setEditing] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { loading, data } = useContext(CellContext);
  useEffect(() => {
    console.log(loading, data);
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
        <MDEditor value={value} onChange={setValue} />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};
