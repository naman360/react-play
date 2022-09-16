import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import "./text-editor.css";
export const TextEditor = () => {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  const [editing, setEditing] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
      <div ref={ref}>
        <MDEditor value={value} onChange={setValue} />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={"# Header"} />
    </div>
  );
};
