import React from "react";
import CalculatGoals from "./CountTheResult";
import HistoryGamesApi from "./HistoryGamesApi";
import GoalDifference from "./GoalDifference";
import CountThePoints from "./CalculateTeamPoints";


const api = "https://app.seker.live/fm1"

class HistoryGames extends React.Component {
    state = {
        historyGames: [],
        homeTeam: 0,
        awayTeam: 0,


    }

    constructor(props) {
        super(props);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.idTeam !== prevProps.idTeam || this.props.idLeague !== prevProps.idLeague) {
            this.setHistoryGames();

        }
    }

    setHistoryGames = async () => {
        try {
            this.setState({
                historyGames: await HistoryGamesApi(this.props.idLeague, this.props.idTeam)
            })
        } catch (e) {
            console.log(e)
        }

    }

    // calculateTeamPoints = (team) => {
    //     debugger;
    //     let points = 0;
    //     this.state.historyGames.forEach(game => {
    //         if (game.homeTeam.id === team.id) {
    //             const scores = CalculatGoals(game.goals);
    //             if (scores.homeTeam > scores.awayTeam) {
    //                 points += 3;
    //             } else if (scores.homeTeam === scores.awayTeam) {
    //                 points += 1;
    //             }
    //         } else if (game.awayTeam.id === team.id) {
    //             const scores = CalculatGoals(game.goals);
    //             if (scores.homeTeam < scores.awayTeam) {
    //                 points += 3;
    //             } else if (scores.homeTeam === scores.awayTeam) {
    //                 points += 1;
    //             }
    //         }
    //     });
    //     return points;
    // }


    render() {
        return (
            <div>
                <h1>HistoryGames</h1>
                <table>
                    <tr>
                        <th>Home team</th>
                        <th>Score</th>
                        <th>Away team</th>
                        {/*<th>Team points</th>*/}
                    </tr>
                    <tbody>
                    {this.state.historyGames.map((game, index) => {
                        const scores = CalculatGoals(game.goals);
                        return (
                            <tr key={index}>
                                <td>{game.homeTeam.name}</td>
                                <td>{scores.homeTeam} : {scores.awayTeam}</td>
                                <td>{game.awayTeam.name}</td>
                                {/*<td>{CountThePoints(game.homeTeam)}</td>*/}
                                {/*<td>{GoalDifference(game.homeTeam)}</td>*/}

                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default HistoryGames;