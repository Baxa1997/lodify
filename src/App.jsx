import {ChakraProvider} from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./router/router";
import "react-tabs/style/react-tabs.css";

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
