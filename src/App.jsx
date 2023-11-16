import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./routes/routeConfig";

function App() {
  return (
    <>
      <Router>
        <RouterConfig />
      </Router>
    </>
  );
}

export default App;
