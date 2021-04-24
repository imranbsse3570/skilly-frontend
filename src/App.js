import "./App.css";
import Header from "./components/header/Navbar";
import HomePage from "./components/homepage/Homepage";
import Footer from "./components/footer/Footer";
import GlobalConfigData from "./config/globalConfig.json";

function App() {
  return (
    <div>
      <Header />
      <HomePage />
      <Footer data={GlobalConfigData.footer} />
    </div>
  );
}

export default App;
