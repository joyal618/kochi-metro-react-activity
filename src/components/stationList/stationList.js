import React,{Component} from 'react';
import './stationList.css'
import axios from 'axios'
import Station from '../station/station'
class StationList extends Component{
    constructor(props){
        super(props);
        this.state={station:[{}],received:false}
    }
    async componentDidMount(){
        axios.get("http://52.203.100.234:5010/files/stops.txt").then((res) =>{
            this.setState({station : res.data,received:true});
        })
    }

    render(){
        return (
            <React.Fragment>
                <div>
                    <h2>{this.props.heading}</h2>
                    {this.state.received?
                    <div className="stationListWrapper">
                        {this.state.station.map((station =>
                            <Station stop_name={station.stop_name} stop_id={station.stop_id} updateStation={this.props.updateStation} type={this.props.heading}
                            activeItem={this.props.activeItem}/>
                        ))}
                
                    </div> :
                    <div></div>}
                    
                </div>
                
            </React.Fragment>
        )
    }

}

export default StationList;
