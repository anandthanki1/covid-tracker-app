import React, { Component } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            country: '',
        }
    }

    async componentDidMount() {
        let fetchedData = await fetchData();
        
        this.setState({
            data: fetchedData,
        });
    }

    handleCountryChange = async (country) => {
        console.log(country);
        let fetchedData = await fetchData(country);

        console.log(fetchedData);

    }

    render() {
        const { data } = this.state;
        return (
            <div className={styles.container}>
                <h1>Covid Tracker App</h1>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart />
            </div>
        );
    };
};

export default App;