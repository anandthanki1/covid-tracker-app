const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {

        let response = await fetch(url);
        let data = await response.json();

        let modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }

        return modifiedData;

    } catch(error) {
        console.log(error);
    }
};

export const fetchDailyData = async () => {
    try {
        let response = await fetch(`${url}/daily`);
        let data = await response.json();

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;
    } catch(error) {
        console.log(error);
    }
}