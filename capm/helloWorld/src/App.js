import React, {useEffect} from "react";
import "./App.css";
import NotFound from "pages/NotFound";
import AppBar from "components/AppBar";
import MasterPage from "pages/MasterPage";
import HelloWorld from "pages/HelloWorld";

const App = () => {

  useEffect(()=>{
    fetch('https://port44985-workspaces-ws-lpq4c.us10.trial.applicationstudio.cloud.sap/').then((res)=> res.json).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

  return (
    <div className="App full-height">
      <AppBar />
      <HelloWorld/>
      {/* <MasterPage /> */}
    </div>
  );
};

export default App;
