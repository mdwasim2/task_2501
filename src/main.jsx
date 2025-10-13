import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store.js";
createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  </>
);
