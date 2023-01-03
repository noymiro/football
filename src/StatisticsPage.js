import React from "react";
import axios from "axios";
const api = "https://app.seker.live/fm1";

class StatisticsPage extends React.Component {
    state = {
        data: [],
        firstHalfGoals: [],
        secondHalfGoals: [],
        arrayOfRounds: new Map(),
        roundOfTheMostGoals: 0,
        roundOfTheLeastGoals: 0,

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    getUrlOfLeague = async  (leagueId) => {
        const url = api + "/history/" + leagueId;
        const response = await axios.get(url);
        this.setState({
            ...this.state,
            data: response.data,
        })




    }

    sortGoals () {
        const data = this.state.data;
        const firstHalfGoals = [];
        const secondHalfGoals = [];
        data.map((game) => {
            game.goals.map((goal) => {
                if (goal.half === "first") {
                    firstHalfGoals.push(goal);
                } else {
                    secondHalfGoals.push(goal);
                }
            })
        })
        this.setState({
            ...this.state,
            firstHalfGoals: firstHalfGoals,
            secondHalfGoals: secondHalfGoals,
        })

    }


}

export default StatisticsPage;