import Home from "./Home/Home";
import ContextProvider from "./ContextProvider/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
}

export default App;
