import React from "react";
import axios from "axios";
import CalculatGoals from "./CountTheResult";

const api = "https://app.seker.live/fm1";

class HistoryPage extends React.Component {
    state = {
        arrayOfRounds: [],
        leagueId: 0,
        roundMin: 0,
        roundMax: 0,
    };
    componentDidMount() {

        // this.selectRangeOfRounds(1, 1, 10);
    }

    historyRoundGames = async (leagueId, round) => {
        console.log(leagueId + "," + round + " historyRoundGames");
        const url = api + "/round/" + leagueId + "/" + round;
        const response = await axios.get(url);
        this.setState({
            // ...this.state,
            arrayOfRounds: [...this.state.arrayOfRounds, response.data],
        });
    };

    selectRangeOfRounds = async (leagueId, roundMin, roundMax) => {
        console.log(leagueId + "," + roundMin + "," + roundMax + " selectRangeOfRounds");
        for (let i = roundMin; i <= roundMax; i++) {
            await this.historyRoundGames(leagueId, i);
        }
    };

    max = (event) => {
        const number = (event.target.value * 1);
        if ((this.state.leaguesHistory.length > number) && (1 <= number) && (this.state.min <= number)) {
            this.setState({
                roundMax: number
            })
        }
    }

min = (event) => {
    const number = (event.target.value * 1);
    if ((1 <= number) && (this.state.leaguesHistory.length > number) && (number <= this.state.max)){
    this.setState({
                      roundMin: number
                  })
}
}

    render() {
        return (
            <div>
                <h1>HistoryPage</h1>
                <h2 id={"h2 LeagueId"}>LeagueId: {this.props.idLeague}</h2>
                <input
                    type="number"
                    onChange={(e) => {
                        this.setState({
                            // ...this.state,
                            leagueId: e.target.value,

                        });
                    }}
                />
                <h2 id={"h2 Round Min"}>Round Min</h2>
                <input
                    type="number"
                    onChange={(e) => {
                        this.setState({
                            // ...this.state,
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
                <button
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
                            // לשים Data
                            return item.map((game, index) => {
                                // להוריד את זה
                                const scores = CalculatGoals(game.goals); //לשנות לitem
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
