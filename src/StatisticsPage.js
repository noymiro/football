import React from "react";
import axios from "axios";
import Selection from "./Selection";

const api = "https://app.seker.live/fm1";
const minuteOfHalf = 45;

class StatisticsPage extends React.Component {
    state = {
        data: [],
        firstHalfGoals: [],
        secondHalfGoals: [],
        mapOfRounds: new Map(),
        theEarliestGoal: 0,
        theLatestGoal: 0,
        roundOfTheMostGoals: 0,
        roundOfTheLeastGoals: 0,
        valueOfLeague: 0,

    }

    // constructor(props) {
    //     super(props);
    // }

    // componentDidMount() {
    //     this.getUrlOfLeague(1)
    //
    // }

    getUrlOfLeague = async (leagueId) => {
        console.log(leagueId + " getUrlOfLeague");
        const url = api + "/history/" + leagueId;
        console.log(url);
        const response = await axios.get(url);
        this.setState({
            // ...this.state,
            data: response.data,
        })
        if (this.state.data.length > 0) {
            await this.sortGoals()


        }

    }

    sortGoals = async () => {
        console.log(" sortGoals: " + this.state.data.length);
        const arrayOfGames = this.state.data;
        const firstHalfGoals = [];
        const secondHalfGoals = [];
        const mapOfRounds = new Map();
        // const mapGoalsPerRound = new Map;
        let round = 1;
        let counter = 0;
        if (arrayOfGames.length > 0) {
            arrayOfGames.map((game) => {
                // try {
                game.goals.map((goal) => {

                        if (goal !== undefined) {
                            if (game.round !== round) {
                                console.log("round is changed " + round);
                                mapOfRounds.set(round, counter);
                                round++;
                                counter = 0;
                            } else if (goal.minute < minuteOfHalf) {
                                console.log("first half");
                                firstHalfGoals.push(goal);
                                counter++;
                            } else {
                                console.log("second half");
                                secondHalfGoals.push(goal);
                                counter++;
                            }
                        }
                    }
                )
            });
        }
        await this.setState({
            ...this.state,
            firstHalfGoals: firstHalfGoals,
            secondHalfGoals: secondHalfGoals,
            mapOfRounds: mapOfRounds,
        })

        // if (this.state.mapOfRounds !== undefined) {

        setTimeout(() => {
                this.theSmallestAndTheLargestGoal(firstHalfGoals, secondHalfGoals);
                this.getTheRoundOfTheMostAndLeastGoals(mapOfRounds);
            }
            , 1000);



        // }
    }

    theSmallestAndTheLargestGoal = async (firstHalf , secondHalf) => {
        console.log("theSmallestAndTheLargestGoal");
        debugger;
        let theEarliestGoal = -1;
        let theLatestGoal = -1;
        if (firstHalf !== undefined) {
            firstHalf.map((goal) => {
                if (goal.minute < theEarliestGoal || theEarliestGoal === -1) { //הגול הכי מוקדם במחצית הראשונה
                    theEarliestGoal = goal.minute;
                }
                if (goal.minute > theLatestGoal) { // הגול הכי מאוחר במחצית ראשונה
                    theLatestGoal = goal.minute;
                }
            })
        }
        if (secondHalf !== undefined) {
            secondHalf.map((goal) => {
                if (goal.minute < theEarliestGoal || theEarliestGoal === -1) { // הגול הכי מוקדם במחצית השנייה
                    theEarliestGoal = goal.minute;
                }
                if (goal.minute > theLatestGoal) { // הגול הכי מאוחר במחצית השנייה
                    theLatestGoal = goal.minute;
                }
            })
        }
        setTimeout(() => {
            this.setState({
                    ...this.state,
                    theEarliestGoal: theEarliestGoal,
                    theLatestGoal: theLatestGoal,
                }
            )
        } , 1000);

    }

    refreshThePage = () => {
        setTimeout(() => {
                window.location.reload();
            }
            , 1500);
    }




    getTheRoundOfTheMostAndLeastGoals = async (mapOfRounds) => {
        // debugger;
        console.log("getTheRoundOfTheMostAndLeastGoals:  " + mapOfRounds.size);
        let roundOfTheMostGoals = 0;
        let roundOfTheLeastGoals = 0;
        let max = 0;
        let min = 100;

        console.log("mapOfRounds: " + mapOfRounds.size);
        mapOfRounds.forEach((value, key) => {
            if (value > max) {
                max = value;
                roundOfTheMostGoals = key;
            }
            if (value < min) {
                min = value;
                roundOfTheLeastGoals = key;
            }
        })
        await this.setState({
            ...this.state,
            roundOfTheMostGoals: roundOfTheMostGoals,
            roundOfTheLeastGoals: roundOfTheLeastGoals,
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Selection onEnter={this.getUrlOfLeague} />

                </div>
                <h1>Statistics</h1>
                <h2 className={"statistic"}>Goals in the first half {this.state.firstHalfGoals.length}</h2>
                <h2 className={"statistic"}>Goals in the second half {this.state.secondHalfGoals.length}</h2>
                <h2 className={"statistic"}>The earliest goal {this.state.theEarliestGoal}</h2>
                <h2 className={"statistic"}>The latest goal {this.state.theLatestGoal}</h2>
                <h2 className={"statistic"}>The round of the most goals {this.state.roundOfTheMostGoals}</h2>
                <h2 className={"statistic"}>The round of the least goals {this.state.roundOfTheLeastGoals}</h2>
                <button
                    id="buttonStatistics"
                    onClick={() => {
                        this.refreshThePage();
                    }
                    }>Click to refresh the page
                </button>
            </div>


        );


    }


}

export default StatisticsPage;