import React, { Component } from 'react';
import './farePrice.css'
class FarePrice extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="farePriceWrapper">
                <h1>{this.props.fare_price}</h1>
            </div>
        )
    }
}

export default FarePrice;
