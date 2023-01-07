import React from "react";
import axios from "axios";
import CalculatGoals from "./CountTheResult";


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
            this.historyGamesApi();

        }
    }

    historyGamesApi = async () => {
        try {
            console.log(this.props.idTeam + " idTeam");

            await axios.get(api + "/history/" + this.props.idLeague + "/" + this.props.idTeam)
                .then(response => {
                        this.setState({
                            historyGames: response.data
                        })
                    }
                )
        }catch(e)
        {
            console.log(e)
        }
    }

    // calculateTeamPoints = (idTeam) => {
    //     let points = 0;
    //     this.state.historyGames.forEach((game) => {
    //         if (game.homeTeam === idTeam.id || game.awayTeam === idTeam.id) {
    //             if (game.homeTeam === game.awayTeam) {
    //                 points += 1;
    //             } else if (game.homeTeam === idTeam.id && game.homeTeamScore > game.awayTeamScore) {
    //                 points += 3;
    //             } else if (game.awayTeam === idTeam.id && game.awayTeamScore > game.homeTeamScore) {
    //                 points += 3;
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
                    </tr>
                    <tbody>
                    {this.state.historyGames.map((game, index) => {
                        const scores = CalculatGoals(game.goals);
                        return (
                            <tr key={index}>
                                <td>{game.homeTeam.name}</td>
                                <td>{scores.homeTeam} : {scores.awayTeam}</td>
                                <td>{game.awayTeam.name}</td>
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

export class calculateTeamPoints {
}