import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feedback } from "./pages/Feedback";
import Result from "./pages/Result";
import React from "react";
import Home from "./pages/Home";
import Nav from "./Nav/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const client = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/Feedback" element={<Feedback />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}
export default App;
