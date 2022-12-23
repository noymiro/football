import './App.css';
import React from "react";
 import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom" ;
import HomePage from "./HomePage";
import BestScroingPage from "./BestScroingPage";
import TablesPage from "./TablesPage";
import HistoryPage from "./HistoryPage";
import StatisticsPage from "./StatisticsPage";

const navLinkStyle = ({isActive}) => isActive ? {
    color : "white",
    backgroundColor : "red" ,
    margin : 50 ,
    align : "center"





} : undefined;


class App extends React.Component {




    state = {

    }

    render() {
        return (
            <div id="App">
                <BrowserRouter>
                    <NavLink style={navLinkStyle} to={"/home"} className={"nav"} >Home</NavLink>
                    <NavLink style={navLinkStyle} to={"/scroing"} className={"nav"}>BestScroingPage</NavLink>
                    <NavLink style={navLinkStyle} to={"/tables"} className={"nav"}>TablesPage</NavLink>
                    <NavLink style={navLinkStyle} to={"/history"} className={"nav"}>HistoryPage</NavLink>
                    <NavLink style={navLinkStyle} to={"/statistics"}c lassName={"nav"}>StatisticsPage</NavLink>

                    <Routes>
                     <Route path={"/"} element={<HomePage />}/>
                     <Route path={"/scroing"} element={<BestScroingPage />}/>
                     <Route path={"/tables"} element={<TablesPage />}/>
                     <Route path={"/history"} element={<HistoryPage />}/>
                     <Route path={"/statistics"} element={<StatisticsPage />}/>
                 </Routes>
                    </BrowserRouter>
            </div>
        );
                     }


}
export default App;
