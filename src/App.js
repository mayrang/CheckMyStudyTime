import {Routes, Route, BrowserRouter} from "react-router-dom";
import './App.css';
import StartStudy from "./StartStudy";
import CheckStudy from "./CheckStudy";
import Home from "./Home";
import React, { useCallback, useEffect, useReducer, useRef } from "react";

const reducer = (state, action) => {
  switch(action.type){
    case "INIT":
      return action.data;
    default:
      return state;
  }
}

export const DataStateContext = React.createContext();
export const DataDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);
  
  useEffect(() => {
  const localdata = localStorage.getItem("data");
  console.log(localdata)
  if(localdata){
    const sortedData = JSON.parse(localdata).sort((a, b) => parseInt(b.id) - parseInt(a.id));
    dispatch({type:"INIT", data:sortedData});
    idRef.current = parseInt(data[0].id + 1);
  }
  }, []);

  const onCreate = useCallback(() => {
    
  }, []);

  return (
    <div className="App">
    <DataStateContext.Provider value={data}>
    <DataDispatchContext.Provider value={""}>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/start_study"} element={<StartStudy />} />
        <Route path={"/check_study/:id"} element={<CheckStudy />} />
      </Routes>
    </BrowserRouter>
    </DataDispatchContext.Provider>
    </DataStateContext.Provider>
    </div>
    
  );
}

export default App;
