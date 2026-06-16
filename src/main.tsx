import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const path = window.location.pathname;

const root = createRoot(document.getElementById("root")!);

if (path === '/admin' || path === '/admin/') {
  root.render(<AdminPage />);
} else {
  root.render(<App />);
}