import {Routes, Route, BrowserRouter} from "react-router-dom";
import './App.css';
import StartStudy from "./StartStudy";
import CheckStudy from "./CheckStudy";
import Home from "./Home";
import React, { useCallback, useEffect, useReducer, useRef, useMemo } from "react";

const reducer = (state, action) => {
  let newData = [];
  switch(action.type){
    case "INIT":
      return action.data;
    case "CREATE":
      newData = [action.data, ...state]
      break;
    case "REMOVE":
      newData = state.filter((it) => parseInt(it.id) !== parseInt(action.id));
      break;
    default:
      return state;
  }
  localStorage.setItem("data", JSON.stringify(newData));
  return newData;

}

export const DataStateContext = React.createContext();
export const DataDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);
  
  useEffect(() => {
  const localdata = localStorage.getItem("data");
  if(localdata){
    const sortedData = JSON.parse(localdata).sort((a, b) => parseInt(b.id) - parseInt(a.id));
    if(sortedData.length > 0){
      idRef.current = parseInt(sortedData[0].id + 1);
      dispatch({type: "INIT", data: sortedData});
      
    }
  }
  }, []);

  const onCreate = useCallback((time, date) => {
    const newData = {
      id: idRef.current,
      time,
      date: new Date(date).getTime()

    }
    dispatch({type: "CREATE", data: newData});
    idRef.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({type: "REMOVE", id: parseInt(targetId)});
  }, []);

  const memorizedDispatch = useMemo(() => {
    return {onCreate, onRemove}; 
  }, []);


  return (
    <div className="App">
    <DataStateContext.Provider value={data}>
    <DataDispatchContext.Provider value={memorizedDispatch}>
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
