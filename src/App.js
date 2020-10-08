import React, { Component } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import covidImage from './images/covid-image.png';

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
        let fetchedData = await fetchData(country);

        this.setState({
            data: fetchedData,
            country: country,
        })
    }

    render() {
        const { data, country } = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={covidImage} alt="Covid-19"/>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        );
    };
};

export default App;