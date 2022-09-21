import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useContext } from "react";
import { createRoot } from "react-dom/client";
import { CodeCell } from "./components/CodeCell";
import { TextEditor } from "./components/TextEditor";
import { ContextWrapper } from "./components/Wrapper";
import CellContext from "./context";
import { CellState } from "./context/types";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const { state } = useContext(CellContext);
  console.log(state);

  return (
    <ContextWrapper>
      <div>
        <TextEditor />
        {/* <CodeCell /> */}
      </div>
    </ContextWrapper>
  );
};

root.render(<App />);
