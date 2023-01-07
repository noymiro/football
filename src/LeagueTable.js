import React from "react";
import axios from "axios";
import TeamPlayers from "./TeamPlayers";
import HistoryGames from "./HistoryGames";
import historyGames from "./HistoryGames";
import CountThePoints from "./CalculateTeamPoints";
import HistoryGamesApi from "./HistoryGamesApi";

const api = "https://app.seker.live/fm1"


class LeagueTable extends React.Component {

    state = {
        data: [
            {
                idTeam: 0,
                idLeague: 0,
                showTableOfPlayers: false,
                showTableOfHistoryGames: false,
                historyGames: [],
            }
        ],



    }

    constructor(props) {
        super(props);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id) {
            this.inputTablesFromApi();
            // this.crateTdOfPoints();
            // this.createObject();
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

    // crateTdOfPoints = async (teamId) => {
    //         console.log(this.props.id + "proId " + teamId + " teamId" + " crateTdOfPoints");
    //         await this.setState({
    //             ...this.state,
    //             historyGames: HistoryGamesApi(1, 180),
    //         })
    //
    // }



    changeIdTeamAndIdLeague = (team) => {
        console.log(team.id + " item !" + this.props.id + " idLeague !");
        this.setState({
            ...this.state,
            idTeam: team.id,
            idLeague: this.props.id,


        })
        //
        // if (string === "players") {
        //     this.setState({
        //         ...this.state,
        //         showTableOfPlayers: true,
        //     })
        // }
        // if (string === "history") {
        //     this.setState({
        //         ...this.state,
        //         showTableOfHistoryGames: true,
        //     })
        // }

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
                    {this.state.data.map( (team, index) => {
                        // {this.crateTdOfPoints(team.id)}
                        return (
                                <tr>
                                    <tr className={((index === 0) ? "top" : ((index >= (20 - 3)) ? "lower" : ""))}>
                                        <td>{index + 1}</td>
                                        <td>{team.name} </td>
                                    </tr>
                                    <td>

                                        <button onClick={() => this.changeIdTeamAndIdLeague(team )}> Show details</button>
                                        {/*<button onClick={() => this.changeIdTeamAndIdLeague(team )}> Show history*/}
                                        {/*    games*/}
                                        {/*</button>*/}
                                    </td>

                                    {/*<td>{team.goalDifference}</td>*/}
                                    {/*אפשר לשחק עם השורות והעמודות בטבלה כדי להציג את זה לצד הכיתוב ולא מתחת*/}


                                </tr>
                            )
                        }
                    )}
                    {/*{this.state.historyGames.map((team, index) => {*/}
                    {/*    return (*/}
                    {/*    <td>{CountThePoints(team)}</td>*/}
                    {/*    )*/}
                    {/*})}*/}

                </table>


                {/*{this.state.showTable? true :  <TeamPlayers idLeague={this.state.idLeague} idTeam={this.state.idTeam} />}*/}
                {/*{this.state.showTableOfPlayers ? true : <TeamPlayers idLeague={this.state.idLeague} idTeam={this.state.idTeam}/>}*/}
                {/*{this.state.showTableOfHistoryGames ? true : <HistoryGames idLeague={this.state.idLeague} idTeam={this.state.idTeam}/>}*/}

                <TeamPlayers idLeague={this.state.idLeague} idTeam={this.state.idTeam}/>
                <HistoryGames idLeague={this.state.idLeague} idTeam={this.state.idTeam}/>

            </div>
        )
    }
}

export default LeagueTable;