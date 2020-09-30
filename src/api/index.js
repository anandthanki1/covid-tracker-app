const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {

    let changebleUrl = url;

    if(country) {
        changebleUrl = `${url}/countries/${country}`;
    }

    try {

        let response = await fetch(changebleUrl);
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


export const fetchCountries = async () => {
    try {
        const response = await fetch(`${url}/countries`);
        const data = await response.json();
        const countries = data.countries.map((country) => country.name);
        console.log(`Countries: ${countries}`);
        return countries;
    } catch(error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        let response = await fetch(`${url}/daily`);
        let data = await response.json();

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        console.log(`modifiedDailydata: ${modifiedData}`);
        return modifiedData;
    } catch(error) {
        console.log(error);
    }
}