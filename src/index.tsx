import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import { CodeCell } from "./components/CodeCell";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

root.render(<App />);
