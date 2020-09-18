import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {

        let { data } = await axios.get(url);

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

// export default fetchData;