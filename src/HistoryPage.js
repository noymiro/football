import React from "react";
import axios from "axios";
import HistoryGames from "./HistoryGames";
import CountTheResult from "./CountTheResult";
import CalculatGoals from "./CountTheResult";

const api = "https://app.seker.live/fm1"

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: [],
        arrayOfRounds: [],
        leagueId: 0,
        roundMin: 0,
        roundMax: 0,
    }

    componentDidMount() {


    }

    historyRoundGames = async (leagueId, round) => {
        console.log(leagueId + "," + round + " historyRoundGames");
        const url = api + "/round/" + leagueId + "/" + round;
        const response = await axios.get(url);
        this.setState({
            ...this.state,
            data: response.data,
            arrayOfRounds: [...this.state.arrayOfRounds, response.data]
        })

        }
    selectRangeOfRounds =  async (leagueId, roundMin, roundMax) => {
        console.log(leagueId + "," + roundMin + "," + roundMax + " selectRangeOfRounds");
        for (let i = roundMin; i <= roundMax ; i++) {
            await this.historyRoundGames(leagueId, i);



        }

        }

    render() {
        return (
            <div>
                <h1>HistoryPage</h1>
                <h2 id={"h2 LeagueId"}>LeagueId: {this.props.idLeague}</h2>
                <input type="number" onChange={(e) => {
                    this.setState({
                        leagueId: e.target.value
                    })
                }}/>
                <h2 id={"h2 Round Min"}>Round Min</h2>
                <input type="number" onChange={(e) => {
                    this.setState({
                        roundMin: e.target.value
                    })
                }}/>
                <h2 id={"h2 Round Max"}>Round Max</h2>
                <input type="number" onChange={(e) =>{
                    this.setState({
                        roundMax: e.target.value
                    }
                )}}/>
                <button onClick={() => {
                    this.selectRangeOfRounds(this.state.leagueId, this.state.roundMin, this.state.roundMax)
                }}>HistoryPage
                </button>
                <table>
                    <tr>
                        <th>Home Team</th>
                        <th>Home Team Score</th>
                        <th>Away Team Score</th>
                        <th>Away Team</th>
                    </tr>
                    {this.state.arrayOfRounds.map((item, index) => { // לשים Data
                        {
                            item.map((game, index) => { // להוריד את זה
                                const scores = CalculatGoals(game.goals); //לשנות לitem
                                return (
                                    <tr key={index}>
                                        <td>{game.homeTeam.name}</td>
                                        <td>{scores.homeTeam}</td>
                                        <td>{scores.awayTeam}</td>
                                        <td>{game.awayTeam.name}</td>
                                    </tr>
                                )
                            })
                        }
                    })}
                </table>
            </div>
        );

    }

}

export default HistoryPage;