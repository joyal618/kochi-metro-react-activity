import React from 'react';
import StationList from '../stationList/stationList.js'
import "./Main.css";
import axios from 'axios';
import Station from '../station/station'
import FarePrice from '../farePrice/farePrice'
import Arrow from '../../resources/arrow.png'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { departure: "", arrival: "", fare_rule: [{}], fare_attributes: [{}], departure_stop_id: "", arrival_stop_id: "", fare_price: "" }
        this.updateStation = this.updateStation.bind(this);

    }

    async componentDidMount() {

        axios.get("http://52.203.100.234:5010/files/fare_attributes.txt").then((response) => {
            this.setState({ fare_attributes: response.data })
        })
        axios.get("http://52.203.100.234:5010/files/fare_rules.txt").then((response) => {
            this.setState({ fare_rules: response.data })
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.arrival && this.state.departure) {
            if (prevState.arrival != this.state.arrival || prevState.departure != this.state.departure) {
                let fare_obj = this.state.fare_rules.filter(fare => {
                    return this.state.departure_stop_id == fare.origin_id && this.state.arrival_stop_id == fare.destination_id
                })
                let fare_price = this.state.fare_attributes.filter(fare => {
                    return fare_obj[0].fare_id == fare.fare_id
                })
                this.setState({ fare_price: fare_price[0].price })
                console.log(fare_price[0].price)
            }
        }
    }

    updateStation(stop_name, stop_id, type) {
        if (type == "Departure") {
            console.log("hii2")
            if (this.state.arrival != stop_name)
                this.setState({ departure: stop_name, departure_stop_id: stop_id })
        }
        else if (type == "Arrival") {
            console.log("h22")
            if (this.state.departure != stop_name)
                this.setState({ arrival: stop_name, arrival_stop_id: stop_id })
        }

    }
    render() {
        return (
            <React.Fragment>
                <div className="mainHeader">
                    <h2>Metro Station Details and Fare Calculation</h2>
                    <p>By selecting the departure and arrival stations in the below you will be able to see the ticket fare</p>
                </div>
                <div className="stationListContainer">
                    <StationList heading="Departure" updateStation={this.updateStation} activeItem={this.state.departure} />
                    <StationList heading="Arrival" updateStation={this.updateStation} activeItem={this.state.arrival} />
                </div>
                {(this.state.arrival && this.state.departure) ? <div className="stationFare">
                    <div className="fareHeader">
                        <h3>Span</h3>
                        <h3>Fare</h3>
                    </div>
                    <div className="fareBody">
                    <Station type="fare" stop_name={this.state.departure} stop_id={this.state.departure_stop_id} />
                    <img src={Arrow} height="60px" width="60px" alt="arrow"/>
                    <Station type="fare" stop_name={this.state.arrival} stop_id={this.state.arrival_stop_id} />
                    <FarePrice fare_price={this.state.fare_price} />
                    </div>
                    
                </div> : <div></div>}

            </React.Fragment>
        )
    }

}

export default Main;
