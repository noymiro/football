import React  from "react";
import axios from "axios";
import TablesPage from "./TablesPage";

class HistoryGames extends React.Component {
    state = {
        historyGames: [],
        homeTeams: 0,
        awayTeams: 0,
    }

    // componentDidMount() {
    //     this.historyGamesApi();
    // }

    historyGamesApi = (leagueId, teamId) => {
        axios.get(TablesPage.api + "/history/" + leagueId + "/" + teamId)
            .then(response => {
                    this.setState({
                        historyGames: response.data,
                    })
                }
            )
        console.log(this.state.historyGames + " score")

    }
    render() {
        return (
            <div>
                <h1>HistoryGames</h1>
                <table>
                    <tr>
                        <th>Home team</th>
                        <th>Score</th>
                        <th>Away team</th>
                    </tr>
                    {this.state.historyGames.map((team) => {
                        return (
                            <tr>
                                <td>{team.homeTeam.name}</td>
                                {team.goals.home === true ? <td>{this.state.homeTeams + 1}</td> : <td>{this.state.homeTeams}</td>}
                                <td>{team.awayTeam.name}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}
export default HistoryGames;