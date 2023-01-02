import React from 'react';
import axios from "axios";
import TeamPlayers from "./TeamPlayers";
import HistoryGames from "./HistoryGames";
import LeagueTable from "./LeagueTable";

const api = "https://app.seker.live/fm1"

class TablePage extends React.Component {
    state = {
        data: [],
        leagueId: 0,

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.inputLeaguesFromApi();
    }


    inputLeaguesFromApi = () => {
        axios.get(api + "/leagues")
            .then(response => {
                    this.setState({
                        data: response.data,

                    })
                }
            )

    }



    changeLeagueId = (item) => {
        console.log(item.id + " changeLeagueId");
        this.setState({
            leagueId: item.id
        })
        console.log(this.state.leagueId + "? changeLeagueId");
    }


    render() {
        return (
            <div>
                <h1>Table Of League</h1>
                <table className={"Countries"}>
                    <tr>
                        <th>
                            countries</th>
                    </tr>

                    {this.state.data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td> {item.name}</td>
                                    <td>
                                        <button onClick={() => this.changeLeagueId(item)}>Table</button>
                                    </td>




                                </tr>
                            )
                        }
                    )}
                </table>
                <LeagueTable id={this.state.leagueId}/>




            </div>

        )
    }
}

export default TablePage;