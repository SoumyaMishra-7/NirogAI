import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


if (!clerkPubKey) {
  throw new Error(
    "Missing Clerk Publishable Key! Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file."
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
