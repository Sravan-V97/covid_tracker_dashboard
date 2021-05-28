import Chart from "chart.js";
import "./App.css";
import ApexChart from "./Components/ApexChart";
import NavigationBar from "./Components/Navigation";
import ResponsiveDrawer from "./Components/Navigation";
import DashboardTest from "./Scenes/DashBoard";
import DashboardToTest from "./Scenes/DashBoard/test";

import CountryCases from "./Scenes/DashBoard/CountryCases";
import CountryWide from "./Scenes/DashBoard/CountryWide";
import ChartData from "./Scenes/DashBoard/DailyInfectedGraph";
import WorldGraph from "./Scenes/DashBoard/LineChart";
import MostAffected from "./Scenes/DashBoard/MostAffected";
import TopStories from "./Scenes/DashBoard/TopStories";
import WorldMap from "./Scenes/DashBoard/WorldMap";
import WorldCases from "./Scenes/DashBoard/WorldWide";

function App() {
  return (
    <div className="App">
      {/* <NavigationBar /> */}
      {/* <ResponsiveDrawer /> */}
      {/* <WorldCases /> */}
      {/* <CountryWide /> */}
      {/* <CountryCases /> */}
      {/* <DashboardTest /> */}
      {/* <MostAffected /> */}
      {/* <TopStories /> */}
      {/* <ApexChart /> */}
      {/* <WorldGraph /> */}
      {/* <WorldMap /> */}
      {/* <ChartData /> */}
      <DashboardToTest />
    </div>
  );
}

export default App;
