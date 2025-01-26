import AppProviders from "./components/providers/AppProviders";
import AppRouter from "./components/routing/AppRouter";

const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);

export default App;