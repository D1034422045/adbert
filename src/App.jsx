import GroupOrientation from "./components/GroupOrientation";
import Chart from "./components/Chart";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <GroupOrientation></GroupOrientation>
        <Chart></Chart>
      </Provider>
    </>
  );
}

export default App;
