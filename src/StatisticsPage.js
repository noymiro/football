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

    async sortGoals() {
        const url = api + "/history/" + leagueId;
        const response = await axios.get(url);
        const mapOfRounds = response.data;
        const data = this.state.data;
        const firstHalfGoals = [];
        const secondHalfGoals = [];
        const mapGoalsPerRound = new Map;

        mapOfRounds.map((game) =>{
            let counter = 0;
            let round = 1;
            game.goals.map((goal) => {
                            if (goal.minute <= minuteOfHalf) {
                                firstHalfGoals.push(goal);
                                counter = counter+1;
                            } else {
                                secondHalfGoals.push(goal);
                                counter = counter+1;
                            }
            })
            mapGoalsPerRound.set(round, counter )
            round = round +1;
        })
        // data.map((game) => {
        //     game.round.map((round) => {
        //         const numRound = game.round;
        //         if (mapGoalOfRound.has(numRound)) {
        //             mapGoalOfRound.set(numRound, mapGoalOfRound.get(numRound) + 1);
        //         } else {
        //             mapGoalOfRound.set(numRound, 1);
        //         }
        //         game.goals.map((goal) => {
        //             if (goal.minute <= minuteOfHalf) {
        //                 firstHalfGoals.push(goal);
        //             } else {
        //                 secondHalfGoals.push(goal);
        //             }
        //         })
        //     })
        // })
        this.setState({
            ...this.state,
            firstHalfGoals: firstHalfGoals,
            secondHalfGoals: secondHalfGoals,
            mapGoalsPerRound: mapGoalsPerRound,
        })

    }


}

export default StatisticsPage;