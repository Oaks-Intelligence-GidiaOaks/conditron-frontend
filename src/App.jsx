import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./routes/routeConfig";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AutoLogout from "./components/protected/AutoLogout";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AutoLogout />
            <RouterConfig />
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
