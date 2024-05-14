import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './styles.module.css'; 

import App from "./App";

import { AuthContextProvider } from './store/auth-context';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


//<AuthContextProvider> -> is to use the context by provide it to your whole app

root.render(
  <AuthContextProvider> 
      <App />
  </AuthContextProvider>
);
