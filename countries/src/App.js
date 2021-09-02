import { useState, useEffect } from 'react'

import axios from 'axios'

const Filter = ({ search, handleSearch }) => {
    return (
        <div>
            find countries <input value={search} onChange={handleSearch}/>
        </div>
    )
}

const Weather = ({ country }) => {
    const [weather, setWeather] = useState([])

    const api_key = process.env.REACT_APP_API_KEY
    const city = country.capital
    const query = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`

    useEffect(() => {
        axios
        .get(query)
        .then(response => {
            console.log(response.data.current)
            setWeather(response.data.current)
        })
    }, [query])

    return weather.length === 0
        ? <div>Loading</div>
        :
        <div>
            <h3>Weather in {country.capital}</h3>
            <strong>temperature: </strong>{weather.temperature} Celsius<br/>
            <img src={weather.weather_icons} alt={weather.descriptions} /><br/>
            <strong>wind: </strong>{weather.wind_speed} mph direction {weather.wind_dir}<br/>
        </div>
}

const DisplayOne = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            capital {country.capital} <br/>
            population {country.population} <br/>
            <h3>languages</h3>
            <ul>
                {country.languages.map(lang => (<li key={lang.name}>{lang.name}</li>))}
            </ul>
            <img src={country.flag} alt={country.name} style={{height:100}} />
            <Weather country={country} />
        </div>
    )
}

const DisplayCountries = ({ countries, search, setSearch }) => {
    console.log(search, countries.length)

    const matches = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

    console.log(matches)

    if (search) {
        let matches = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
        if (matches.length > 10) {
            return <div>Too many matches, please specify search</div>
        } else if (matches.length === 1) {
            return <DisplayOne country={matches[0]} />
        } else if (matches.length === 0) {
            return <div>No results for search</div>
        }

        return (
            <div>
                {matches.map(country => (
                    <div key={country.name}>
                        {country.name}
                        <button onClick={() => {setSearch(country.name)}}>
                            show
                        </button>
                    </div>
                ))}
            </div>
        )

    } else {
        return <div>Begin search by typing something</div>
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <Filter
                search={search}
                handleSearch={handleSearch}
            />
            <DisplayCountries
                search={search}
                countries={countries}
                setSearch={setSearch}
            />
        </div>
    )
}

export default App