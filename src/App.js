import "./App.css";
import GlobalConfigData from "./config/globalConfig.json";
import RouterConfig from "./routes/Routes";

function App() {
  return (
    <div>
      <RouterConfig data={GlobalConfigData} />
    </div>
  );
}

export default App;
