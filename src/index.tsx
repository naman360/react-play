import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import { CodeCell } from "./components/CodeCell";
import { TextEditor } from "./components/TextEditor";
import CellContext from "./context";
import { CellState } from "./context/types";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const st: CellState = { loading: true, error: null, order: [], data: {} };
  return (
    <CellContext.Provider value={st}>
      <div>
        <TextEditor />
        {/* <CodeCell /> */}
      </div>
    </CellContext.Provider>
  );
};

root.render(<App />);
