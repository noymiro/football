import React from "react";
import axios from "axios";
import TablesPage from "./TablesPage";
import LeagueTable from "./LeagueTable";
const api = "https://app.seker.live/fm1"


class TeamPlayers extends React.Component {
    state = {
        teamPlayers: [],
    }
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     console.log(this.props.idTeam + " idTeam");
    //     this.teamPlayersApi();
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.idTeam + "? idTeam " + this.props.idLeague + "? idLeague");
        if (this.props.idTeam !== prevProps.idTeam) {
            console.log(" start componentDidUpdate");
            this.teamPlayersApi();
        }
    }

    teamPlayersApi = () => {
        console.log(this.props.idLeague + "," + this.props.idTeam + " teamPlayersApi");
        axios.get(api + "/squad/" + this.props.idLeague + "/" + this.props.idTeam)
            .then(response => {
                    this.setState({
                        teamPlayers: response.data
                    })
                }
            )

    }

    render() {
        return (
            <div>
                <h1>LeagueTable</h1>
                <table>
                    <tr>
                        <th>Team staff</th>
                    </tr>
                    {this.state.teamPlayers.map((team) => {
                        return (
                            <tr>
                                <td>{team.firstName} {team.lastName}</td>

                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default TeamPlayers;
