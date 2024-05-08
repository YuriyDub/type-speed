import ReactDOM from "react-dom/client";
import { AuthProvider } from "./components/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthProvider>
);
