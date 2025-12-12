import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { ComparisonProvider } from "./context/ComparisonContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
      retry: 1,
      staleTime: 5 * 60 * 1000
    }
  }
})

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client = {queryClient}>
  <BrowserRouter>
    <ThemeProvider>
      <FavoritesProvider>
        <ComparisonProvider>
          <App />
        </ComparisonProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </BrowserRouter>
  </QueryClientProvider>
);
