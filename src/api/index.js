const url = 'https://api.covid19api.com';

export const fetchData = async (country) => {

    let changebleUrl = `${url}/summary`;

    try {

        let response = await fetch(changebleUrl);
        let data = await response.json();
        let countryData = data["Global"];

        if(country) {
            countryData = data["Countries"].find(countryInfo => countryInfo["Slug"] === country);
        }

        let modifiedData = {
            confirmed: countryData["TotalConfirmed"],
            recovered: countryData["TotalRecovered"],
            deaths: countryData["TotalDeaths"],
            lastUpdate: countryData["Date"] || new Date().toISOString(),
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
        return data.sort((a, b) => {
            const ConA = a["Country"].toUpperCase();
            const Conb = b["Country"].toUpperCase();

            let comparison = 0;
            if(ConA > Conb) {
                comparison = 1;
            } else if (ConA < Conb) {
                comparison = -1;
            }

            return comparison;
        });
    } catch(error) {
        console.log(error);
    }
}

export const fetchDailyData = async (country) => {

    if(!country) {
        return;
    }

    try {
        let response = await fetch(`${url}/total/country/${country}`);
        let data = await response.json();

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData["Confirmed"],
            deaths: dailyData["Deaths"],
            date: new Date(dailyData["Date"]).toDateString(),
        }));
        console.log(`modifiedDailydata: ${modifiedData}`);
        return modifiedData;
    } catch(error) {
        console.log(error);
    }
}