import React from "react";
import CalculatGoals from "./CountTheResult";
import HistoryGamesApi from "./HistoryGamesApi";



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