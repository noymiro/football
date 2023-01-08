import React from 'react';
import axios from "axios";
import LeagueTable from "./LeagueTable";
const api = "https://app.seker.live/fm1"

class TablePage extends React.Component {
    state = {
        data: [],
        leagueId: 0,
        historyGames: [],

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

    changeLeagueId = async (event) => {
        this.setState({
            leagueId: event.target.value
        });

    }
    render() {
        return (
            <div>
                <h1>Table Of League</h1>
                <select value={this.state.leagueId} onChange={this.changeLeagueId}>
                    <option value="none" disabled={false}>
                        SELECT LEAGUE
                    </option>
                    {this.state.data.map((item, index) => {
                        return (
                            <option value={item.id}>{item.name + " League"}</option>
                        );
                    })}
                </select>
                <LeagueTable id={this.state.leagueId}/>


            </div>
        );
    }

}

export default TablePage;