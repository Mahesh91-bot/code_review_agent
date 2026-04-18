import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('SAGE: missing #root — check that index.html contains <div id="root"></div>.');
}

createRoot(rootEl).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
