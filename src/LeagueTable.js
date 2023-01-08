import React from "react";
import axios from "axios";
import TeamPlayers from "./TeamPlayers";
import HistoryGames from "./HistoryGames";

const api = "https://app.seker.live/fm1"


class LeagueTable extends React.Component {

    state = {
        data: [],
        idTeam: 0,
        idLeague: 0,
        showTableOfPlayers: false,
        showTableOfHistoryGames: false,
        historyGames: [],
        points: [],
        diffGoals: 0,
        score: 0,


    }

    constructor(props) {
        super(props);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id) {
            this.inputTablesFromApi();
            this.calcGoalDifference(this.props.id);
        }
    }

    inputTablesFromApi = () => {
        console.log(this.props.id + " id");
        axios.get(api + "/teams/" + this.props.id)
            .then(response => {
                    this.setState({
                        ...this.state,
                        data: response.data,

                    })
                }
            )

    }

    calcGoalDifference = (leagueId) => {
        axios.get(`${api}/teams/${leagueId}`).then((teams) => {
            teams.data.forEach(team => {
                axios.get(`${api}/history/${team.league.id}/${team.id}`).then(res => {
                    let diffGoals = 0;
                    let score = 0;
                    res.data.forEach(game => {
                        let home = game.awayTeam.id !== team.id;
                        let result = 0;
                        game.goals.forEach(goal => {
                            goal.home !== home ? result-- : result++;
                        });
                        if (result > 0) score += 3;
                        else if (result === 0) score += 1;
                        diffGoals += result;
                    });
                    this.setState(prevState => {
                        const updatedData = prevState.data.map(t => {
                            if (t.id === team.id) {
                                return {
                                    ...t,
                                    name: team.name,
                                    diffGoals: diffGoals,
                                    score: score,
                                };
                            }
                            return t;
                        });
                        const sortedData = updatedData.sort((a, b) => {
                            if (b.score === a.score) {
                                return b.diffGoals - a.diffGoals;
                            }
                            return b.score - a.score;
                        });
                        return {
                            ...prevState,
                            data: sortedData,
                        };
                    });
                });
            });
        });
    };


    changeIdTeamAndIdLeague = (team) => {
        console.log(team.id + " item !" + this.props.id + " idLeague !");
        this.setState({
            ...this.state,
            idTeam: team.id,
            idLeague: this.props.id,
        })
    }

    render() {
        return (

            <div>
                <table id={"leagueTab"}>
                    <tr>
                        <th>Team</th>
                        <th>Options</th>
                        <th>Team Scores</th>
                        <th>Goal difference</th>
                    </tr>
                    {this.state.data.map((team, index) => {
                        return (
                            <tr>
                                <tr className={((index === 0) ? "top" : ((index >= (20 - 3)) ? "lower" : ""))}>
                                    <td>{index + 1}</td>
                                    <td>{team.name} </td>
                                </tr>
                                <td>
                                    <button onClick={() => this.changeIdTeamAndIdLeague(team)}> Show details</button>
                                </td>
                                <td>{team.score}</td>
                                <td>{team.diffGoals}</td>
                            </tr>
                        );
                    })}

                </table>
                <div>
                    {this.state.idTeam !== 0 && this.state.idLeague !== 0 ?
                        <TeamPlayers idTeam={this.state.idTeam} idLeague={this.state.idLeague}/> : null}
                </div>
                <div>
                    {this.state.idTeam !== 0 && this.state.idLeague !== 0 ?
                        <HistoryGames idTeam={this.state.idTeam} idLeague={this.state.idLeague}/> : null}
                </div>
            </div>
        )
    }
}

export default LeagueTable;

