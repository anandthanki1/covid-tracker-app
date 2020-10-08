import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data, country }) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData(country));
        }

        fetchAPI();
    }, [country]);

    return (
        <div className={styles.container}>
            {country ? lineChart(dailyData) : barChart(data)}
        </div>
    );
};

export default Chart;

const lineChart = (dailyData) => (
    dailyData ? (
        <Line
            data = {{
                labels: dailyData.map(({ date }) => {
                    return date;
                }),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(250, 0, 0, 0.5)',
                    fill: true,
                }],
            }}
        />) : null
);

const barChart = (data) => (
    data.confirmed ? (
        <Bar 
        data={{
            labels: ['Confirmed', 'Recovered', 'Deaths'],
            datasets: [{
                label: 'People',
                backgroundColor: [
                    'rgba(0, 0, 255, 0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)'
                ],
                data: [data.confirmed, data.recovered, data.deaths],
            }]
        }}
        options={{
            legend: { display: false },
            title: { display: true, text: 'Current Global state'}
        }}
        />
    ) : null
);