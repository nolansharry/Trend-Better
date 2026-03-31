import { Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

export default function App() {
  const element = useRoutes(routes);
  return element;
}