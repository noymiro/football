import React from "react";
import axios from "axios";

const api = "https://app.seker.live/fm1";

class TheLeadingScorers extends React.Component {
    state = {
        mapOfPlayers: new Map(),
        nameOfPlayers: [],
        value: 0,
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {


    }

    getLeadingScorers = async (leagueId) => {
        const url = api + "/history/" + leagueId;
        const response = await axios.get(url);
        const arrayOfRounds = response.data;
        console.log(arrayOfRounds.length);
        const mapOfPlayers = new Map();
        debugger;
        if (arrayOfRounds.length > 0) {
            arrayOfRounds.map((game) => {
                    game.goals.map((goal) => {
                        const name = goal.scorer.firstName + " " + goal.scorer.lastName;
                            if (mapOfPlayers.has(name)) {
                                mapOfPlayers.set(name, mapOfPlayers.get(name) + 1);
                            } else {
                                mapOfPlayers.set(name, 1);
                            }
                    })
                }
            );
            this.setState({
                ...this.state,
                mapOfPlayers: mapOfPlayers,
            });


        }
    }
    topThreeScorers = () => {
        const mapOfPlayers = this.state.mapOfPlayers;
        const nameOfPlayers = [];
        mapOfPlayers.forEach((value, key) => {
            nameOfPlayers.push(key);
        });
        nameOfPlayers.sort((a, b) => {
            return mapOfPlayers.get(b) - mapOfPlayers.get(a);
        });
        return nameOfPlayers.slice(0, 3);
    }

    render() {
        // render in a table the top 3 scorers
        return (
            <div>
                <h1>TheLeadingScorers</h1>
                <h2 id={"h2 LeagueId"}>LeagueId: {this.props.idLeague}</h2>
                <input
                    type="number"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            value: e.target.value,
                        });
                    }}
                />
                <button onClick={() => {
                    this.getLeadingScorers(this.state.value);
                }}>Get Leading Scorers
                </button>
                <table id = "tableOfScorer">
                    <thead>
                    <tr>
                        <th>Player</th>
                        <th>Goals</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.topThreeScorers().map((player , index) => {
                        return (
                            <tr key={index}>
                                <td className="firstScorer">{player}</td>
                                <td className="firstScorer">{this.state.mapOfPlayers.get(player)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );

    }
}


export default TheLeadingScorers;