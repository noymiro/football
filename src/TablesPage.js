import react from 'react';
const api = "https://app.seker.live/fm1"

class TablePage extends react.Component {
    state = {
        data: [],
        itemOfLeagues : {
            country: "",
            league: ""


        }

    }
    render() {
        return (
            <div>
                <h1>TableOfLeague</h1>
                <table className ={"Leagues"}>
                    <tr>
                        <th>countries</th>
                        <th>leagues</th>


                    </tr>
                    {this.state.data.map((item, index) => {
                            return (
                            <tr>
                                <td>{item.country}</td>
                                <td>{item.league}</td>
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