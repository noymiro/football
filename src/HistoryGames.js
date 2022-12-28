import React from "react";
import axios from "axios";
import TablesPage from "./TablesPage";

const api = "https://app.seker.live/fm1"

class HistoryGames extends React.Component {
    state = {
        historyGames: [],
        homeTeams: 0,
        awayTeams: 0,
    }

    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.historyGamesApi();
    // }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.idTeam !== prevProps.idTeam) {
            this.historyGamesApi();
        }
    }

    historyGamesApi = () => {
        axios.get(api + "/history/" + this.props.idLeague + "/" + this.props.idTeam)
            .then(response => {
                    this.setState({
                        historyGames: response.data,
                    })
                }
            )
        console.log(this.state.historyGames + " score")

    }
    checkIfTheHomeGoalsAreTrueOrFalse = (team) => {
        team.goals.map((goal) => {
            console.log(goal.home + " goal.home")
            if (goal.home === true) {
                this.setState({
                    homeTeams: this.state.homeTeams + 1
                }
                )

            } else if (goal.home === false) {
                this.setState({
                    awayTeams: this.state.awayTeams + 1
                }
                )
            }
        })
        return (
            <td>{this.state.homeTeams} - {this.state.awayTeams}</td>
        )
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
                                {this.checkIfTheHomeGoalsAreTrueOrFalse(team)}
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