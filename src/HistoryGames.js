import React from "react";
import axios from "axios";
import HistoryPage from "./HistoryPage";
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

    // componentDidMount() {
    //     <HistoryGames countTheResult={this.countTheResult}/>
    // }
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