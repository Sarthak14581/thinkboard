import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import toast from "react-hot-toast";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/create", element: <CreatePage /> },
  { path: "/note/:id", element: <NoteDetailPage /> },
]);

const App = () => {
  return (
    <div className="relative h-full w-full" data-theme="dracula">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#FFF0F0_100%)]" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
