import React from 'react';
import axios from "axios";
import TeamPlayers from "./TeamPlayers";
import HistoryGames from "./HistoryGames";
import LeagueTable from "./LeagueTable";

const api = "https://app.seker.live/fm1"

class TablePage extends React.Component {
    state = {
        data: [],
        leagueId: 0,
        // leagueTable: [],
        // teamPlayers: [],
        // historyGames: [],
        // homeTeam: 0,
        // awayTeam: 0,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.inputLeaguesFromApi();
    }


    inputLeaguesFromApi = () => {
        axios.get(api + "/leagues")
            .then(response => {
                    this.setState({
                        data: response.data,

                    })
                }
            )

    }
    // leagueTables = (id) => {
    //     axios.get(api + "/teams/" + id)
    //         .then(response => {
    //                 this.setState({
    //                     leagueTable: response.data
    //                 })
    //             }
    //         )
    // }
    ///squad/{leagueId}/{teamId}
    // teamPlayersApi = (leagueId, teamId) => {
    //     console.log(leagueId + "," + teamId + " teamPlayersApi");
    //     axios.get(api + "/squad/" + leagueId + "/" + teamId)
    //         .then(response => {
    //                 this.setState({
    //                     teamPlayers: response.data
    //                 })
    //             }
    //         )
    // }
    // ///history/{leagueId}/{teamId}
    // historyGamesApi = (leagueId, teamId) => {
    //     axios.get(api + "/history/" + leagueId + "/" + teamId)
    //         .then(response => {
    //                 this.setState({
    //                     historyGames: response.data,
    //                 })
    //             }
    //         )
    //     console.log(this.state.historyGames + " score")
    //
    // }
    // calculationOfGoals = () => {
    //     console.log(this.state.historyGames + "," + "calculationOfGoals");
    //     for (let i = 0; i < this.state.historyGames.length; i++) {
    //         if (this.state.historyGames[i].goals.home === false) {
    //             this.setState({
    //                 awayTeam: this.state.awayTeam + 1
    //             })
    //
    //         } else if(this.state.historyGames[i].goals.home === true) {
    //             this.setState({
    //                 homeTeam: this.state.homeTeam + 1
    //             })
    //         }
    //
    //     }
// callTable = (id) => {
//     return LeagueTable(id);
//
// }


    changeLeagueId = (item) => {
        console.log(item.id + " changeLeagueId");
        this.setState({
            leagueId: item.id
        })
        console.log(this.state.leagueId + "? changeLeagueId");
    }


    render() {
        return (
            <div>
                <h1>Table Of League</h1>
                <table className={"Countries"}>
                    <tr>
                        <th>
                            countries</th>
                    </tr>

                    {this.state.data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td> {item.name}</td>
                                    <td>
                                        <button onClick={() => this.changeLeagueId(item)}>Table</button>
                                    </td>




                                </tr>
                            )
                        }
                    )}
                </table>
                <LeagueTable id={this.state.leagueId}/>


                {/*{ //לחפש קומבינה אחרת*/}
                {/*    this.state.leagueId == 1 &&*/}
                {/*    <LeagueTable id={1}/>*/}
                {/*}*/}
                {/*{*/}
                {/*    this.state.leagueId == 2 &&*/}
                {/*    <LeagueTable id={2}/>*/}
                {/*}*/}
                {/*{*/}
                {/*    this.state.leagueId == 3 &&*/}
                {/*    <LeagueTable id={3}/>*/}
                {/*}*/}
                {/*<table className={"LeagueTable"}>*/}
                {/*    <div>*/}

                {/*        <tr id={"title"}>*/}
                {/*            <th> The league table online</th>*/}

                {/*        </tr>*/}

                {/*    </div>*/}
                {/*    {this.state.leagueTable.map((item, index) => {*/}
                {/*            return (*/}
                {/*                <tr key={index}>*/}
                {/*                    <td id={"location"}> {item.id + 1}</td>*/}
                {/*                    <td onClick={() => this.teamPlayersApi(item.league.id, item.id)}> {item.name} </td>*/}
                {/*                    <td onClick={() => this.historyGamesApi(item.league.id, item.id)}> show games</td>*/}
                {/*                </tr>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    )}*/}

                {/*    {this.state.teamPlayers.map((item, index) => {*/}
                {/*            return (*/}
                {/*                <tr key={index}>*/}
                {/*                    <td id={"teamPlayers"}> {item.firstName} {item.lastName}</td>*/}
                {/*                </tr>*/}
                {/*            )*/}

                {/*        }*/}
                {/*    )}*/}
                {/*    {this.state.historyGames.map((item) => {*/}
                {/*            console.log(item + " item")*/}
                {/*            const score = this.state.historyGames;*/}
                {/*            console.log(score + " score")*/}
                {/*            // const homeObject = item.goals.find((goal) => goal.home === true);*/}
                {/*            // console.log(homeObject + " homeObject")*/}
                {/*        try{*/}
                {/*                score.goals.map((goal) => {*/}
                {/*                            console.log(goal + " goal")*/}
                {/*                        */}
                {/*                            if (goal !== undefined) {*/}
                {/*                                if (goal.home === true) {*/}
                {/*                                    this.setState({*/}
                {/*                                        homeTeam: this.state.homeTeam + 1*/}
                {/*                                    })*/}
                {/*                                } else {*/}
                {/*                                    this.setState({*/}
                {/*                                        awayTeam: this.state.awayTeam + 1*/}
                {/*                                    })*/}
                {/*                                }*/}

                {/*                            }*/}
                {/*                        }*/}
                {/*                    )*/}

                {/*        }catch (e) {*/}
                {/*            console.log(e)*/}
                {/*        }*/}
                {/*        return (*/}
                {/*                <tr>*/}
                {/*                    <td id={"historyGames"}> {item.homeTeam.name} - {this.state.homeTeam} VS {item.awayTeam.name} - {this.state.awayTeam}</td>*/}
                {/*                </tr>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    )}*/}
                {/*</table>*/}

            </div>

        )
    }
}

export default TablePage;