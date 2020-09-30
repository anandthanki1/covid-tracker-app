import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            setCountries(await fetchCountries());
        }

        getCountries();
    }, [setCountries]);

    console.log(countries);

    return (
        <FormControl>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                { 
                    countries.map((country, index) =>
                        <option key={index} value={{country}}>{country}</option>
                    )
                }
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;