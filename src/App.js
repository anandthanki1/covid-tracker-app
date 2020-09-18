import React, { Component } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    async componentDidMount() {
        let fetchedData = await fetchData();
        
        this.setState({
            data: fetchedData,
        });
    }

    render() {
        const { data } = this.state;
        return (
            <div className={styles.container}>
                <h1>Covid Tracker App</h1>
                <Cards data={data} />
                <Chart />
                <CountryPicker />
            </div>
        );
    };
};

export default App;