import react from 'react';
import axios from "axios";

const api = "https://app.seker.live/fm1"

class TablePage extends react.Component {
    state = {
        data: [],
        leagueTable: [],
        teamPlayers: [],
        historyGames: [],
    }

    componentDidMount() {
        this.inputLeaguesFromApi();
    }


    inputLeaguesFromApi = () => {
        axios.get(api + "/leagues")
            .then(response => {
                    this.setState({
                        data: response.data

                    })
                }
            )
        console.log(this.state.data)

    }
    leagueTables = (id) => {
        axios.get(api + "/teams/" + id)
            .then(response => {
                    this.setState({
                        leagueTable: response.data
                    })
                }
            )
    }
    ///squad/{leagueId}/{teamId}
    teamPlayersApi = (leagueId, teamId) => {
        console.log(leagueId + "," + teamId + " teamPlayersApi");
        axios.get(api + "/squad/" + leagueId + "/" + teamId)
            .then(response => {
                    this.setState({
                        teamPlayers: response.data
                    })
                }
            )
    }
    ///history/{leagueId}/{teamId}
    historyGamesApi = (leagueId, teamId) => {
        axios.get(api + "/history/" + leagueId + "/" + teamId)
            .then(response => {
                    this.setState({
                        historyGames: response.data
                    })
                }
            )
    }
    // showResultOfGames = () => {
    //     this.state.historyGames.map((item, index) => {
    //         return (
    //             <tr key={index}>
    //                 <td> {item.homeTeam.name} {item.awayTeam.name}</td>
    //             </tr>
    //         )
    //     })
    // }
    // showPlayers = () => {
    //     this.state.teamPlayers.map((item, index) => {
    //         return (
    //             <tr key={index}>
    //                 <td> {item.firstName} {item.lastName}</td>
    //             </tr>
    //         )
    //     })
    // }

    render() {
        return (
            <div>
                <h1>Table Of League</h1>
                <table className={"Countries"}>
                    <tr>
                        <th>countries</th>
                    </tr>
                    {this.state.data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td onClick={() => this.leagueTables(item.id)}>{item.name}</td>
                                </tr>
                            )
                        }
                    )}
                </table>
                <table className={"LeagueTable"}>
                    <div>

                        <tr id={"title"}>
                            <th> The league table online</th>

                        </tr>

                    </div>
                    {this.state.leagueTable.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td id={"location"}> {item.id + 1}</td>
                                    <td onClick={() => this.teamPlayersApi(item.league.id, item.id)}> {item.name} </td>
                                    <td onClick={() => this.historyGamesApi(item.league.id, item.id)}> show gams </td>
                                </tr>


                            )
                        }
                    )}

                    {this.state.teamPlayers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td id={"teamPlayers"}> {item.firstName} {item.lastName}</td>
                                </tr>
                            )

                        }
                    )}
                    {this.state.historyGames.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td id={"historyGames"}> {item.homeTeam.name} {item.awayTeam.name}</td>
                                </tr>
                            )

                        }
                    )}


                </table>

            </div>

        )
    }
}

export default TablePage;