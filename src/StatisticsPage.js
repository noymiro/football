import React from "react";
import axios from "axios";
const api = "https://app.seker.live/fm1";
const minuteOfHalf = 45;
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
        const mapGoalOfRound = new Map;
        data.map((game) => {
            game.round.map((round) => {
                const numRound = game.round;
                if (mapGoalOfRound.has(numRound)){
                    mapGoalOfRound.set(numRound,mapGoalOfRound.get(numRound)+1);
                } else {
                    mapGoalOfRound.set(numRound,1);
                }
                game.goals.map((goal) => {
                    if (goal.minute <=minuteOfHalf) {
                        firstHalfGoals.push(goal);
                    } else {
                        secondHalfGoals.push(goal);
                    }
                })
            })
        })
        this.setState({
            ...this.state,
            firstHalfGoals: firstHalfGoals,
            secondHalfGoals: secondHalfGoals,
            mapGoalOfRound : mapGoalOfRound,
        })

    }


}

export default StatisticsPage;