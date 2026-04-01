import { useRoutes } from "react-router-dom";
import { useAppRoutes } from "./routes/routes";

export default function App() {
  const routes = useAppRoutes();
  return useRoutes(routes);
}
