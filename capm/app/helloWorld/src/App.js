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

    fetch('/81b0f573-c419-4628-97e8-f7e76fc17621.capm.helloWorld-1.0.0/service/timesheet/SSITimeSheetData', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
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
