import React, { useContext, useEffect, useState } from "react";
import bundle from "../bundler";
import CellContext from "../context";
import { Cell } from "../context/types";
import { CodeEditor } from "./CodeEditor";
import { Preview } from "./Preview";
import { Resizable } from "./Resizable";

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [inputCode, setInputCode] = useState<string | undefined>("");
  const [error, setError] = useState<string>("");
  const [bundledOutput, setBundledOutput] = useState<string>("");
  const { updateCell } = useContext(CellContext);
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setBundledOutput(output.code);
      setError(output.error);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={bundledOutput} err={error} />
      </div>
    </Resizable>
  );
};
