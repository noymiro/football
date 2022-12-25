import react from 'react';
import axios from "axios";

const api = "https://app.seker.live/fm1"

class TablePage extends react.Component {
    state = {
        data: [],
        leagueTable: [],
    }

    componentDidMount() {
        this.inputLeaguesFromApi();
    }


    inputLeaguesFromApi = () => {
        axios.get(api + "/leagues")
            .then(response => {
                    this.setState({
                        data: response.data
                    })
                }
            )

    }
    leagueTables = (id) => {
        axios.get(api + "/teams/" + id)
            .then(response => {
                    this.setState({
                        leagueTable: response.data
                    })
                }
            )
    }

    render() {
        return (
            <div>
                <h1>Table Of League</h1>
                <table className={"Countries"}>
                    <tr>
                        <th>countries</th>
                    </tr>
                    {this.state.data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td onClick={() => this.leagueTables(item.id)}>{item.name}</td>
                                </tr>
                            )
                        }
                    )}
                </table>
                <table className={"LeagueTable"}>
                    <div>

                        <tr>
                            <th> The league table online</th>

                        </tr>

                    </div>
                    {this.state.leagueTable.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                </tr>

                            )
                        }
                    )}

                </table>

            </div>

        )
    }
}

export default TablePage;