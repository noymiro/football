import React from "react";
import axios from "axios";
import CalculatGoals from "./CountTheResult";
import Selection from "./Selection";

const api = "https://app.seker.live/fm1";

class HistoryPage extends React.Component {
    state = {
        arrayOfRounds: [],
        leagueId: 0,
        roundMin: 0,
        roundMax: 0,
        nameOfLeague: "",
    };
    componentDidMount() {

    }

    historyRoundGames = async (leagueId, round) => {
        console.log(leagueId + "," + round + " historyRoundGames");
        const url = api + "/round/" + leagueId + "/" + round;
        const response = await axios.get(url);
        this.setState({

            arrayOfRounds: [...this.state.arrayOfRounds, response.data],
        });
        this.extractTheLeagueName();
    };

    selectRangeOfRounds = async (leagueId, roundMin, roundMax) => {
        console.log(leagueId + "," + roundMin + "," + roundMax + " selectRangeOfRounds");
        for (let i = roundMin; i <= roundMax; i++) {
            await this.historyRoundGames(leagueId, i);
        }
    };

    extractTheLeagueName = async () => {
        debugger;
        const historyGames = this.state.arrayOfRounds;
        let leagueName = historyGames.map((game) => {
            return game.map((game) => {
                return game.homeTeam.league.name + " " + game.homeTeam.league.id + " ";
            });
        })
        console.log(leagueName);
        this.setState({
                nameOfLeague: leagueName,
            }
        )
    }

    popup = (message) => {
        alert(message);
    }
    windowReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }

    render() {
        return (
            <div>
                <h1>HistoryPage</h1>

                <h2
                    id={"h2 LeagueId"}>League name: {this.state.nameOfLeague}</h2>
                <input
                    type="number"
                    onChange={(e) => {
                        let value = e.target.value;
                        if(value > 0) {
                            this.setState({
                                leagueId: value,
                            });
                        }else {
                            this.popup("LeagueId must be a positive number");
                            this.windowReload();
                        }
                    }}
                />
                <h2 id={"h2 Round Min"}>Round Min</h2>
                <input
                    type="number"
                    onChange={(e) => {
                        let value = e.target.value;
                        if (value <= 0) {
                            value = 1;
                        }if(value > this.state.arrayOfRounds.length){
                            value = this.state.arrayOfRounds.length
                        }
                        this.setState({
                            roundMin: e.target.value,
                            arrayOfRounds: [],
                        });
                    }}
                />
                <h2 id={"h2 Round Max"}>Round Max</h2>
                <input
                    type="number"
                    onChange={(e) => {
                        this.setState({
                            // ...this.state,
                            roundMax: e.target.value,
                            arrayOfRounds: [],
                        });
                    }}
                />
                <button disabled={this.state.roundMin === 0 || this.state.roundMax === 0 || this.state.leagueId === 0
                    || this.state.roundMin > this.state.roundMax || this.state.leagueId < 1 || this.state.roundMin < 0 || this.state.roundMax < 0}
                        onClick={() => {
                            this.selectRangeOfRounds(
                                this.state.leagueId,
                                this.state.roundMin,
                                this.state.roundMax
                            );

                        }}

                >
                    HistoryPage
                </button>
                {this.state.arrayOfRounds.length > 0 && (
                    <table>
                        <tbody>
                        <tr>
                            <th>Cycle number</th>
                            <th>Home Team</th>
                            <th>Home Team Score</th>
                            <th>Away Team Score</th>
                            <th>Away Team</th>
                        </tr>
                        {this.state.arrayOfRounds.map((item, index) => {
                            return item.map((game, index) => {
                                const scores = CalculatGoals(game.goals);
                                return (
                                    <tr key={index}>
                                        <td>{game.round}</td>
                                        <td>{game.homeTeam.name}</td>
                                        <td>{scores.homeTeam}</td>
                                        <td>{scores.awayTeam}</td>
                                        <td>{game.awayTeam.name}</td>
                                    </tr>
                                );
                            });
                        })}
                        </tbody>
                    </table>


                )}
            </div>
        );
    }

}

export default HistoryPage;