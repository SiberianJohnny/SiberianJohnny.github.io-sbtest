import './App.css';
import Table from './components/Table/Table';
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Table />
    </Provider>
  );
}

export default App;
