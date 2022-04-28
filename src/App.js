import {Routes, Route, BrowserRouter} from "react-route-dom";
import './App.css';
import StartStudy from "./StartStudy";
import CheckStudy from "./CheckStudy";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/start_study"} element={<StartStudy />} />
        <Route path={"/check_study/:id"} element={<CheckStudy />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
