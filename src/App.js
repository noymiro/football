import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom" ;
import HomePage from "./HomePage";
import TheLeadingScorers from "./TheLeadingScorers";
import TablesPage from "./TablesPage";
import HistoryPage from "./HistoryPage";
import StatisticsPage from "./StatisticsPage";


const navLinkStyle = ({isActive}) => isActive ? {
    color: "white",
    backgroundColor: "red",
    margin: 50,
    align: "center" ,
    column : "center"
} : undefined;


class App extends React.Component {


    state = {}

    render() {
        return (
            <div id="App">
                <h1>Football App</h1>
                <BrowserRouter>
                    <NavLink  style={navLinkStyle} to={"/homepage"} className={"nav"}>HomePage</NavLink>
                    <NavLink style={navLinkStyle} to={"/tables"} className={"nav"}>TablesPage</NavLink>
                    <NavLink style={navLinkStyle} to={"/TheLeadingScorers"} className={"nav"}>TheLeadingScorers</NavLink>
                    <NavLink style={navLinkStyle} to={"/history"} className={"nav"}>HistoryPage</NavLink>
                    <NavLink style={navLinkStyle} to={"/statistics"} className={"nav"}>StatisticsPage</NavLink>

                    <Routes>
                        <Route path={"/homepage"} element={<HomePage/>}/>
                        <Route path={"/tables"} element={<TablesPage/>}/>
                        <Route path={"/TheLeadingScorers"} element={<TheLeadingScorers/>}/>
                        <Route path={"/history"} element={<HistoryPage/>}/>
                        <Route path={"/statistics"} element={<StatisticsPage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

}

export default App;
