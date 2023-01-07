import React from "react";
import axios, {get} from "axios";
import TeamPlayers from "./TeamPlayers";
import HistoryGames from "./HistoryGames";
import { calculateTeamPoints } from './HistoryGames';
import historyGames from "./HistoryGames";
const api = "https://app.seker.live/fm1"


class LeagueTable extends React.Component {

    state = {
        data: [
            {
                idTeam: 0,
                idLeague: 0,
                showTable: true,
            }
        ],

        // leagueTable: [],
        // teamPlayers: [],
        // historyGames: [],
        // homeTeam: 0,
        // awayTeam: 0,
        //


    }
    constructor(props) {
        super(props);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id) {
            this.inputTablesFromApi();
            // this.createObject();
        }
    }

    inputTablesFromApi = () => {
        console.log(this.props.id + " id");
        axios.get(api + "/teams/" + this.props.id)
            .then(response => {
                    this.setState({
                        data: response.data,

                    })
                }
            )

    }
    changeIdTeamAndIdLeague = (team) => {
        console.log(team.id + " item !" + this.props.id + " idLeague !");
        this.setState({
            ...this.state,
            idTeam: team.id,
            idLeague: this.props.id
        })
    }
    //לא עובד צריך לנסות לרנדר את זה
    // calculateTeamPoints = (idTeam, games)=>
    // {
    //     let points = 0;
    //     games.forEach((game) => {
    //         if (game.homeTeam === idTeam.id || game.awayTeam === idTeam.id) {
    //             if (game.homeTeam === game.awayTeam) {
    //                 points += 1;
    //             } else if (game.homeTeam === idTeam.id && game.homeTeam > game.awayTeam) {
    //                 points += 3;
    //             } else if (game.awayTeam === idTeam.id && game.awayTeam > game.homeTeam) {
    //                 points += 3;
    //             }
    //         }
    //     });
    //     return points;
    // }


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
                                <tr className={((index === 0) ? "top" : ((index >= (20-3)) ? "lower" : ""))} >
                                    <td>{index + 1}</td>
                                    <td>{team.name} </td>


                                </tr>

                                <td>

                                    <button onClick={() => this.changeIdTeamAndIdLeague(team)}> Show players team
                                    </button>
                                    <button onClick={() => this.changeIdTeamAndIdLeague(team)}> Show history games
                                    </button>
                                </td>
                                {/*אפשר לשחק עם השורות והעמודות בטבלה כדי להציג את זה לצד הכיתוב ולא מתחת*/}


                            </tr>
                        )}




                    )}

                </table>


                <TeamPlayers idLeague={this.state.idLeague} idTeam={this.state.idTeam} />
                <HistoryGames idLeague={this.state.idLeague} idTeam={this.state.idTeam} />

            </div>
        )
    }
}

export default LeagueTable;