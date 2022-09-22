import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createRoot } from "react-dom/client";
import { CellList } from "./components/CellList";
import { ContextWrapper } from "./components/Wrapper";
const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  return (
    <ContextWrapper>
      <div>
        <CellList />
      </div>
    </ContextWrapper>
  );
};

root.render(<App />);
