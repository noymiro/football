import react from "react";
import React from "react";
import axios from "axios";
import TeamPlayers from "./TeamPlayers";
import HistoryGames from "./HistoryGames";
const api = "https://app.seker.live/fm1"


class LeagueTable extends React.Component {

    state = {
        data: [
            {
                idTeam: 0,
                idLeague: 0,
            }
        ],

        // leagueTable: [],
        // teamPlayers: [],
        // historyGames: [],
        // homeTeam: 0,
        // awayTeam: 0,
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
            idTeam: team.id,
            idLeague: this.props.id
        })


    }

    render() {
        return (

            <div>
                <h1>LeagueTable</h1>
                <table id={"leagueTab"}>
                    <tr>
                        <th>Team</th>
                        <th>id</th>

                    </tr>
                    {this.state.data.map((team) => {
                            return (
                                <tr>
                                    <td>{team.name}</td>
                                    <td>{team.id}</td>
                                    <td>
                                        <button onClick={() => this.changeIdTeamAndIdLeague(team)}> Show players team
                                        </button>
                                        <button onClick={() => this.changeIdTeamAndIdLeague(team)}> Show history games
                                        </button>
                                    </td>
                                    {/*אפשר לשחק עם השורות והעמודות בטבלה כדי להציג את זה לצד הכיתוב ולא מתחת*/}


                                </tr>
                            )
                        }
                    )}

                </table>

                <TeamPlayers idLeague={this.state.idLeague} idTeam={this.state.idTeam} />
                <HistoryGames idLeague={this.state.idLeague} idTeam={this.state.idTeam} />

            </div>
        )
    }
}

export default LeagueTable;

