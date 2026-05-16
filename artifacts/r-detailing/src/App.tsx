import { Switch, Route, Router as WouterRouter } from "wouter";
import Home from "@/pages/home/page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <p className="text-white">Página no encontrada</p>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
