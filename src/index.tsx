import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import { CodeCell } from "./components/CodeCell";
import { TextEditor } from "./components/TextEditor";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  return (
    <div>
      <TextEditor />
      {/* <CodeCell /> */}
    </div>
  );
};

root.render(<App />);
