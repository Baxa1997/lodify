import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./router/router";
import "react-tabs/style/react-tabs.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </div>
  );
}

export default App;
