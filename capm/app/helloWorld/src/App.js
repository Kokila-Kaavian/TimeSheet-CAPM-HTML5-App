import React, {useEffect} from "react";
import "./App.css";
import NotFound from "./pages/NotFound";
import AppBar from "./components/AppBar";
// import MasterPage from "pages/MasterPage";
import HelloWorld from "./pages/HelloWorld";
import axios from "axios";

const App = () => {

  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    console.log(token);
    axios.get('/service/timesheet/SSITimeSheetData', {
      headers: {
        'Content-Type': 'application/json'
  }
    }).then((res)=> res.json).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  },);

  return (
    <div className="App full-height">
      <AppBar />
      <HelloWorld/>
      {/* <MasterPage /> */}
    </div>
  );
};

export default App;
