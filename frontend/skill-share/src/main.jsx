import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem} from "@chakra-ui/react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PostDataContextProvider } from "./ContextApi/PostData";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider value={defaultSystem}>
    <PostDataContextProvider>
      <App />
    </PostDataContextProvider>
    </ChakraProvider>
    
  </BrowserRouter>
);