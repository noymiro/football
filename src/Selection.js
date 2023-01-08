import React, {Component} from 'react';
import axios from "axios";

class Selection extends Component {

    state = {
        leagues: [],
        leagueId: "none",
    }

    componentDidMount() {
        this.leagues()
    }

    leagues = () => {
        axios.get('https://app.seker.live/fm1/leagues')
            .then((response) => {
                this.setState({
                    leagues: response.data,
                })
            });
    }

    changed = (event) => {
        this.setState({
            leagueId: event.target.value
        })
    }

    render() {
        return (
            <div>
                <select value={this.state.leagueId} onChange={this.changed}>
                    <option value={"none"} disabled={true}>SELECT LEAGUE</option>
                    {
                        this.state.leagues.map((league) => {
                            return (
                                <option value={league.id}>{league.name + " League"}</option>
                            )
                        })
                    }
                </select>
                <button onClick={() => this.props.onEnter(this.state.leagueId)}>Enter</button>

            </div>

        );
    }

}
export default Selection;
