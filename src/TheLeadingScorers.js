import React from "react";
import axios from "axios";
import Selection from "./Selection";

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
        this.fetchLeagues();
    }

    fetchLeagues = async () => {
        const url = api + "/leagues";
        const response = await axios.get(url);
        const leagues = response.data;
        this.setState({
            ...this.state,
            leagues: leagues
        });
    }

    getLeadingScorers = async (leagueId) => {
        const url = api + "/history/" + leagueId;
        const response = await axios.get(url);
        const arrayOfRounds = response.data;
        console.log(arrayOfRounds.length);
        const mapOfPlayers = new Map();
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
        return (
            <div>
                <h1>TheLeadingScorers</h1>
                <h2 id={"h2 LeagueId"}>LeagueId: {this.props.idLeague}</h2>
                <Selection onEnter={this.getLeadingScorers} />
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