import React, { Component } from 'react';
import './station.css'
import Icon from './icon.png'

class Station extends Component {
    constructor(props) {
        super(props);
        this.state = { stop_name: "", stop_id: "" }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        const { stop_name, stop_id } = this.props;
        this.setState({ stop_name: stop_name, stop_id: stop_id });
    }

    handleClick(e) {
        e.preventDefault();
        if(this.props.type!="fare")
            this.props.updateStation(this.state.stop_name,this.state.stop_id,this.props.type)
    }

    render() {
        const stationClass = (this.state.stop_name == this.props.activeItem ) ? "stationContainer  clicked" : "stationContainer";
        return (
            <React.Fragment>
                <div className={stationClass} onClick={this.handleClick}>
                    <div className="stationHeader">
                        <h3>{this.props.stop_name}</h3>
                        {(this.state.stop_name == this.props.activeItem ) ? <div><img src={Icon} width="25" height="25" /></div> : <div></div>}
                    </div>
                    <div className="stationDetailsWrapper">
                        <div className="stationDetail">
                            <p>StationID </p>
                            <p>:</p>
                            <p>{this.props.stop_id}</p>
                        </div>
                        <div className="stationDetail">
                            <p>Theme </p>
                            <p>:</p>
                            <p>Detail</p>
                        </div>
                        <div className="stationDetail">
                            <p>ThemeDesc </p>
                            <p>:</p>
                            <p>Detail</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default Station;
