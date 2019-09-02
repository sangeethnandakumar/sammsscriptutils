import React from 'react';
import './App.css';
import MainPage from "./pages/main";
import NavBar from "./components/navbar";
import AlterColumn from "./pages/altercolumn";
import DynamicDropdown from "./pages/dynamicdropdown";
import DynamicScripts from "./pages/dynamicscripts";
import AddSignature from "./pages/addsignature";
import {Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <NavBar/>
        <br />
        <div className="content">
            <Route path="/" exact component={MainPage}/>
            <Route path="/altercolumn" exact component={AlterColumn}/>
            <Route path="/dynamicdropdown" exact component={DynamicDropdown}/>
            <Route path="/dynamicscripts" exact component={DynamicScripts}/>
            <Route path="/addsignature" exact component={AddSignature}/>
        </div>
    </div>
  );
}

export default App;
