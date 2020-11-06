import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        this.getData = this.getData.bind(this);
    }


    componentDidMount() {
        this.getData();
    }


    //get the data from currency end point
    getData() {
        fetch('/currency')
            .then(res => res.json())
            .then(json => {
                const bpi = json.bpi;
                let keys = Object.keys(bpi);
                let values = Object.values(bpi);
                this.setState({
                    data: {
                        labels: keys,
                        datasets: [
                            {
                                label: 'Price',
                                data: values,
                                fill: true,
                                lineTension: 0.5,
                                backgroundColor: "#80d379", 
                                borderColor: "#d018df",  
                                borderWidth: 3,
                            }
                        ]
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Line data={this.state.data}
                  options={{
                    title:{
                      display:true,
                      text:'Bitcoin Price Index of 2020 (USD$)',
                      fontSize:20
                    }
                   
                  }}   ></Line>
            </div>
        )
    }
}
export default App;